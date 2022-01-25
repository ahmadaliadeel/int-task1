using System.ComponentModel.DataAnnotations;

namespace IntTask1.Models.Ops
{
    public class CourseRegisterationEdit
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public float Marks { get; set; }
    }

    public class UnregisterCourse
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }
    }
}
