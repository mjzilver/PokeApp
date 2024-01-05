import React from 'react';

import Pokemon from './Pokemon';

interface PokemonCardProps {
    pokemon: Pokemon;
    onCatch: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onCatch }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '150px', textAlign: 'center' }}>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
            <h3>{pokemon.name}</h3>
            <button onClick={onCatch}>Catch</button>
        </div>
    );
};

export default PokemonCard;
