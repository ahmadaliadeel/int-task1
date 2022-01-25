namespace IntTask1.Models.View
{
    public class Enrollment
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public float Marks { get; set; }
        virtual public Student Student { get;set;}
        virtual public Course Course { get; set; }
    }
}
