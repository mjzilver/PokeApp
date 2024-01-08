using Microsoft.EntityFrameworkCore;
using PokeApp.Models;

namespace PokeApp.Data
{
    public class PokemonContext(DbContextOptions<PokemonContext> options) : DbContext(options)
    {
        public DbSet<Pokemon> Pokemons { get; set; }
        public DbSet<Trainer> Trainers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pokemon>().ToTable("Pokemons");
            modelBuilder.Entity<Pokemon>().HasKey(p => p.Id); 

            modelBuilder.Entity<Trainer>().ToTable("Trainers");
            modelBuilder.Entity<Trainer>().HasKey(t => t.Id); 

            modelBuilder.Entity<Pokemon>()
                .HasOne(p => p.Trainer)
                .WithMany(t => t.Pokemons)
                .HasForeignKey(p => p.TrainerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
