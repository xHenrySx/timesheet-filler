import { useEffect, useState, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { getActivities, countActivities } from '../utils/activities';
import { getFilters, getDataTable } from '../utils/datatable';

export function ActivitiesList({update}) {
  const toast = useRef(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 5,
    page: 1,
    sortField: 'date',
    sortOrder: 1,
    filters: getFilters(),
  });

  useEffect(() => {
    async function fetchColumns() {
      const res = await getDataTable(1);
      if (res.length <= 0) {
        return;
      }
      setColumns(res);
    }

    fetchColumns();
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [lazyState, update]);

  const fetchActivities = async () => {
    setLoading(true);
    const res = await getActivities(lazyState);
    const totalRecords = await countActivities(lazyState.filters);
    setData(res);
    setTotalRecords(totalRecords);
    setLoading(false);
  };

  const onPage = useCallback(event => {
    setLazyState(event);
  }, []);

  const onSort = useCallback(event => {
    setLazyState(event);
  }, []);

  const onFilter = useCallback(event => {
    event['first'] = 0;
    setLazyState(event);
  }, []);

  return (
    <Card title="Actividades">
      <Toast ref={toast} />
      <DataTable
        value={data}
        tableStyle={{
          minWidth: '50rem',
        }}
        loading={loading}
        lazy
        first={lazyState.first}
        totalRecords={totalRecords}
        onPage={onPage}
        onSort={onSort}
        onFilter={onFilter}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        paginator
        rows={lazyState.rows}
        rowsPerPageOptions={[5, 10, 15]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} actividades"
        removableSort
        emptyMessage="No hay actividades."
        filters={lazyState.filters}
      >
        {columns.map(col => (
          <Column
            key={col.id}
            field={col.column_name}
            header={col.visual_name}
            style={{ minWidth: '25%' }}
            sortable
            filter
            // filterField={col.column_name}
          />
        ))}
      </DataTable>
    </Card>
  );
}
