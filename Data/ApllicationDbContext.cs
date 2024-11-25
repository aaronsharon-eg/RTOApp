using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using RTO.Models;

namespace RTO.Data
{

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Vehicle> Vehicles { get; set; }
    }
}
