import { FilterMatchMode } from 'primereact/api';

export function getFilters() {
  return {
    Fecha: { value: null, matchMode: FilterMatchMode.EQUALS },
    Descripcion: { value: null, matchMode: FilterMatchMode.CONTAINS },
    Duracion: { value: null, matchMode: FilterMatchMode.EQUALS },
    'Jira Ticket': { value: null, matchMode: FilterMatchMode.EQUALS },
    'Jira Cliente Ticket': { value: null, matchMode: FilterMatchMode.EQUALS },
  };
}
