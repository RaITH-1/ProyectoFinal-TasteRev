using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TasteRevAPI.Migrations
{
    /// <inheritdoc />
    public partial class AgregaUsuarioASerie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Series",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Series");
        }
    }
}
