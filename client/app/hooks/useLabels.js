import { useState, useEffect, useMemo, memo } from 'react';
import { getLabels } from '../utils/labels';

export const useLabels = fields => {
  const [labels, setLabels] = useState([]);

  const memoizedFields = useMemo(() => fields, [JSON.stringify(fields)]);

  const fetchLabels = async () => {
    const labels = await getLabels();

    if (fields.length) {
      return fields.reduce((acc, field) => {
        acc.push(...labels.map(label => label[field]));
        return acc;
      }, []);
    }
    return labels;
  };

  useEffect(() => {
    fetchLabels().then(setLabels);
  }, [memoizedFields]);

  return labels;
};

