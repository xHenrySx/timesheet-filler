export function formatDate(date) {
  if (typeof(date) === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('es-PY');
}