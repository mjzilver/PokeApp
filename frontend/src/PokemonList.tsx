import React, { useState, useCallback, useEffect } from 'react';

import PokemonCard from './PokemonCard';
import Pokemon from './Pokemon';
import TrainerSelector from './TrainerSelector';

interface PokemonListProps {
    onCatch: (pokemon: Pokemon, trainerId: number) => void;
}

const PokemonList: React.FC<PokemonListProps> = ({ onCatch, }) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    const fetchKantoPokemon = useCallback(async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const allPokemon = await response.json();

            // randomize the list of pokemon
            const shuffledPokemon = allPokemon.results.sort(() => Math.random() - 0.5);

            // select the first 12 pokemon from the randomized list
            const selectedPokemon = shuffledPokemon.slice(0, 12);

            // load in the data for each pokemon
            const fetchedPokemonList: Pokemon[] = [];
            for (const pokemon of selectedPokemon) {
                const data = await fetchPokemonData(pokemon);
                const newPokemon: Pokemon = {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.front_default,
                };
                fetchedPokemonList.push(newPokemon);
            }

            // set the list of pokemon in state
            setPokemonList(fetchedPokemonList);
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
        }
    }, []);

    const fetchPokemonData = async (pokemon: any) => {
        try {
            const response = await fetch(pokemon.url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
    };

    const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);

    const handleRefresh = () => {
        setPokemonList([]); 
        fetchKantoPokemon(); 
    };

    useEffect(() => {
        fetchKantoPokemon();
    }, [fetchKantoPokemon]);

    return (
        <div>
            <h2>Pokémon List</h2>
            <button onClick={handleRefresh}>Refresh</button>

            <TrainerSelector onSelect={(trainerId) => setSelectedTrainer(trainerId)} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
                {pokemonList.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} onCatch={() => onCatch(pokemon, selectedTrainer || 0)} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
