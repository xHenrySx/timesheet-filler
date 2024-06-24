import { getVariable } from './variables';
import { FilterMatchMode } from 'primereact/api';

export function getFilters() {
  return {
    date: { value: null, matchMode: FilterMatchMode.EQUALS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    duration: { value: null, matchMode: FilterMatchMode.EQUALS },
    jiraTicket: { value: null, matchMode: FilterMatchMode.EQUALS },
    jiraClientTicket: { value: null, matchMode: FilterMatchMode.EQUALS },
    label: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
}

/**
 * Obtiene todos los datos para construir los headers de la tabla
 * @returns {Promise<Array>}
 */
export const getDataTable = async (tableId) => {
  const url = new URL(getVariable('VITE_API_URL') + '/api/datatable');
  url.searchParams.append('table_id', tableId);
  try {
    const res = await fetch(url.toString());
    const response = await res.json();
    if (!res.ok) {
      return [];
    }
    return response;
  }
  catch (error) {
    return [];
  }
};

export const getColumns = datatable => {
  return datatable.map(col => ({
    column_name: col.column_name,
    field: col.name,
    active: col.active,
  }));
};
