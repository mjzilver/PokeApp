import React, { useState, useEffect } from 'react';
import PokemonCard from '../Pokemon/PokemonCard';
import Trainer from './Trainer';
import { fetchTrainerTeam } from './TrainerService';
import { releasePokemon } from '../Pokemon/PokemonService';

interface TeamViewerProps {
  selectedTrainer: Trainer | null;
}

const TeamViewer: React.FC<TeamViewerProps> = ({ selectedTrainer: selectedTrainer }) => {
  const [trainer, setTrainer] = useState<Trainer | null>(null);

  useEffect(() => {
    if (selectedTrainer !== null) {
      fetchTrainerTeam(selectedTrainer.id).then((trainer) => setTrainer(trainer));
    }
  }, [selectedTrainer]);

  return (
    <div>
      <h2>{trainer?.name ?? "Nobody"}'s Pokémon Team</h2>
      {trainer !== null && trainer.pokemons !== null ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
          {trainer.pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} clickText='Release' onClick={async () => { 
              releasePokemon(pokemon.id) 
              
              // update the state
              if (trainer) {
                const updatedPokemons = trainer.pokemons.filter((p) => p.id !== pokemon.id);
                setTrainer((prevTrainer) => {
                  if (prevTrainer) {
                    return { ...prevTrainer, pokemons: updatedPokemons };
                  }
                  return prevTrainer;
                });
              }
            }} />
          ))}
        </div>
      ) : (
        <p>Select a trainer to view their team.</p>
      )}
    </div>
  );
};

export default TeamViewer;
