using System.ComponentModel.DataAnnotations;

namespace IntTask1.Models.View
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        public string RollNo { get; set; }
        public string Name { get; set; }
    }
}
