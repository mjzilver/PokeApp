using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeApp.Data;
using PokeApp.Models;

namespace PokeApp.Controllers
{
    [Route("api/pokemon")]
    [ApiController]
    public class PokemonController(PokemonContext context) : ControllerBase
    {
        private readonly PokemonContext _context = context;

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
    }
}