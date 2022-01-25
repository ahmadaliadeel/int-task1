using Microsoft.EntityFrameworkCore.Migrations;

namespace IntTask1.Migrations
{
    public partial class BMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Marks",
                table: "Enrollments",
                type: "REAL",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "CourseNo",
                table: "Courses",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Marks",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "CourseNo",
                table: "Courses");
        }
    }
}
