import { useEffect, useState, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { getActivities, countActivities, deleteActivity } from '../utils/activities';
import { getFilters, getDataTable } from '../utils/datatable';
import { Button } from 'primereact/button';

import '../styles/activitiestable.css';
import { showError, showSuccess } from '../utils/toast';

export function ActivitiesList({update, onActivityDelete}) {
  const toast = useRef(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState([]);

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

  const onSelectionChange = useCallback(e => {
    setSelectedActivities(e.value);
  }
  , []);

  const deleteActivities = useCallback(async () => {
    if (selectedActivities.length <= 0) {
      showError(toast, 'Error', 'Selecciona una actividad');
      return;
    }
    const ids = selectedActivities.map(activity => activity.id);
    for (const id of ids) {
          const res = await deleteActivity(id);
          if (res.hasOwnProperty('response') && res.hasOwnProperty('message') && !res.response) {
            const message = typeof res.message === 'string' ? res.message : 'Error al eliminar la actividad';
            showError(toast, 'Error', message);
            return;
          }
        }
    showSuccess(toast, 'Actividades eliminadas', 'Las actividades se eliminaron correctamente');
    setSelectedActivities([]);
    onActivityDelete();
  }, [selectedActivities]);

  return (
    <Card title="Actividades">
      <Toast ref={toast} />
      <DataTable
        className='activities-table'
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
        dataKey="id"
        selection={selectedActivities}
        onSelectionChange={onSelectionChange}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
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
      <Button label='Borrar' severity='danger' outlined onClick={deleteActivities}/>
    </Card>
  );
}
