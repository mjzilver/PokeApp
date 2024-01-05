using System.Text.Json.Serialization;

namespace PokeApp.Models
{
    public class Trainer
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        [JsonIgnore]
        public ICollection<Pokemon>? Pokemons { get; set; }
    }
}