using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TooDoo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedListOfUsersToWorkspace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkspaceId",
                table: "Members");

            migrationBuilder.AddColumn<string>(
                name: "WorkspaceId",
                table: "Boards",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Boards_WorkspaceId",
                table: "Boards",
                column: "WorkspaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Boards_Workspaces_WorkspaceId",
                table: "Boards",
                column: "WorkspaceId",
                principalTable: "Workspaces",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boards_Workspaces_WorkspaceId",
                table: "Boards");

            migrationBuilder.DropIndex(
                name: "IX_Boards_WorkspaceId",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "WorkspaceId",
                table: "Boards");

            migrationBuilder.AddColumn<string>(
                name: "WorkspaceId",
                table: "Members",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
