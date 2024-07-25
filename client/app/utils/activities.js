import { getVariable } from './variables';
import { dateToString } from './date';

/**
 * @param {Array} data
 * @returns {Array}
 */
function formatActivities(data) {
  data = defaultContent(data);
  return data.map(activity => {
    for (const key in activity) {
      if (key === 'date') {
        activity[key] = dateToString(activity[key]);
      }
    }
    return activity;
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
  const res = {
    response: true,
    message: 'Actividad guardada',
  };
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
    const result = await response.json();

    if (!response.ok) {
      res.response = false;
      res.message = result.message;
    }
  } catch (error) {
    res.response = false;
    res.message = error;
  }
  return res;
}

/**
 * @returns {Promise<Array>}
 */
async function getActivities(lazyState) {
  const filter = {
    ...lazyState,
  };
  filter.filters = JSON.stringify(filter.filters);
  const url = new URL(getVariable('VITE_API_URL') + '/api/activities');
  url.search = new URLSearchParams(filter).toString();
  const res = await fetch(url.toString());
  const response = await res.json();
  if (!res.ok) {
    return [];
  }
  return formatActivities(response);
}

async function countActivities(filters) {
  const filter = {
    filters: JSON.stringify(filters),
  };
  const url = new URL(getVariable('VITE_API_URL') + '/api/activities/count');
  url.search = new URLSearchParams(filter).toString();

  const res = await fetch(url.toString());
  const response = await res.json();
  if (!res.ok) {
    return 0;
  }
  return response.count;
}

async function deleteActivity(id) {
  const res = {
    response: true,
    message: 'Actividad eliminada',
  };
  try {
    const response = await fetch(
      getVariable('VITE_API_URL') + '/api/activities/' + id,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      res.response = false;
      res.message = result.message;
    }
  } catch (error) {
    res.response = false;
    res.message = error;
  }
  return res;
}

async function editActivity(id, data) {
  console.log(id, data);
  const res = {
    response: true,
    message: 'Actividad actualizada',
  };
  try {
    const response = await fetch(
      getVariable('VITE_API_URL') + '/api/activities/' + id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();

    if (!response.ok) {
      res.response = false;
      res.message = result.message;
    }
  } catch (error) {
    res.response = false;
    res.message = error;
  }
  return res;
}

export {
  formatActivities,
  saveActivity,
  getActivities,
  countActivities,
  deleteActivity,
  editActivity
};
