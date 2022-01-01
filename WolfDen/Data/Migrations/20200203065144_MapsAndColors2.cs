using Microsoft.EntityFrameworkCore.Migrations;

namespace WolfDen.Data.Migrations
{
    public partial class MapsAndColors2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    NumberOfPlayers = table.Column<int>(nullable: false),
                    Thumbnail = table.Column<string>(nullable: true),
                    Width = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PlayerColor",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Colors = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerColor", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Tile",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    X = table.Column<int>(nullable: false),
                    Y = table.Column<int>(nullable: false),
                    tileType = table.Column<int>(nullable: false),
                    Owner = table.Column<short>(nullable: false),
                    MapID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tile", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Tile_Maps_MapID",
                        column: x => x.MapID,
                        principalTable: "Maps",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tile_MapID",
                table: "Tile",
                column: "MapID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayerColor");

            migrationBuilder.DropTable(
                name: "Tile");

            migrationBuilder.DropTable(
                name: "Maps");
        }
    }
}
