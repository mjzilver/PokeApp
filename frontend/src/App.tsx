import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PokemonList from './Pokemon/PokemonList';
import TeamViewer from './Trainer/TeamViewer';
import TrainerSelector from './Trainer/TrainerSelector';

import './pokestyle.css'; 

const App: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

  const handleCatch = (pokemon: any) => {
    console.log(`Caught ${pokemon.name} by Trainer ${selectedTrainer}!`);
  };

  return (
    <div className="app-container">
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
