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

        [HttpPost]
        public async Task<ActionResult<Trainer>> AddTrainer(Trainer trainer)
        {
            _context.Trainers.Add(trainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTrainer), new { id = trainer.Id }, trainer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrainer(int id, Trainer trainer)
        {
            if (id != trainer.Id)
            {
                return BadRequest();
            }

            _context.Entry(trainer).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainer(int id)
        {
            var trainer = await _context.Trainers.FindAsync(id);

            if (trainer == null)
            {
                return NotFound();
            }

            _context.Trainers.Remove(trainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}