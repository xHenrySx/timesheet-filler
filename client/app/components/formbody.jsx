import PropTypes from 'prop-types';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { AutoComplete } from 'primereact/autocomplete';

const FormBody = ({ formData, handleChange, isMobile }) => {
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
              id="project"
              name="project"
              value={formData?.project}
              onChange={handleChange}
            />
            <label htmlFor="project">Proyecto</label>
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

FormBody.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default FormBody;
