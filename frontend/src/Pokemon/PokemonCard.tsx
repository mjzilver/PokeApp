import React from 'react';

import Pokemon from './Pokemon';

interface PokemonCardProps {
    pokemon: Pokemon;
    onClick: () => void;
    clickText: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick, clickText }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '5px', margin: '5px', width: '100px', textAlign: 'center' }}>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: '50px', height: '50px' }} />
            <h3>{pokemon.name}</h3>
            <button onClick={onClick}>{clickText}</button>
        </div>
    );
};

export default PokemonCard;
