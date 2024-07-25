import { saveActivity } from '../../utils/activities';
import { showError, showSuccess } from '../../utils/toast';
import ActivitieFormBody from './ActivitieFormBody';

import { useState, useCallback, useRef } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { addLocale } from 'primereact/api';

import '../../styles/activitieform.css';
import useIsMobile from '../../hooks/useIsMobile';

const defaultFormData = {
  date: new Date(),
  description: '',
  duration: 1,
  jiraTicket: '',
  jiraClientTicket: '',
  label: '',
};

const loadingButton = {
  label: 'Guardando',
  icon: 'pi pi-spin pi-spinner',
  loading: true,
};

const defaultButton = {
  label: 'Guardar',
  icon: 'pi pi-check',
  loading: false,
};

const ActivitieForm = ({onActivitySubmit}) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [buttonSave, setButtonSave] = useState(defaultButton);
  const toast = useRef(null);

  const isMobile = useIsMobile();

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
      setButtonSave(loadingButton);
      e.preventDefault();
      const res = await saveActivity(formData);

      if (res.response) {
        showSuccess(toast, 'Actividad guardada', 'La actividad se guardo correctamente');
        onActivitySubmit();
      } else {
        showError(toast, 'Error', res.message);
      }
      setTimeout(() => {
        setButtonSave(defaultButton);
      }, 500);
    },
    [formData]
  );

  const clearForm = useCallback(() => {
    setFormData(defaultFormData);
  }, []);

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
      <ActivitieFormBody
        handleChange={handleChange}
        formData={formData}
        isMobile={isMobile}
      />
      <div className="button-container">
        <Button
          form="form-actividades"
          label={buttonSave.label}
          icon={buttonSave.icon}
          loading={buttonSave.loading}
          type="submit"
          onClick={handleSubmit}
          className="p-button-raised"
        />
        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          aria-label="Clear"
          size="large"
          type="button"
          onClick={clearForm}
        />
      </div>
    </>
  );
};

export default ActivitieForm;
