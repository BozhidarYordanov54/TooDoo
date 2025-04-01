using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TooDoo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedWorkspaceAndMembers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoardTask_Boards_BoardId",
                table: "BoardTask");

            migrationBuilder.DropForeignKey(
                name: "FK_BoardTask_Tasks_TaskId",
                table: "BoardTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BoardTask",
                table: "BoardTask");

            migrationBuilder.RenameTable(
                name: "BoardTask",
                newName: "BoardTasks");

            migrationBuilder.RenameIndex(
                name: "IX_BoardTask_BoardId",
                table: "BoardTasks",
                newName: "IX_BoardTasks_BoardId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BoardTasks",
                table: "BoardTasks",
                columns: new[] { "TaskId", "BoardId" });

            migrationBuilder.CreateTable(
                name: "Members",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    WorkspaceId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Members", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Members_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Workspaces",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OwnerId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workspaces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workspaces_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkspaceMembers",
                columns: table => new
                {
                    MemberId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WorkspaceId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkspaceMembers", x => new { x.MemberId, x.WorkspaceId });
                    table.ForeignKey(
                        name: "FK_WorkspaceMembers_Members_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Members",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkspaceMembers_Workspaces_WorkspaceId",
                        column: x => x.WorkspaceId,
                        principalTable: "Workspaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Members_UserId",
                table: "Members",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkspaceMembers_WorkspaceId",
                table: "WorkspaceMembers",
                column: "WorkspaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Workspaces_OwnerId",
                table: "Workspaces",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_BoardTasks_Boards_BoardId",
                table: "BoardTasks",
                column: "BoardId",
                principalTable: "Boards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BoardTasks_Tasks_TaskId",
                table: "BoardTasks",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoardTasks_Boards_BoardId",
                table: "BoardTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_BoardTasks_Tasks_TaskId",
                table: "BoardTasks");

            migrationBuilder.DropTable(
                name: "WorkspaceMembers");

            migrationBuilder.DropTable(
                name: "Members");

            migrationBuilder.DropTable(
                name: "Workspaces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BoardTasks",
                table: "BoardTasks");

            migrationBuilder.RenameTable(
                name: "BoardTasks",
                newName: "BoardTask");

            migrationBuilder.RenameIndex(
                name: "IX_BoardTasks_BoardId",
                table: "BoardTask",
                newName: "IX_BoardTask_BoardId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BoardTask",
                table: "BoardTask",
                columns: new[] { "TaskId", "BoardId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BoardTask_Boards_BoardId",
                table: "BoardTask",
                column: "BoardId",
                principalTable: "Boards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BoardTask_Tasks_TaskId",
                table: "BoardTask",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
