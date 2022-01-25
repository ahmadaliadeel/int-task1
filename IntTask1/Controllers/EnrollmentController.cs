using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;   
using IntTask1.Models.View;
using IntTask1.Data;
using System.Net;
using System.Data;
using Microsoft.EntityFrameworkCore;
using IntTask1.Models.Ops;

namespace IntTask1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EnrollmentController : Controller
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly CampusDbContext _db;

        public EnrollmentController(ILogger<WeatherForecastController> logger, CampusDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet("Student/{studentId}")]
        public IEnumerable<Enrollment> GetByStudentId(int studentId)
        {
            return _db.Enrollments.Where(e => e.StudentId == studentId).Select(s => new Enrollment
            {
                Id = s.Id,
                CourseId = s.CourseId,
                StudentId = s.StudentId,
                Marks = s.Marks,
                Course = new Course { CourseId = s.CourseId, CourseName = s.Course.CourseName, CourseNo = s.Course.CourseNo },
                Student = new Student { Id = s.StudentId, Name = s.Student.Name, RollNo = s.Student.RollNo },
            });
        }

        [HttpGet("Enrollment/{enrollmentId}")]
        public Enrollment GetByEnrollmentId(int enrollmentId)
        {
            return _db.Enrollments.Where(e => e.Id == enrollmentId).Select(s => new Enrollment
            {
                Id = s.Id,
                CourseId = s.CourseId,
                Marks = s.Marks,
                StudentId = s.StudentId,
                Course = new Course { CourseId = s.CourseId, CourseName = s.Course.CourseName, CourseNo = s.Course.CourseNo },
                Student = new Student { Id = s.StudentId, Name = s.Student.Name, RollNo = s.Student.RollNo },
            }).Single();
        }

        [HttpDelete("Enrollment/{enrollmentId}")]
        public void DropByEnrollmentId(int enrollmentId)
        {
            _db.Remove(_db.Enrollments.Find(enrollmentId));
            _db.SaveChanges();
        }

        [HttpGet("AvailableCourses/{studentId}")]
        public IEnumerable<Course> AvailableCoursesByStudentId(int studentId)
        {
            var registerdCourses = _db.Enrollments.Where(e => e.StudentId == studentId).Select(e => e.CourseId);//.ToArray();
            return _db.Courses.Where(course => !registerdCourses.Contains(course.CourseId)).Select(s => new Course
            {
                CourseId = s.CourseId,
                CourseNo = s.CourseNo,
                CourseName = s.CourseName
            });
        }

        [HttpPost("RegisterCourse")]
        public void RegisterCourse([FromBody] CourseRegisterationEdit courseRegisteration)
        {
            var existingEntry = _db.Enrollments.Where(e => e.CourseId == courseRegisteration.CourseId
                                    && e.StudentId == courseRegisteration.StudentId).SingleOrDefault();
            if (existingEntry == null)
            {
                _db.Enrollments.Add(new Models.Db.Enrollment
                {
                    StudentId = courseRegisteration.StudentId,
                    CourseId = courseRegisteration.CourseId,
                    Marks = courseRegisteration.Marks
                });
            }
            else
            {
                existingEntry.Marks = courseRegisteration.Marks;
            }
            _db.SaveChanges();
        }
    }
}
