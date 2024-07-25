const options = {
  timezone: 'UTC',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

const pattern = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // dd/mm/aaaa
/**
 * Formatea un objeto date
 * @param {Date} date
 * @returns String
 */
export function dateToString(date, locale) {
  if (typeof date === 'string' && pattern.test(date)) {
    date = date.split('/').reverse().join('/');
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const defaultLocale = locale || 'es-PY';

  return date.toLocaleDateString(defaultLocale, options);
}

/**
 * Convierte un string a fecha
 * @param {String} date
 * @returns {Date}
 */
export function stringToDate(date) {
  if (typeof date !== 'string') {
    throw new Error('Parameter date its not a string.');
  }

  if (typeof date === 'string' && pattern.test(date)) {
    date = date.split('/').reverse().join('/');
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date;
}
