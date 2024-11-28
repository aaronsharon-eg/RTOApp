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

        [Route("api/[controller]")]
        [HttpPost]
        public async Task<ActionResult<Vehicle>> PostVehicle([FromBody] Vehicle vehicle)
        {
            if (vehicle == null)
            {
                return BadRequest("Vehicle cannot be null.");
            }

            if (string.IsNullOrEmpty(vehicle.LicensePlate) || string.IsNullOrEmpty(vehicle.Model) ||
                string.IsNullOrEmpty(vehicle.Owner))
            {
                return BadRequest("All fields must be filled.");
            }

            if (vehicle.RegistrationDate == default(DateTime))
            {
                vehicle.RegistrationDate = DateTime.Now;
            }

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return Ok("Request Submitted");
        }

        // GET: api/vehicles
        [HttpGet]
        [Route("api/[controller]")]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
            var vehicles = await _context.Vehicles.ToListAsync();
            if (vehicles == null || vehicles.Count == 0)
            {
                return NotFound();
            }
            return Ok(vehicles);
        }

        [HttpDelete]
        [Route("api/[controller]")]
        public async Task<IActionResult> DeleteVehicle([FromBody] int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound(); // Return 404 if the vehicle is not found
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on successful deletion
        }


        //API for PUT
        [HttpPut]
        [Route("api/[controller]")]
        public async Task<IActionResult> PutVehicle(int id, Vehicle vehicle)
        {
            if(vehicle == null)
            {
                return BadRequest("Not Found");
            }
            if(id != vehicle.Id)
            {
                return BadRequest("The particular ID is not Found");
            }

            var AccessVehicle = await _context.Vehicles.FindAsync(id);
            if (AccessVehicle == null)
            {
                _context.Vehicles.Add(vehicle);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetVehicles), new { id = vehicle.Id }, vehicle);
            }

            AccessVehicle.LicensePlate = vehicle.LicensePlate;
            AccessVehicle.Model = vehicle.Model;
            AccessVehicle.Owner = vehicle.Owner;  
            //AccessVehicle.RegistrationDate = vehicle.RegistrationDate;
            await _context.SaveChangesAsync();
            return Ok(AccessVehicle);  
           
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

