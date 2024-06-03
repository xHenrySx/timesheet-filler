import PropTypes from 'prop-types';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';

const FormBody = ({formData, handleChange, isMobile}) => {
  return (
    <form id="form-actividades">
      <FloatLabel>
        <Calendar
          value={formData?.date}
          name="date"
          id="date"
          required
          onChange={handleChange}
          dateFormat="dd/mm/yy"
          locale="es"
          showIcon
          style={{ width: '100%' }}
          touchUI={isMobile}
        />
        <label htmlFor="date">Fecha</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="description"
          name="description"
          minLength={1}
          value={formData?.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Descripcion</label>
      </FloatLabel>
      <FloatLabel>
        <InputNumber
          id="duration"
          name="duration"
          placeholder="Duracion"
          value={formData?.duration}
          onValueChange={handleChange}
          minFractionDigits={0}
          maxFractionDigits={2}
          min={0.5}
          required
        />
        <label htmlFor="duration">Duracion</label>
      </FloatLabel>
    </form>
  );
};

FormBody.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  isMobile: PropTypes.bool,
};



export default FormBody;
