import ActivitieForm from '../components/activitieform';
import { ActivitiesList } from '../components/activitieslist';
import { useState } from 'react';
export const meta = () => {
  return [
    { title: 'Timesheet Filler - Actividades' },
    {
      name: 'description',
      content: 'A simple app to fill activities in Sodep',
    },
  ];
};

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
