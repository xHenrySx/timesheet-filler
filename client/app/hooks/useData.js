import { useEffect, useMemo, useState } from 'react';
import { getVariable } from '../utils/variables';

export const useData = (tableName, fields, lazyState) => {

  const [data, setData] = useState([]);

  const memoizedLazyState = useMemo(
    () => JSON.stringify(lazyState),
    [lazyState]
  );

  const memoizedFields = useMemo(() => JSON.stringify(fields), [fields]);

  useEffect(() => {
    async function fetchData() {
      if (!tableName) return;
      const url = new URL(getVariable('VITE_API_URL') + `/api/${tableName}`);
      if (lazyState) {
        url.search = new URLSearchParams(lazyState).toString();
      }
      const res = await fetch(url.toString());
      const response = await res.json();
      if (!res.ok) {
        return;
      }

      let data = response;
      if (fields.length) {
        data = fields.reduce((acc, field) => {
          acc.push(...response.map(res => res[field]));
          return acc;
        }, []);
      }

      setData(data);
    }

    fetchData();
  }, [tableName, memoizedFields, memoizedLazyState]);

  return data;
};
