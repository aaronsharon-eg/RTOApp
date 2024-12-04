function VehicleViewModel() {
    var self = this;

    // Observable properties for a new vehicle
    self.newVehicle = {
        id: ko.observable(),
        licensePlate: ko.observable(),
        model: ko.observable(),
        owner: ko.observable(),
        ownerAddress: ko.observable(),
        ownerContactNumber: ko.observable(),
        ownerEmail: ko.observable(),
        vehicleName: ko.observable(),
        price: ko.observable(),
        registrationDate: ko.observable()
    };

    // Observable array to hold fetched vehicles
    self.vehicles = ko.observableArray([]);

    // Observable for the search query
    self.searchQuery = ko.observable('');

    // Computed observable for filtered vehicles
    self.filteredVehicles = ko.computed(function () {
        var query = self.searchQuery().toLowerCase(); // Get search query in lowercase
        if (!query) {
            return self.vehicles(); // If no query, return all vehicles
        } else {
            // Filter vehicles by checking if any field contains the query
            return ko.utils.arrayFilter(self.vehicles(), function (vehicle) {
                // Check if any property matches the search query (case insensitive)
                return vehicle.licensePlate.toLowerCase().includes(query) ||
                    vehicle.model.toLowerCase().includes(query) ||
                    vehicle.owner.toLowerCase().includes(query) ||
                    vehicle.ownerAddress.toLowerCase().includes(query) ||
                    vehicle.ownerContactNumber.toLowerCase().includes(query) ||
                    vehicle.ownerEmail.toLowerCase().includes(query) ||
                    vehicle.vehicleName.toLowerCase().includes(query) ||
                    vehicle.price.toString().toLowerCase().includes(query);
            });
        }
    });

    // Function to open the Add Vehicle modal
    self.openAddVehicleModal = function () {
        self.clearForm();
        document.getElementById('addVehicleModal').style.display = 'block';
    };

    // Function to close the Add Vehicle modal
    self.closeAddVehicleModal = function () {
        document.getElementById('addVehicleModal').style.display = 'none';
    };

    // Function to save or update the vehicle
    self.saveVehicle = function () {
        var vehicleData = ko.toJS(self.newVehicle); // Convert observables to plain JavaScript object

        if (!vehicleData.id) {
            delete vehicleData.id; // Remove ID for new vehicle creation if empty
        }

        console.log("Vehicle Data to Save:", vehicleData); // Log the data being sent

        if (vehicleData.id) {
            // Existing vehicle update logic (PUT request)
            $.ajax({
                url: '/api/random/' + vehicleData.id,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(vehicleData),
                success: function (response) {
                    console.log("Vehicle updated successfully:", response);
                    self.clearForm();
                    self.fetchVehicles(); // Refresh the list after updating a vehicle
                    self.closeAddVehicleModal(); // Close modal after saving
                },
                error: function (xhr, status, error) {
                    console.error("Error updating vehicle:", error);
                    alert("Failed to update vehicle: " + xhr.responseText);
                }
            });
        } else {
            // New vehicle creation logic (POST request)
            $.ajax({
                url: '/api/Vehicles',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(vehicleData), // Send the new vehicle data
                success: function (response) {
                    console.log("Vehicle saved successfully:", response);
                    self.clearForm(); // Clear form after saving
                    self.fetchVehicles(); // Refresh the list after saving the new vehicle
                    self.closeAddVehicleModal(); // Close modal after saving
                },
                error: function (xhr, status, error) {
                    console.error("Error saving vehicle:", error);
                    alert("Failed to save vehicle: " + xhr.responseText);
                }
            });
        }
    };

    // Function to fetch all vehicles from the server
    self.fetchVehicles = function () {
        $.ajax({
            url: '/api/Vehicles',
            type: 'GET',
            success: function (data) {
                console.log("Fetched Vehicles:", data);
                self.vehicles(data); // Update the vehicles observable array
            },
            error: function (xhr, status, error) {
                console.error("Error fetching vehicles:", error);
                alert("Failed to fetch vehicles: " + xhr.responseText);
            }
        });
    };

    // Function to delete a vehicle
    self.deleteVehicle = function (vehicle) {
        if (confirm("Are you sure you want to delete this vehicle?")) {
            $.ajax({
                url: '/api/Vehicles',
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify(vehicle.id),
                success: function (response) {
                    console.log("Vehicle deleted successfully:", response);
                    self.fetchVehicles();
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting vehicle:", xhr);
                    alert("Failed to delete vehicle: " + xhr.responseText);
                }
            });
        }
    };

    // Function to populate form fields for editing
    self.editVehicle = function (vehicle) {
        self.newVehicle.id(vehicle.id);
        self.newVehicle.licensePlate(vehicle.licensePlate);
        self.newVehicle.model(vehicle.model);
        self.newVehicle.owner(vehicle.owner);

        // Set values for new fields when editing
        self.newVehicle.ownerAddress(vehicle.ownerAddress);
        self.newVehicle.ownerContactNumber(vehicle.ownerContactNumber);
        self.newVehicle.ownerEmail(vehicle.ownerEmail);
        self.newVehicle.vehicleName(vehicle.vehicleName);
        self.newVehicle.price(vehicle.price);

        document.getElementById('addVehicleModal').style.display = 'block'; // Open modal for editing
    };

    // Function to clear form fields after submission
    self.clearForm = function () {
        self.newVehicle.id('');
        self.newVehicle.licensePlate('');
        self.newVehicle.model('');
        self.newVehicle.owner('');

        // Clear values for new fields as well
        self.newVehicle.ownerAddress('');
        self.newVehicle.ownerContactNumber('');
        self.newVehicle.ownerEmail('');
        self.newVehicle.vehicleName('');
        self.newVehicle.price('');

        self.newVehicle.registrationDate('');
    };
}

// Apply bindings when the document is ready
$(document).ready(function () {
    var viewModel = new VehicleViewModel();
    ko.applyBindings(viewModel);
    viewModel.fetchVehicles();
});
