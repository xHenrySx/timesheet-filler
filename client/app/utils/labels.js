import { getVariable } from './variables';

async function getLabels() {
  const res = await fetch(getVariable('VITE_API_URL') + '/api/labels');
  return res.json();
}

async function saveLabel(data) {
  const res = await fetch(getVariable('VITE_API_URL') + '/api/labels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  return {
    ok: res.ok,
    response,
  };
}

async function deleteLabel(id) {
  const response = {
    response: true,
    message: 'Etiqueta eliminada correctamente',
  };
  const res = await fetch(`${getVariable('VITE_API_URL')}/api/labels/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  });

  const { message } = await res.json();

  if (!res.ok) {
    response.response = false;
    response.message = message;
  }

  return response;
}

export { getLabels, saveLabel, deleteLabel };
