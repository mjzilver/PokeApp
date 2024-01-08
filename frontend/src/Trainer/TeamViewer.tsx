import React, { useState, useEffect } from 'react';
import PokemonCard from '../Pokemon/PokemonCard';
import TrainerSelector from '../Trainer/TrainerSelector';
import Pokemon from '../Pokemon/Pokemon';
import Trainer from './Trainer';

interface TeamViewerProps {
  selectedTrainerId: number | null;
}

const TeamViewer: React.FC<TeamViewerProps> = ({ selectedTrainerId: selectedTrainerId }) => {
  const [trainer, setTrainer] = useState<Trainer | null>(null);


  const fetchTrainerTeam = async (trainerId: number) => {
    try {
      const response = await fetch(`http://localhost:5000/api/trainer/${trainerId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data)
      setTrainer(data);
    } catch (error) {
      console.error('Error fetching trainer team:', error);
    }
  };

  useEffect(() => {
    if (selectedTrainerId !== null) {
      fetchTrainerTeam(selectedTrainerId);
    }
  }, [selectedTrainerId]);

  return (
    <div>
      <h2>{trainer?.name ?? "Nobody"}'s Pokémon Team</h2>
      {trainer !== null && trainer.pokemons !== null ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
          {trainer.pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onCatch={() => {}} />
          ))}
        </div>
      ) : (
        <p>Select a trainer to view their team.</p>
      )}
    </div>
  );
};

export default TeamViewer;
