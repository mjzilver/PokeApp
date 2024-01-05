using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using PokeApp.Data;
using PokeApp.Models;

#nullable disable

namespace PokeApp.Migrations
{
    /// <inheritdoc />
    public partial class Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Trainers",
                columns: ["Name"],
                values: ["Ash"]);

            migrationBuilder.InsertData(
                table: "Trainers",
                columns: ["Name"],
                values: ["Misty"]);

            migrationBuilder.InsertData(
                table: "Trainers",
                columns: ["Name"],
                values: ["Brock"]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Trainers");
        }
    }
}
