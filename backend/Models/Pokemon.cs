using System.Text.Json.Serialization;

namespace PokeApp.Models
{
    public class Pokemon
    {
        public int Id { get; set; }
        public int PokedexId { get; set; }
        public required string Name { get; set; }
        public string[]? Types { get; set; }
        public string? Image { get; set; }
        public DateTime CapturedDate { get; set; }
        public int TrainerId { get; set; }
        [JsonIgnore]
        public Trainer? Trainer { get; set; }

        public Pokemon()
        {
            CapturedDate = DateTime.Now;
        }
    }
}
