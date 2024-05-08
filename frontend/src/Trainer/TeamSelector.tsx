import React, { useState, useEffect } from 'react';
import Trainer from './Trainer';
import { Pokemon } from '../Pokemon/Pokemon';
import { fetchTrainerTeam } from './TrainerService';

interface TeamSelectorProps {
    selectedTrainer: Trainer;
    onSelect: (pokemom: Pokemon | undefined) => void;
}

const PokemonSelector: React.FC<TeamSelectorProps> = ({ selectedTrainer, onSelect }) => {
    const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
    const [trainer, setTrainer] = useState<Trainer | null>(null);
    
    useEffect(() => {
        if (selectedTrainer !== null && trainer === null) {
            fetchTrainerTeam(selectedTrainer.id).then((trainer) => setTrainer(trainer));
        }
    }, [trainer]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        setSelectedPokemon(selectedId);
        onSelect(trainer?.pokemons.find((pokemon) => pokemon.id === selectedId));
    }

    return (
        <div>
          <label>Select Pokemon:</label>
          <select value={selectedPokemon || ''} onChange={handleSelectChange}>
            <option value="" disabled>Select a Pokemon</option>
            {trainer?.pokemons.map(trainer => (
              <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
            ))}
          </select>
        </div>
      );
};

export default PokemonSelector;
