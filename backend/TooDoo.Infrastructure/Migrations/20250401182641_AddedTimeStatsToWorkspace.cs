using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TooDoo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedTimeStatsToWorkspace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Workspaces",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Workspaces",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Workspaces",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Workspaces",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Workspaces");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Workspaces");
        }
    }
}
