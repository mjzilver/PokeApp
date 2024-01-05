using PokeApp.Data;
using PokeApp.Models;

namespace PokeApp.Services
{
    public class PokemonService(PokemonContext context)
    {
        private readonly PokemonContext _context = context;

        public void CatchAndSavePokemon(PokemonCatchRequest request)
        {
            // get trainer by id or throw exception
            var trainer = _context.Trainers.Find(request.TrainerId) ?? throw new Exception("Trainer not found");

            var caughtPokemon = new Pokemon
            {
                Name = request.Name,
                PokedexId = request.PokedexId,
                Trainer = trainer,
                Type = request.Type,
                CapturedDate = DateTime.Now
            };

            _context.Pokemons.Add(caughtPokemon);
            _context.SaveChanges();
        }
    }
}
