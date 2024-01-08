import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PokemonList from './Pokemon/PokemonList';
import TeamViewer from './Trainer/TeamViewer';
import TrainerSelector from './Trainer/TrainerSelector';

import './pokestyle.css';

const App: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCatch = async (pokemon: any) => {
    if (selectedTrainer === null) {
      setError('Please select a trainer.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5005/api/pokemon/`, {
        method: 'POST',
        body: JSON.stringify({
          PokedexId: pokemon.id,
          Name: pokemon.name,
          Type: "todo",
          image: pokemon.image,
          TrainerId: selectedTrainer,
          CapturedDate: new Date()
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        let error = await response.text();
        throw new Error(error || 'Failed to catch the Pokémon.');
      }

      // Reload the team viewer
      setSelectedTrainer(null);
      setSelectedTrainer(selectedTrainer);
    } catch (error) {
      setError(error.message || 'An error occurred while catching the Pokémon.');
    }
  };

  return (
    <div className="app-container">
      <div className="error-message">{error && <h2>{error}</h2>}</div>
      <div className="app-content">
        <div className="half-width">
          <h1>Pokémon List</h1>
          <TrainerSelector onSelect={(trainerId) => setSelectedTrainer(trainerId)} />
          <PokemonList onCatch={handleCatch} />
        </div>

        <div className="half-width">
          <h1>Trainer's Pokémon Team</h1>
          <TeamViewer selectedTrainerId={selectedTrainer} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
