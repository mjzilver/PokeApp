
import { Pokemon } from "../Pokemon/Pokemon";

export const battlePokemon = async (pokemon1: Pokemon, pokemon2: Pokemon): Promise<string> => {
    try {
        const response = await fetch(`http://localhost:5005/api/pokemon/battle/${pokemon1.id}/${pokemon2.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        return await response.text();
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        return "Error battling Pokemon";
    }
}
