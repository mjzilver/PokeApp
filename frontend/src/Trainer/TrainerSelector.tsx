import React, { useState, useEffect } from 'react';

import { fetchTrainers } from './TrainerService';
import Trainer from './Trainer';

interface TrainerSelectorProps {
  trainers: Trainer[];
  onSelect: (trainer: Trainer | undefined) => void;
}

const TrainerSelector: React.FC<TrainerSelectorProps> = ({ trainers, onSelect }) => {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedTrainer(selectedId);
    onSelect(trainers.find((trainer) => trainer.id === selectedId));
  };

  return (
    <div>
      <label>Select Trainer:</label>
      <select value={selectedTrainer || ''} onChange={handleSelectChange}>
        <option value="" disabled>Select a Trainer</option>
        {trainers.map(trainer => (
          <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
        ))}
      </select>
    </div>
  );
};

export default TrainerSelector;
