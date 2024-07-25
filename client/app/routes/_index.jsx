import ActivitieForm from '../components/Forms/ActivitieForm';
import ActivitieTable from '../components/Tables/ActivitieTable';
import { useCallback, useState } from 'react';

export default function Index() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className="contenedor">
      <h1>Timesheet Filler</h1>
      <ActivitieForm onActivitySubmit={refresh} />
      <ActivitieTable update={refreshKey} onActivityDelete={refresh} />
    </div>
  );
}
