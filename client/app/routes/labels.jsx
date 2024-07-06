import { useCallback, useState, useRef, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { saveLabel, getLabels, deleteLabel } from '../utils/labels';
import { showError, showSuccess } from '../utils/toast';
import { getDataTable } from '../utils/datatable';

import '../styles/labels.css';

const defaultFormData = { name: '', color: '2457AC' };

const Labels = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [value, setValue] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    setLoading(true);
    const datatable = await getDataTable(2);
    const res = await getLabels();
    setValue(res);
    setColumns(datatable);
    setLoading(false);
  };

  const onSumit = useCallback(async () => {
    try {
      const res = await saveLabel(formData);
      if (!res.ok) {
        showError(toast, 'Error al guardar', res.response.message);
        return;
      }
      defaultFormData.color = formData.color;
      setFormData(defaultFormData);
      showSuccess(toast, 'Guardado', 'Etiqueta guardada correctamente');
    } catch (error) {
      showError(toast, 'Error al guardar', 'Error al guardar la etiqueta');
    }
    fetchLabels();
  }, [formData]);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const onColorChange = useCallback(e => {
    setFormData(prevFormData => ({
      ...prevFormData,
      color: e.value,
    }));
  }, []);

  const deleteLabels = useCallback(async () => {
    if (selectedLabels.length <= 0) {
      showError(toast, 'Error al eliminar', 'Seleccione etiquetas a eliminar');
      return;
    }
    const ids = selectedLabels.map(label => label.name);
    for (const id of ids) {
      const res = await deleteLabel(id);
      if (!res.response) {
        showError(toast, 'Error al eliminar', res.message);
        return;
      }
      showSuccess(toast, 'Eliminado', 'Etiqueta eliminada correctamente');
      fetchLabels();
    }
  }, [selectedLabels]);


  const onSelectionChange = useCallback(e => {
    setSelectedLabels(e.value);
  }, []);
  const projectBodyTemplate = project => (
    <Tag
      className="label-tag"
      value={project.name}
      style={{ background: `#${project.color}` }}
    />
  );

  return (
    <div className="contenedor label-container">
      <Toast ref={toast} />
      <Card
        title="Proyectos"
        subTitle="Etiquetas de proyectos"
        className="label-card"
      >
        <div className="input-area">
          <InputText
            id="name"
            name="name"
            placeholder="Nombre del proyecto"
            onChange={onChange}
            value={formData.name}
            required
          />
          <ColorPicker
            id="color"
            name="color"
            value={formData.color}
            onChange={onColorChange}
            required
          />
        </div>
        <div className="button-area">
          <Button label="Crear" icon="pi pi-check" onClick={onSumit} />
        </div>
      </Card>
      <DataTable
        value={value}
        className="label-table"
        tableStyle={{
          minWidth: '20rem',
        }}
        loading={loading}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 15]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} actividades"
        emptyMessage="No hay etiquetas."
        removableSort
        selection={selectedLabels}
        onSelectionChange={onSelectionChange}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: '3rem' }}
        ></Column>
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
      <Button
        label="Borrar"
        severity="danger"
        outlined
        onClick={deleteLabels}
      />
    </div>
  );
};

export default Labels;
