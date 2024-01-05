namespace PokeApp.Models
{
    public class PokemonCatchRequest
    {
        public int PokedexId { get; set; }
        public required string Name { get; set; }
        public required string Type { get; set; }
        public required int TrainerId { get; set; }
    }
}
