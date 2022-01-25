using System.ComponentModel.DataAnnotations;

namespace IntTask1.Models.View
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public string CourseNo { get; set; }
    }
}
