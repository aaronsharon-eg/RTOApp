using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RTO.Migrations
{
    /// <inheritdoc />
    public partial class Secondmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OwnerAddress",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OwnerContactNumber",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OwnerEmail",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Vehicles",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "VehicleName",
                table: "Vehicles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerAddress",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "OwnerContactNumber",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "OwnerEmail",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "VehicleName",
                table: "Vehicles");
        }
    }
}
