using Microsoft.EntityFrameworkCore.Migrations;

namespace WolfDen.Data.Migrations
{
    public partial class ExpandSaves : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "SavedAdvanceWarsPlayer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "SavedAdvanceWarsPlayer",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SavedAdvanceWarsPlayer");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "SavedAdvanceWarsPlayer");
        }
    }
}
