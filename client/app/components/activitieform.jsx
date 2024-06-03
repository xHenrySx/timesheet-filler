import { saveActivity } from '../utils/activities';
import { useState, useCallback, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { addLocale } from 'primereact/api';
const ActivitieForm = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    description: '',
    duration: 1,
  });
  const toast = useRef(null);

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

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const res = await saveActivity(formData);
      console.log(res);
      if (res.response) {
        setFormData({
          date: new Date().toISOString().split('T')[0],
          description: '',
          duration: 1,
        });
        toast.current.show({
          severity: 'success',
          summary: 'Actividad guardada',
          detail: 'La actividad se guardo correctamente',
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: 'error',
          summary: 'Error al guardar',
          detail: `${res.message}`,
          life: 3000,
        });
      }
    },
    [formData]
  );

  const handleChange = useCallback(e => {
    const name = e.target ? e.target.name : e.source?.props?.name;
    const value = e.target ? e.target.value : e.value;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <div className="form-container">
        <form id="form-actividades">
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
            placeholder="Duracion"
            value={formData.duration}
            onValueChange={handleChange}
            minFractionDigits={0}
            maxFractionDigits={2}
            min={0.5}
            required
          />
        </form>
        <Button
          form="form-actividades"
          label="Guardar"
          onClick={handleSubmit}
          className="p-button-raised p-button-success"
        />
      </div>
    </>
  );
};

export default ActivitieForm;
