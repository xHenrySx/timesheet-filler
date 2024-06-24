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
    response
  };
}

export { getLabels, saveLabel };
