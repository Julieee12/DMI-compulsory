using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DMI.Migrations
{
    /// <inheritdoc />
    public partial class updatetables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Products",
                newName: "Properties");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Properties",
                table: "Products",
                newName: "Description");
        }
    }
}
