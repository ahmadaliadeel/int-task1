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
    public class StudentController : Controller
    {
     

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly CampusDbContext _db;

        public StudentController(ILogger<WeatherForecastController> logger, CampusDbContext db)
        {
            _logger = logger;
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return _db.Students.Select(s=> new Student {
                Id = s.Id,
                RollNo = s.RollNo,
                Name = s.Name
            });
        }

        [HttpGet("{id}")]
        public Student GetById(int id)
        {
            return _db.Students.Where(s=>s.Id == id).Select(s => new Student
            {
                Id = s.Id,
                RollNo = s.RollNo,
                Name = s.Name
            }).Single();
        }

        [HttpDelete("{id}")]
        public void DeleteById(int id)
        {
            _db.Remove(_db.Students.Find(id));
            _db.SaveChanges();
        }


        [HttpPost("Edit")]
        public ActionResult EditPost([FromBody]IntTask1.Models.Db.Student student)
        {
            if (student.Id == 0)
            {
                _db.Students.Add(student);
                _db.SaveChanges();
                return RedirectToAction(nameof(Index));
            } else
            if (ModelState.IsValid) {
                try {
                    _db.Update(student);
                    _db.SaveChanges();
                    return RedirectToAction(nameof(Index));
                }
                catch (DbUpdateException /* ex */ ) {
                     ModelState.AddModelError("", "Unable to save changes. " +
                            "Try again, and if the problem persists, " +
                            "see your system administrator.");
                }
            }
            return View(student);
        }
    }
}
