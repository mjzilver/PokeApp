import React, { useState, useCallback, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Pokemon } from './Pokemon';
import { fetchKantoPokemon } from './PokemonService';

interface PokemonListProps {
    onCatch: (pokemon: Pokemon) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ onCatch }) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    const handleRefresh = async () => {
        try {
            setPokemonList([]);
            const fetchedPokemonList = await fetchKantoPokemon();
            setPokemonList(fetchedPokemonList);
        } catch (error) {
            console.error('Error refreshing Pokemon list:', error);
        }
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    return (
        <div>
            <h2>Pokémon List</h2>
            <button onClick={handleRefresh}>Refresh</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '2px' }}>
                {pokemonList.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} clickText='Catch' onClick={() => onCatch(pokemon)} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
