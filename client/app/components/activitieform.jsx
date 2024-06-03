import { saveActivity } from '../utils/activities';
import { useState } from 'react';

const ActivitieForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    duration: 1,
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await saveActivity(formData);
    if (response) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        duration: 1,
      });
    }
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="form-contenedor">
      <input
        type="date"
        id="date"
        name="date"
        placeholder="Fecha"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <textarea
        type="text"
        id="description"
        name="description"
        placeholder="descripcion"
        minLength={1}
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        id="duration"
        name="duration"
        placeholder="duracion"
        min={0}
        value={formData.duration}
        onChange={handleChange}
        required
      />
      <div className="submit-contenedor">
        <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ActivitieForm;
