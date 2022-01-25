using IntTask1.Data;
using IntTask1.Models.Db;
using System;
using System.Linq;
using Xunit;

namespace TestCampus
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            var db = new TestDbContext();
            db.Students.Add(new Student{ 
                RollNo = "A1",
                Name = "Ahmed"
            });
            db.SaveChanges();
            Assert.Equal(1, db.Students.Count());
        }
    }
}
