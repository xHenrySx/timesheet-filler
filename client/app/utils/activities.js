import { getVariable } from './variables';
import { formatDate } from './date';

/**
 * @param {Array} data
 * @returns {Array}
 */
function formatData(data) {
  return data.map(activity => {
    return {
      Fecha: formatDate(activity.date),
      Descripcion: activity.description,
      Duracion: activity.duration,
      'Jira Ticket': activity.jiraTicket,
      'Jira Cliente Ticket': activity.jiraClientTicket,
    };
  });
}

function getColumns() {
  return [
    { field: 'Fecha', header: 'Fecha' },
    { field: 'Descripcion', header: 'Descripcion' },
    { field: 'Duracion', header: 'Duracion' },
    { field: 'Jira Ticket', header: 'Jira Ticket' },
    { field: 'Jira Cliente Ticket', header: 'Jira Cliente Ticket' },
  ];
}

/**
 *
 * @param {Object} data
 * @returns {Promise<Boolean>}
 */
async function saveActivity(data) {
  let res = true;
  try {
    const response = await fetch(
      getVariable('VITE_API_URL') + '/api/activities',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(data),
      }
    );
  } catch (error) {
    console.error(`Error al guardar actividad: ${error}`);
    res = false;
  }
  return res;
}

export { formatData, getColumns, saveActivity };
