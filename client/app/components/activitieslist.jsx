import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { getActivities } from '../utils/activities';

export function ActivitiesList() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = {
    Fecha: {value: null, matchMode: FilterMatchMode.EQUALS},
    Descripcion: {value: null, matchMode: FilterMatchMode.CONTAINS},
    Duracion: {value: null, matchMode: FilterMatchMode.EQUALS},
    'Jira Ticket': {value: null, matchMode: FilterMatchMode.EQUALS},
    'Jira Cliente Ticket': {value: null, matchMode: FilterMatchMode.EQUALS},
  };


  useEffect(() => {
    async function fetchData() {
      setData(await getActivities());
      setLoading(false);
    }


    fetchData();
  }, []);

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
  },[data]);

  return (
    <Card title="Actividades">
      <DataTable
        value={data}
        tableStyle={{
          minWidth: '50rem',
        }}
        loading={loading}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} actividades"
        removableSort
        emptyMessage="No hay actividades."
        filters={filters}
      >
        {columns.map(column => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
            style={{ minWidth: '25%' }}
            sortable
            filter
          />
        ))}
      </DataTable>
    </Card>
  );
}
