using Microsoft.EntityFrameworkCore.Migrations;

namespace WolfDen.Data.Migrations
{
    public partial class AddSeedToSave : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Seed",
                table: "Save",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Seed",
                table: "Save");
        }
    }
}
