import { useEffect, useState, useRef, useCallback } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

import DynamicEditor from '../Forms/DynamicEditor';

import {
  getActivities,
  countActivities,
  deleteActivity,
  editActivity,
} from '../../utils/activities';
import { getFilters, getDataTable } from '../../utils/datatable';
import { showError, showSuccess } from '../../utils/toast';

import '../../styles/activitiestable.css';

const ActivitieTable = ({ update, onActivityDelete }) => {
  const toast = useRef(null);
  const [activities, setActivities] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 5,
    page: 1,
    sortField: 'date', // desC
    sortOrder: -1,
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
    setActivities(res);
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
  }, []);

  const onRowEditComplete = useCallback(async e => {
    const { data, newData } = e;
    if (!data || !newData) {
      return;
    }
    const res = await editActivity(data.id, newData);
    if (
      res.hasOwnProperty('response') &&
      res.hasOwnProperty('message') &&
      !res.response
    ) {
      showError(toast, 'Error', res.message);
      return;
    }
    showSuccess(
      toast,
      'Actividad editada',
      'La actividad se edito correctamente'
    );
    fetchActivities();
  }, []);

  const handleOption = useCallback(options => {
    const { autocompleteFrom, autocompleteField, editor_type } =
      options.column.props;
    return (
      <DynamicEditor
        options={options}
        type={editor_type}
        autocompleteFrom={autocompleteFrom}
        autocompleField={autocompleteField}
      />
    );
  }, []);

  const deleteActivities = useCallback(async () => {
    if (selectedActivities.length <= 0) {
      showError(toast, 'Error', 'Selecciona una actividad');
      return;
    }
    const ids = selectedActivities.map(activity => activity.id);
    for (const id of ids) {
      const res = await deleteActivity(id);
      if (
        res.hasOwnProperty('response') &&
        res.hasOwnProperty('message') &&
        !res.response
      ) {
        const message =
          typeof res.message === 'string'
            ? res.message
            : 'Error al eliminar la actividad';
        showError(toast, 'Error', message);
        return;
      }
    }
    showSuccess(
      toast,
      'Actividades eliminadas',
      'Las actividades se eliminaron correctamente'
    );
    setSelectedActivities([]);
    onActivityDelete();
  }, [selectedActivities]);

  return (
    <Card title="Actividades">
      <Toast ref={toast} />
      <DataTable
        className="activities-table"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} actividades"
        dataKey="id"
        editMode="row"
        emptyMessage="No hay actividades."
        filters={lazyState.filters}
        first={lazyState.first}
        loading={loading}
        lazy
        onSelectionChange={onSelectionChange}
        onPage={onPage}
        onSort={onSort}
        onFilter={onFilter}
        onRowEditComplete={onRowEditComplete}
        paginator
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        rowsPerPageOptions={[5, 10, 15]}
        rows={lazyState.rows}
        removableSort
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        selection={selectedActivities}
        stateStorage="local"
        stateKey="activities-table"
        tableStyle={{
          minWidth: '50rem',
        }}
        totalRecords={totalRecords}
        value={activities}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3rem' }}
        ></Column>
        {columns.map(col => (
          <Column
            key={col.id}
            field={col.column_name}
            header={col.visual_name}
            style={{ minWidth: '25%' }}
            autocompleteFrom={col.autocomplete_from}
            autocompleteField={col.autocomplete_field}
            editor_type={col.editor_type}
            editor={handleOption}
            sortable
            filter
            // filterField={col.column_name}
          />
        ))}
        <Column rowEditor={true} />
      </DataTable>
      <Button
        label="Borrar"
        severity="danger"
        outlined
        onClick={deleteActivities}
      />
    </Card>
  );
};

export default ActivitieTable;
