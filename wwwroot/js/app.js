function Vehicle(id, licensePlate, model, owner) {
    this.id = id;
    this.licensePlate = ko.observable(licensePlate);
    this.model = ko.observable(model);
    this.owner = ko.observable(owner);
}

function AppViewModel() {
    var self = this;

    self.vehicles = ko.observableArray([]);

    // Observables for new vehicle inputs
    self.newLicensePlate = ko.observable('');
    self.newModel = ko.observable('');
    self.newOwner = ko.observable('');

    self.loadVehicles = function () {
        $.getJSON('/api/vehicles', function (data) {
            self.vehicles(data.map(function (item) {
                return new Vehicle(item.id, item.licensePlate, item.model, item.owner);
            }));
        });
    };

    self.addVehicle = function () {
        var newVehicle = {
            licensePlate: self.newLicensePlate(),
            model: self.newModel(),
            owner: self.newOwner()
        };
        $.post('/api/vehicles', newVehicle, function (data) {
            self.vehicles.push(new Vehicle(data.id, data.licensePlate, data.model, data.owner));
            self.newLicensePlate('');
            self.newModel('');
            self.newOwner('');
        });
    };

    self.deleteVehicle = function (vehicle) {
        $.ajax({
            url: '/api/vehicles/' + vehicle.id,
            type: 'DELETE',
            success: function () {
                self.vehicles.remove(vehicle);
            }
        });
    };

    // Load vehicles on startup
    self.loadVehicles();
}

ko.applyBindings(new AppViewModel());