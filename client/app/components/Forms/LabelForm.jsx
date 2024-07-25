import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';

const LabelForm = ({ formData, onChange, onColorChange, onSubmit}) => {
  return (
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
        <Button label="Crear" icon="pi pi-check" onClick={onSubmit} />
      </div>
    </Card>
  );
};

export default LabelForm;
