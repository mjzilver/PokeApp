import Pokemon from '../Pokemon/Pokemon';

interface Trainer {
    id: number;
    name: string;
    pokemons: Pokemon[];
}

export default Trainer;