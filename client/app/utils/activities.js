import { getVariable } from './variables';
import { formatDate } from './date';

/**
 * This function formats the data to be displayed in the table
 * also each field name is the name displayed in the table
 * @param {Array} data
 * @returns {Array}
 */
function formatData(data) {
  data = defaultContent(data);
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
/**
 * @param {Array} data
 * @returns {Array}
 */
function defaultContent(data) {
  return data.map(item => {
    for (const key in item) {
      if (item[key] === null) {
        item[key] = '-';
      }
    }
    return item;
  });
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

    if (!response.ok) {
      console.error(`Error al guardar actividad: ${response.statusText}`);
      res = false;
    }
  } catch (error) {
    console.error(`Error al guardar actividad: ${error}`);
    res = false;
  }
  return res;
}

export { formatData, saveActivity };
