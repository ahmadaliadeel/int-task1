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

namespace IntTask1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CourseController : Controller
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly CampusDbContext _db;

        public CourseController(ILogger<WeatherForecastController> logger, CampusDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Course> Get()
        {
            return _db.Courses.Select(s=> new Course {
                CourseId = s.CourseId,
                CourseNo = s.CourseNo,
                CourseName = s.CourseName
            });
        }

        [HttpGet("{id}")]
        public Course GetById(int id)
        {
            return _db.Courses.Where(s=>s.CourseId == id).Select(s => new Course
            {
                CourseId = s.CourseId,
                CourseNo = s.CourseNo,
                CourseName = s.CourseName
            }).Single();
        }

        [HttpDelete("{id}")]
        public void DeleteById(int id)
        {
            _db.Remove(_db.Courses.Find(id));
            _db.SaveChanges();
        }


        [HttpPost("Edit")]
        public ActionResult EditPost([FromBody]IntTask1.Models.Db.Course Course)
        {
            if (Course.CourseId == 0)
            {
                _db.Courses.Add(Course);
                _db.SaveChanges();
                return RedirectToAction(nameof(Index));
            } else
            if (ModelState.IsValid) {
                try {
                    _db.Update(Course);
                    _db.SaveChanges();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateException /* ex */ ) {
                     ModelState.AddModelError("", "Unable to save changes. " +
                            "Try again, and if the problem persists, " +
                            "see your system administrator.");
                }
            }
            return View(Course);
        }
    }
}
