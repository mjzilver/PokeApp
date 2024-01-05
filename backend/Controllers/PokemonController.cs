using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeApp.Data;
using PokeApp.Models;
using PokeApp.Services;

namespace PokeApp.Controllers
{
    [Route("api/pokemon")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private readonly PokemonContext _context;
        private readonly PokemonService _pokemonService;

        public PokemonController(PokemonContext context, PokemonService pokemonService)
        {
            _context = context;
            _pokemonService = pokemonService ?? throw new ArgumentNullException(nameof(pokemonService));
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pokemon>>> GetPokemons()
        {
            return await _context.Pokemons.ToListAsync();
        }

        [HttpPost("catch")]
        public IActionResult CatchPokemon([FromBody] PokemonCatchRequest request)
        {
            // Call the Pokemon service to handle catching and saving the Pokemon
            _pokemonService.CatchAndSavePokemon(request);

            return Ok();
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

            var trainerExists = await _context.Trainers.AnyAsync(t => t.Id == pokemon.TrainerId);
            if (!trainerExists)
            {
                return BadRequest("Invalid TrainerId");
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
    }
}