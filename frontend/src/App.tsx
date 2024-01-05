import React from 'react';
import ReactDOM from 'react-dom';

import PokemonList from './PokemonList';
import Pokemon from './Pokemon';

const App: React.FC = () => {
    const handleCatch = (pokemon: Pokemon) => {
        console.log(`Caught ${pokemon.name}!`);
    };

    return (
        <div>
            <h1>Pokémon Catcher</h1>
            <PokemonList onCatch={handleCatch} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
