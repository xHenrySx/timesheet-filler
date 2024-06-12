import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { getActivities } from '../utils/activities';

export function ActivitiesList() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setData(await getActivities());
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
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} actividades"
      >
        {columns.map(column => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
            style={{ minWidth: '25%' }}
            sortable
          />
        ))}
      </DataTable>
    </Card>
  );
}
