import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { getVariable } from '../utils/variables';
import { formatData, getColumns } from '../utils/activities';

export function ActivitiesList() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const header = <div className="table-header">Actividades</div>;
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
    <DataTable
      value={data}
      header={header}
      rows={5}
      showGridlines
      stripedRows
      paginator
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{
        minWidth: '50rem'
       }}
       paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords} actividades'
    >
      {columns.map(column => (
        <Column
          key={column.field}
          field={column.field}
          header={column.header}
        />
      ))}
    </DataTable>
  );
}
