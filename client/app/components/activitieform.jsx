import { saveActivity } from '../utils/activities';
import { useState, useCallback } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { addLocale } from 'primereact/api';
const ActivitieForm = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    description: '',
    duration: 1,
  });

  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  addLocale('es', {
    firstDayOfWeek: 1,
    showMonthAfterYear: true,
    dayNames: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
    today: 'Hoy',
    clear: 'Limpiar',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await saveActivity(formData);
    if (response) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        duration: 1,
      });
    }
  };

  const handleChange = useCallback(
    e => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    [formData]
  );

  return (
    <form className="form-contenedor">
      <Calendar
        value={formData.date}
        name="date"
        id="date"
        required
        placeholder="Fecha"
        onChange={handleChange}
        dateFormat="dd/mm/yy"
        locale="es"
        showIcon
        style={{ width: '100%' }}
        touchUI={isMobile}
      />
      <InputText
        id="description"
        name="description"
        placeholder="descripcion"
        minLength={1}
        value={formData.description}
        onChange={handleChange}
        required
      />
      <InputNumber
        id="duration"
        name="duration"
        placeholder="Duración"
        value={formData.duration}
        onChange={handleChange}
        minFractionDigits={0}
        maxFractionDigits={2}
        min={0.5}
        required
      />
      <div className="submit-contenedor">
        <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ActivitieForm;
