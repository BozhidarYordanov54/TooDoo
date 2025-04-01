using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TooDoo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedImageURLFromWorkspace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Workspaces");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Workspaces",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
