import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const LabelTable = ({value, loading, selectedLabels, onSelectionChange, projectBodyTemplate}) => {
  return (
    <DataTable
      value={value}
      loading={loading}
      style={{maxWidth: '70rem'}}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 15]}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} etiquetas"
      emptyMessage="No hay etiquetas."
      removableSort
      selection={selectedLabels}
      onSelectionChange={onSelectionChange}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      <Column
        field="name"
        header="Proyecto"
        style={{ minWidth: '25%' }}
        body={projectBodyTemplate}
        sortable
      />
      <Column
        field="color"
        header="Color"
        style={{ minWidth: '25%' }}
        sortable
      />
    </DataTable>
  );
};

export default LabelTable;
