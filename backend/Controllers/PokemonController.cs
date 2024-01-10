using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeApp.Data;
using PokeApp.Models;
using PokeApp.Services;

namespace PokeApp.Controllers
{
    [Route("api/pokemon")]
    [ApiController]
    public class PokemonController(PokemonContext context, PokemonBattleService pokemonBattleService) : ControllerBase
    {
        private readonly PokemonContext _context = context;
        private readonly PokemonBattleService _pokemonBattleService = pokemonBattleService;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pokemon>>> GetPokemons()
        {
            return await _context.Pokemons.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Pokemon>> GetPokemon(int id)
        {
            var pokemon = await _context.Pokemons.FindAsync(id);

            if (pokemon == null)
            {
                return NotFound();
            }

            return pokemon;
        }

        [HttpPost]
        public async Task<ActionResult<Pokemon>> AddPokemon(Pokemon pokemon)
        {
            if (pokemon.TrainerId == 0)
            {
                return BadRequest();
            }

            var trainer = await _context.Trainers
                .Include(t => t.Pokemons)
                .FirstOrDefaultAsync(t => t.Id == pokemon.TrainerId);

            if (trainer == null)
            {
                return BadRequest("Invalid TrainerId");
            }

            if (trainer.Pokemons?.Count >= 6)
            {
                return BadRequest("Trainer already has 6 Pokemon");
            }

            _context.Pokemons.Add(pokemon);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPokemon), new { id = pokemon.Id }, pokemon);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePokemon(int id, Pokemon pokemon)
        {
            if (id != pokemon.Id)
            {
                return BadRequest();
            }

            _context.Entry(pokemon).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePokemon(int id)
        {
            var pokemon = await _context.Pokemons.FindAsync(id);

            if (pokemon == null)
            {
                return NotFound();
            }

            _context.Pokemons.Remove(pokemon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("battle/{id1}/{id2}")]
        public async Task<ActionResult<string>> BattlePokemon(int id1, int id2)
        {
            var pokemon1 = await _context.Pokemons.FindAsync(id1);
            var pokemon2 = await _context.Pokemons.FindAsync(id2);

            if (pokemon1 == null || pokemon2 == null)
            {
                return NotFound("One or both Pokemon not found.");
            }

            if (pokemon1.Types == null || pokemon2.Types == null || pokemon1.Types.Length == 0 || pokemon2.Types.Length == 0)
            {
                return BadRequest("Both Pokemon must have types.");
            }

            if (pokemon1 == pokemon2)
            {
                return BadRequest("Pokemon cannot battle themselves.");
            }

            var battleOutcome = await _pokemonBattleService.Battle(pokemon1, pokemon2);

            return battleOutcome switch
            {
                BattleOutcome.Tie => (ActionResult<string>)Ok($"{pokemon1.Name} and {pokemon2.Name} tie!"),
                BattleOutcome.Pokemon1Wins => (ActionResult<string>)Ok($"{pokemon1.Name} defeats {pokemon2.Name}!"),
                BattleOutcome.Pokemon2Wins => (ActionResult<string>)Ok($"{pokemon2.Name} defeats {pokemon1.Name}!"),
                _ => (ActionResult<string>)StatusCode(500, "Internal server error during battle."),
            };
        }
    }
}