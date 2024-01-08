import React, { useState, useEffect } from 'react';

interface Trainer {
  id: number;
  name: string;
}

interface TrainerSelectorProps {
  onSelect: (trainerId: number) => void;
}

const TrainerSelector: React.FC<TrainerSelectorProps> = ({ onSelect }) => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/trainer', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    setSelectedTrainer(selectedId);
    onSelect(selectedId);
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

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
