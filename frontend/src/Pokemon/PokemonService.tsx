import { Pokemon } from './Pokemon';

export const fetchKantoPokemon = async (): Promise<Pokemon[]> => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const allPokemon = await response.json();

        const shuffledPokemon = allPokemon.results.sort(() => Math.random() - 0.5);
        const selectedPokemon = shuffledPokemon.slice(0, 12);

        const fetchedPokemonList: Pokemon[] = [];
        for (const pokemon of selectedPokemon) {
            const data = await fetchPokemonData(pokemon);
            const newPokemon: Pokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                types: data.types.map((type: any) => type.type.name),
            };
            fetchedPokemonList.push(newPokemon);
        }

        return fetchedPokemonList;
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        throw error;
    }
};

const fetchPokemonData = async (pokemon: any) => {
    try {
        const response = await fetch(pokemon.url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw error;
    }
};

export const releasePokemon = async (pokemonId: number): Promise<void> => {
    try {
        await fetch(`http://localhost:5005/api/pokemon/${pokemonId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error releasing Pokemon:', error);
        throw error;
    }
};