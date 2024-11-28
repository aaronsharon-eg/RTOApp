/*function VehicleViewModel() {
    var self = this;

    // Observable array to hold vehicle data
    self.vehicles = ko.observableArray([]);
    self.isFetching = ko.observable(false);

    // Function to fetch vehicles from the API
    self.fetchVehicles = function () {
        self.isFetching(true);
        self.vehicles([]); // Clear previous results

        $.ajax({
            url: '/api/vehicles', // Adjust the URL if necessary
            type: 'GET',
            success: function (data) {
                if (data && data.length > 0) {
                    // Populate the observable array with fetched data
                    self.vehicles(data);
                } else {
                    self.vehicles([]); // No vehicles found
                }
            },
            error: function () {
                alert('Error fetching vehicles.');
            },
            complete: function () {
                self.isFetching(false);
            }
        });
    };
}

// Apply Knockout bindings
ko.applyBindings(new VehicleViewModel());*/