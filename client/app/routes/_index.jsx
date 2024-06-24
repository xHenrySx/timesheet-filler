import ActivitieForm from '../components/activitieform';
import { ActivitiesList } from '../components/activitieslist';
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
      <ActivitiesList update={refreshKey} />
    </div>
  );
}
