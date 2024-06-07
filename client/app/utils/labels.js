import { getVariable } from './variables';

async function getLabels() {
  const res = await fetch(getVariable('VITE_API_URL') + '/api/labels');
  return res.json();
}

export { getLabels };
