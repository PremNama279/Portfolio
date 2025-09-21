import React from 'react';
import './BackgroundSelector.css';

const BackgroundSelector = ({ currentBackground, onBackgroundChange }) => {
  const backgroundOptions = [
    { id: 'none', name: 'None' },
    { id: 'particles', name: 'Particles' },
    { id: 'waves', name: 'Waves' },
    { id: 'anisquares', name: 'Anisquares' },
    { id: 'lightning', name: 'Lightning' }
  ];

  return (
    <div className="background-selector">
      <select 
        value={currentBackground} 
        onChange={(e) => onBackgroundChange(e.target.value)}
        className="background-select"
      >
        <option value="" disabled>Select Background</option>
        {backgroundOptions.map(bg => (
          <option key={bg.id} value={bg.id}>
            {bg.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BackgroundSelector; 