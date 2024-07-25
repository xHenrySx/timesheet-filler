import { useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';

import useIsMobile from '../../hooks/useIsMobile';
import { useData } from '../../hooks/useData';

import { stringToDate } from '../../utils/date';

const DynamicEditor = ({
  options,
  type,
  autocompleteFrom,
  autocompleField,
}) => {
  const [searchData, setSearchData] = useState([]);
  const data = useData(autocompleteFrom, [autocompleField]);

  const isMobile = useIsMobile();

  const onChange = e => {
    const value = e.target ? e.target.value : e.value;
    options.editorCallback(value);
  };

  const search = async event => {
    const { query } = event;
    setSearchData(
      data.filter(label => label.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleChange = onChange;
  const handleCompleteMethod = search;


  switch (type) {
    case 'text':
      return (
        <InputText
          type="text"
          value={options?.value}
          minLength={1}
          onChange={handleChange}
        />
      );
    case 'number':
      return (
        <InputNumber
          placeholder="Duracion"
          value={options?.value}
          onValueChange={handleChange}
          minFractionDigits={0}
          maxFractionDigits={2}
          min={0.5}
        />
      );
    case 'date': {
      const date = stringToDate(options?.value);
      return (
        <Calendar
          value={date}
          onChange={handleChange}
          dateFormat="dd/mm/yy"
          locale="es"
          style={{ width: '100%' }}
          touchUI={isMobile}
        />
      );
    }
    case 'select':
      return (
        <AutoComplete
          value={options?.value}
          onChange={handleChange}
          suggestions={searchData}
          completeMethod={handleCompleteMethod}
          dropdown
        />
      );
    default:
      return null;
  }
};

export default DynamicEditor;
