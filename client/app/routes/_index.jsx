import ActivitieForm from '../components/activitieform';
import { ActivitiesList } from '../components/activitieslist';
import { useState } from 'react';

export default function Index() {
  const [refreshKey, setRefreshKey] = useState(0);

  function refresh() {
    setRefreshKey(prevKey => prevKey + 1);
  }

  return (
    <div className="contenedor">
      <h1>Timesheet Filler</h1>
      <ActivitieForm onActivitySubmit={refresh} />
      <ActivitiesList key={refreshKey} />
    </div>
  );
}
