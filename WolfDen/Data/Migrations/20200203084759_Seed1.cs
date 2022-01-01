using Microsoft.EntityFrameworkCore.Migrations;

namespace WolfDen.Data.Migrations
{
    public partial class Seed1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "ID", "Height", "Name", "NumberOfPlayers", "Thumbnail", "Width" },
                values: new object[] { 1, 0, "Map 1", 0, null, 0 });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "ID", "Height", "Name", "NumberOfPlayers", "Thumbnail", "Width" },
                values: new object[] { 2, 0, "Map 2", 0, null, 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Maps",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Maps",
                keyColumn: "ID",
                keyValue: 2);
        }
    }
}
