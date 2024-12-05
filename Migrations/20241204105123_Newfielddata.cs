using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RTO.Migrations
{
    /// <inheritdoc />
    public partial class Newfielddata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "ManufactureDate",
                table: "Vehicles",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ManufactureDate",
                table: "Vehicles");
        }
    }
}
