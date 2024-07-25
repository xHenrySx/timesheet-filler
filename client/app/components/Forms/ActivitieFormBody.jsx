import PropTypes from 'prop-types';
import { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { AutoComplete } from 'primereact/autocomplete';
import { useLabels } from '../../hooks/useLabels';


const ActivitieFormBody = ({ formData, handleChange, isMobile }) => {

  const [items, setItems] = useState([]);
  const labels = useLabels(['name']);

  const search = async event => {
    const { query } = event;
    setItems(labels.filter(label => label.toLowerCase().includes(query.toLowerCase())));
  };

  const handleCompleteMethod = search;

  return (
    <form id="form-actividades">
      <div className="form-header">
        <div className="date-container">
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
        </div>
        <div className="description-container">
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
        </div>
        <div className="duration-container">
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
        </div>
      </div>
      <div className="form-body">
        <div className="project-container">
          <FloatLabel>
            <AutoComplete
              id="label"
              name="label"
              value={formData?.label}
              onChange={handleChange}
              suggestions={items}
              completeMethod={handleCompleteMethod}
              dropdown
            />
            <label htmlFor="label">Proyecto</label>
          </FloatLabel>
        </div>
        <div className="jira-ticket-container">
          <FloatLabel>
            <InputText
              id="jiraticket"
              name="jiraTicket"
              value={formData?.jiraTicket}
              onChange={handleChange}
            />
            <label htmlFor="jiraticket">Jira Ticket</label>
          </FloatLabel>
        </div>
        <div className="jira-client-ticket-container">
          <FloatLabel>
            <InputText
              id="jiraclientticket"
              name="jiraClientTicket"
              value={formData?.jiraClientTicket}
              onChange={handleChange}
            />
            <label htmlFor="jiraclientticket">Jira Client Ticket</label>
          </FloatLabel>
        </div>
      </div>
    </form>
  );
};

ActivitieFormBody.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default ActivitieFormBody;
