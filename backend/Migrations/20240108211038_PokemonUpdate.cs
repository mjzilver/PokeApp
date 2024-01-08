using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PokeApp.Migrations
{
    /// <inheritdoc />
    public partial class PokemonUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Pokemons",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "Pokemons");
        }
    }
}
