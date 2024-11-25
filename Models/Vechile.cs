using Microsoft.AspNetCore.Mvc;

namespace RTO.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string LicensePlate { get; set; }
        public string Model { get; set; }
        public string Owner { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
