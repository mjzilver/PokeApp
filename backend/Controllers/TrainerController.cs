using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeApp.Data;
using PokeApp.Models;
using PokeApp.Services;

namespace PokeApp.Controllers
{
    [Route("api/trainer")]
    [ApiController]
    public class TrainerController : ControllerBase
    {
        private readonly PokemonContext _context;

        public TrainerController(PokemonContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trainer>>> GetTrainers()
        {
            return await _context.Trainers.Include(t => t.Pokemons).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Trainer>> GetTrainer(int id)
        {
            var trainer = await _context.Trainers
                .Include(t => t.Pokemons)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (trainer == null)
            {
                return NotFound();
            }

            return trainer;
        }
    }
}