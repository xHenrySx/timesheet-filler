import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { getVariable } from '../utils/variables';
import { formatData, getColumns } from '../utils/activities';

export function ActivitiesList() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch(getVariable('VITE_API_URL') + '/api/activities')
      .then(response => response.json())
      .then(data => setData(formatData(data)))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    setColumns(getColumns());
  }, []);

  return (
    <Card title="Actividades">
      <DataTable
        value={data}
        tableStyle={{
          minWidth: '50rem'
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
          />
        ))}
      </DataTable>
    </Card>
  );
}
