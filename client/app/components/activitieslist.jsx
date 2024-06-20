import { useEffect, useState, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { getActivities } from '../utils/activities';
import { getFilters } from '../utils/datatable';

export function ActivitiesList() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const filters = getFilters();

  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 5,
    sortField: null,
    sortOrder: null,
    filters,
  });

  useEffect(() => {
    async function fetchData() {
      setData(await getActivities(lazyState));
      setLoading(false);
    }

    fetchData();
  }, [lazyState]);

  useEffect(() => {
    if (data.length <= 0) {
      return;
    }
    const columnNames = Object.keys(data[0]);
    const newColumns = columnNames.map(column => ({
      field: column,
      header: column,
    }));
    setColumns(newColumns);
  }, [data]);

  const onPageOrSort = useCallback(event => {
    setLazyState(event);
  }, []);

  const onFilter = useCallback(event => {
    event['first'] = 0;
    setLazyState(event);
  }, []);

  return (
    <Card title="Actividades">
      <DataTable
        value={data}
        tableStyle={{
          minWidth: '50rem',
        }}
        loading={loading}
        lazy
        first={lazyState.first}
        totalRecords={totalRecords}
        onPage={onPageOrSort}
        onSort={onPageOrSort}
        onFilter={onFilter}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} actividades"
        removableSort
        emptyMessage="No hay actividades."
        filters={lazyState.filters}
      >
        {columns.map(column => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
            style={{ minWidth: '25%' }}
            sortable
            filter
            filterPlaceholder='Search'
          />
        ))}
      </DataTable>
    </Card>
  );
}
