import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PokemonList from './Pokemon/PokemonList';
import TeamViewer from './Trainer/TeamViewer';
import TrainerSelector from './Trainer/TrainerSelector';

import './pokestyle.css';
import Trainer from './Trainer/Trainer';

const App: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCatch = async (pokemon: any) => {
    try {
      if (selectedTrainer === null) {
        setError('Please select a trainer.');
        return;
      }

      const responseCatch = await fetch(`http://localhost:5005/api/pokemon/`, {
        method: 'POST',
        body: JSON.stringify({
          PokedexId: pokemon.id,
          Name: pokemon.name,
          Types: pokemon.types,
          Image: pokemon.image,
          TrainerId: selectedTrainer.id,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!responseCatch.ok) {
        throw new Error('You are not allowed to have more than 6 pokemon.');
      }

      // Update the selectedTrainer state with the new Pokemon
      if (selectedTrainer) {
        setSelectedTrainer((prevTrainer) => {
          if (prevTrainer) {
            return {
              ...prevTrainer,
              pokemons: [...prevTrainer.pokemons, pokemon],
            };
          }
          return prevTrainer;
        });
      }

    } catch (error) {
      setError(error.message || 'An error occurred while catching the Pokémon.');
    }
  };

  return (
    <div className="app-container">
      <div className="error-message">{error && <h2>{error}</h2>}</div>
      <div className="app-content">
        <div className="half-width">
          <TrainerSelector onSelect={(trainer) => {
            if (trainer) setSelectedTrainer(trainer)
          }} />
          <PokemonList onCatch={handleCatch} />
        </div>

        <div className="half-width">
          <TeamViewer selectedTrainer={selectedTrainer} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
