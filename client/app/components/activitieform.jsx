import { saveActivity } from '../utils/activities';
import FormBody from './formbody';

import { useState, useCallback, useRef } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { addLocale } from 'primereact/api';

import '../styles/activitieform.css';

const defaultFormData = {
  date: new Date(),
  description: '',
  duration: 1,
  jiraTicket: '',
  jiraClientTicket: '',
};

const ActivitieForm = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [lastFormDataSubmited, setLastFormDataSubmited] = useState({});
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
      if (res.response) {
        setFormData(defaultFormData);
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
      <FormBody
        handleChange={handleChange}
        formData={formData}
        isMobile={isMobile}
      />
      <div className="form-container">
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
