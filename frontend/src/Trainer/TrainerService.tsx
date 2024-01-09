import Trainer from './Trainer';
import { PokemonJSON } from '../Pokemon/Pokemon';

export const fetchTrainers = async (): Promise<Trainer[]> => {
    try {
        const response = await fetch('http://localhost:5005/api/trainer', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trainers:', error);
        throw error;
    }
};

export const fetchTrainerTeam = async (trainerId: number): Promise<Trainer | null> => {
    try {
        const response = await fetch(`http://localhost:5005/api/trainer/${trainerId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        const newTrainer: Trainer = {
            id: data.id,
            name: data.name,
            pokemons: [],
        };

        // loop through the pokemons and set the capturedDate to a Date object
        data.pokemons.forEach((pokemon: PokemonJSON) => {
            newTrainer.pokemons.push({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                types: pokemon.types,
                capturedDate: new Date(pokemon.capturedDate),
            });
        });

        return newTrainer;
    } catch (error) {
        console.error('Error fetching trainer team:', error);
        throw error;
    }
};
