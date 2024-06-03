export function formatDate(date) {
  if (typeof(date) === 'string') {
    date = new Date(date);
    date.setUTCHours(0, 0, 0, 0);
  }
  return date.toLocaleDateString('es-PY');
}