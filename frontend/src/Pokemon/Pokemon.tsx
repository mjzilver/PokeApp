export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types?: string[];
    capturedDate?: Date;
}

export interface PokemonJSON {
    id: number;
    name: string;
    image: string;
    types?: string[];
    capturedDate: string;
}