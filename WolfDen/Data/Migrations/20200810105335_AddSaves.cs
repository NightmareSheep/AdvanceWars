using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WolfDen.Data.Migrations
{
    public partial class AddSaves : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Save",
                columns: table => new
                {
                    SaveId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    CompressedMoves = table.Column<byte[]>(nullable: true),
                    MapId = table.Column<int>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Save", x => x.SaveId);
                    table.ForeignKey(
                        name: "FK_Save_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SavedAdvanceWarsPlayer",
                columns: table => new
                {
                    SavedAdvanceWarsPlayerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Color = table.Column<string>(nullable: true),
                    Team = table.Column<byte>(nullable: false),
                    CoName = table.Column<string>(nullable: true),
                    SaveId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedAdvanceWarsPlayer", x => x.SavedAdvanceWarsPlayerId);
                    table.ForeignKey(
                        name: "FK_SavedAdvanceWarsPlayer_Save_SaveId",
                        column: x => x.SaveId,
                        principalTable: "Save",
                        principalColumn: "SaveId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Save_ApplicationUserId",
                table: "Save",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedAdvanceWarsPlayer_SaveId",
                table: "SavedAdvanceWarsPlayer",
                column: "SaveId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedAdvanceWarsPlayer");

            migrationBuilder.DropTable(
                name: "Save");
        }
    }
}
