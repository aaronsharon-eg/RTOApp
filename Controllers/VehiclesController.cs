using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RTO.Data;
using RTO.Models;

namespace RTO.Controllers
{

    public class VehiclesController : Controller
    {

        private readonly ApplicationDbContext _context;
        public VehiclesController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        //API for POST
        [Route("api/[controller]")]
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
        {
            if (vehicle == null)
            {
                return BadRequest();
            }
            if (vehicle.RegistrationDate == default(DateTime))
            {
                vehicle.RegistrationDate = DateTime.Now;
            }
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();
            return Ok();
        }

        //API for GET
        /*[HttpGet]
        [Route("api/[controller]")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicle()
        {
            var vehicles = _context.Vehicles.ToListAsync();
            if (vehicles == null)
            {
                return BadRequest();
            }
            await _context.SaveChangesAsync();
            return Ok(vehicles);
        }*/

        //API for Delete
        [HttpDelete]
        [Route("api/[controller]")]
        public async Task<ActionResult<Vehicle>> DeleteVehicle(Vehicle vehicle)
        {
            if(vehicle == null)
            {
                return BadRequest();
            }
            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
            return Ok(vehicle);
        }

    }
}

    /* [Route("api/[controller]")]
     [ApiController]
     public class VehiclesController : ControllerBase
     {
         private readonly ApplicationDbContext _context;

         public VehiclesController(ApplicationDbContext context)
         {
             _context = context;
         }

         [HttpGet]
         public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
         {
             return await _context.Vehicles.ToListAsync();
         }

         [HttpGet("{id}")]
         public async Task<ActionResult<Vehicle>> GetVehicle(int id)
         {
             var vehicle = await _context.Vehicles.FindAsync(id);
             if (vehicle == null)
                 return NotFound();
             return vehicle;
         }

         [HttpPost]
         public async Task<ActionResult<Vehicle>> PostVehicle(Vehicle vehicle)
         {
             _context.Vehicles.Add(vehicle);
             await _context.SaveChangesAsync();
             return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicle);
         }

         [HttpPut("{id}")]
         public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
         {
             if (id != vehicle.Id)
                 return BadRequest();

             _context.Entry(vehicle).State = EntityState.Modified;
             await _context.SaveChangesAsync();

             return NoContent();
         }

         [HttpDelete("{id}")]
         public async Task<IActionResult> DeleteVehicle(int id)
         {
             var vehicle = await _context.Vehicles.FindAsync(id);
             if (vehicle == null)
                 return NotFound();

             _context.Vehicles.Remove(vehicle);
             await _context.SaveChangesAsync();

             return NoContent();
         }
     }*/

