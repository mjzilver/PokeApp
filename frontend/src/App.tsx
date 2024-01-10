import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PokemonList from './Pokemon/PokemonList';
import TeamViewer from './Trainer/TeamViewer';
import TrainerSelector from './Trainer/TrainerSelector';
import { fetchTrainers } from './Trainer/TrainerService';

import './pokestyle.css';
import Trainer from './Trainer/Trainer';
import { catchPokemon } from './Pokemon/PokemonService';

const App: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers().then((fetchedTrainers) => setTrainers(fetchedTrainers));
  }, []);

  const handleCatch = async (pokemon: any) => {
    if (selectedTrainer === null) {
      setError('Please select a trainer.');
      return;
    }

    catchPokemon(pokemon, selectedTrainer.id).then((response: Response) => {
      if (response.ok) {

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
      } else {
        response.text().then((text) => {
          setError(text); 
        });
      }
    }).catch((error) => {
      setError(error.message || 'Something went wrong.');
    });
  };

  return (
    <div className="app-container">
      <div className="error-message">{error && <h2>{error}</h2>}</div>
      <div className="app-content">
        <div className="half-width">
          <TrainerSelector trainers={trainers} onSelect={(trainer) => {
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
