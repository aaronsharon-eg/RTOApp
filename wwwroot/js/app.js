// Get the form element and submit button
const form = document.getElementById('vehicleForm');
const submitButton = document.getElementById('submitButton');

// Initial disable state of the submit button
submitButton.disabled = true;

// Adding event listeners for real-time validation
form.querySelector('[data-bind="value: newVehicle.licensePlate"]').addEventListener('input', validateLicensePlate);
form.querySelector('[data-bind="value: newVehicle.model"]').addEventListener('input', validateModel);
form.querySelector('[data-bind="value: newVehicle.owner"]').addEventListener('input', validateOwner);
form.querySelector('[data-bind="value: newVehicle.ownerAddress"]').addEventListener('input', validateOwnerAddress);
form.querySelector('[data-bind="value: newVehicle.ownerContactNumber"]').addEventListener('input', validateOwnerContactNumber);
form.querySelector('[data-bind="value: newVehicle.ownerEmail"]').addEventListener('input', validateOwnerEmail);
form.querySelector('[data-bind="value: newVehicle.vehicleName"]').addEventListener('input', validateVehicleName);
form.querySelector('[data-bind="value: newVehicle.price"]').addEventListener('input', validatePrice);

// Submit event to finalize validation before submission
form.addEventListener('submit', function (event) {
    // Prevent form submission if validation fails
    event.preventDefault();

    let isValid = true;

    // Validate all fields one last time before submitting
    isValid &= validateLicensePlate();
    isValid &= validateModel();
    isValid &= validateOwner();
    isValid &= validateOwnerAddress();
    isValid &= validateOwnerContactNumber();
    isValid &= validateOwnerEmail();
    isValid &= validateVehicleName();
    isValid &= validatePrice();

    // If form is valid, submit the form
    if (isValid) {
        form.submit(); // You can replace this with your saveVehicle function logic
    } else {
        // Optionally, you can focus on the first invalid field for better user experience
        alert("Please fix the errors before submitting.");
    }
});

// Real-time validation functions for each field

function validateLicensePlate() {
    const licensePlate = form.querySelector('[data-bind="value: newVehicle.licensePlate"]');
    const licensePlateRegex = /^[A-Za-z]{2}[0-9]{1}[A-Za-z0-9]{0,7}$/;
    if (!licensePlate.value.trim()) {
        showErrorMessage('licensePlateError', 'License plate is required');
        disableSubmitButton();
        return false;
    } else if (!licensePlateRegex.test(licensePlate.value.trim()) || licensePlate.value.length > 10) {
        showErrorMessage('licensePlateError', 'License plate must start with 2 letters, end with a number, and have a max length of 10 characters');
        disableSubmitButton();
        return false;
    }
    clearErrorMessage('licensePlateError');
    return true;
}

function validateModel() {
    const model = form.querySelector('[data-bind="value: newVehicle.model"]');
    const modelValue = model.value.trim();

    const modelRegex = /^[0-9]{4}$/; // Only 4 digits are allowed

    // Check if the model is empty
    if (!modelValue) {
        showErrorMessage('modelError', 'Model is required');
        disableSubmitButton();
        return false;
    }

    // Check if the model is a 4-digit number
    if (!modelRegex.test(modelValue)) {
        showErrorMessage('modelError', 'Model must be a 4-digit number');
        disableSubmitButton();
        return false;
    }

    // Check if the model is between 2000 and 2024
    const modelNumber = parseInt(modelValue, 10);
    if (modelNumber < 2000 || modelNumber > 2024) {
        showErrorMessage('modelError', 'Model must be between 2000 and 2024');
        disableSubmitButton();
        return false;
    }

    // If all validations pass, clear error message and enable the submit button
    clearErrorMessage('modelError');
    return true;
}


function validateOwner() {
    const owner = form.querySelector('[data-bind="value: newVehicle.owner"]');
    const ownerRegex = /^[A-Za-z ]+$/; // Only alphabets allowed
    if (!owner.value.trim()) {
        showErrorMessage('ownerError', 'Owner name is required');
        disableSubmitButton();
        return false;
    } else if (!ownerRegex.test(owner.value.trim())) {
        showErrorMessage('ownerError', 'Owner name must contain only alphabets');
        disableSubmitButton();
        return false;
    }
    clearErrorMessage('ownerError');
    return true;
}

function validateOwnerAddress() {
    const ownerAddress = form.querySelector('[data-bind="value: newVehicle.ownerAddress"]');
    if (!ownerAddress.value.trim()) {
        showErrorMessage('ownerAddressError', 'Owner address is required');
        disableSubmitButton();
        return false;
    }
    clearErrorMessage('ownerAddressError');
    return true;
}

function validateOwnerContactNumber() {
    const ownerContactNumber = form.querySelector('[data-bind="value: newVehicle.ownerContactNumber"]');
    const phoneRegex = /^[0-9]{10}$/; // Only 10 digits are allowed
    if (!ownerContactNumber.value.trim()) {
        showErrorMessage('ownerContactNumberError', 'Owner contact number is required');
        disableSubmitButton();
        return false;
    } else if (!phoneRegex.test(ownerContactNumber.value.trim())) {
        showErrorMessage('ownerContactNumberError', 'A valid phone number is required (10 digits)');
        disableSubmitButton();
        return false;
    }
    clearErrorMessage('ownerContactNumberError');
    return true;
}

function validateOwnerEmail() {
    const ownerEmail = form.querySelector('[data-bind="value: newVehicle.ownerEmail"]');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!ownerEmail.value.trim() || !emailRegex.test(ownerEmail.value.trim())) {
        showErrorMessage('ownerEmailError', 'A valid email is required');
        disableSubmitButton();
        return false;
    }
    clearErrorMessage('ownerEmailError');
    return true;
}

function validateVehicleName() {
    const vehicleName = form.querySelector('[data-bind="value: newVehicle.vehicleName"]');
    //const vehicleNameRegex = /^[A-Za-z ]+^[0-9]/; // Only alphabets allowed
    if (!vehicleName.value.trim()) {
        showErrorMessage('vehicleNameError', 'Vehicle name is required');
        disableSubmitButton();
        return false;
    }
    clearErrorMessage('vehicleNameError');
    return true;
}

function validatePrice() {
    const price = form.querySelector('[data-bind="value: newVehicle.price"]');
    if (!price.value.trim() || price.value <= 0 || !Number.isInteger(Number(price.value))) {
        showErrorMessage('priceError', 'Price must be a positive integer and not zero');
        disableSubmitButton();
        return false;
    }
    clearErrorMessage('priceError');
    return true;
}

// Function to show error message
function showErrorMessage(fieldId, message) {
    const errorDiv = document.getElementById(fieldId);
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
}

// Function to clear individual error message
function clearErrorMessage(fieldId) {
    const errorDiv = document.getElementById(fieldId);
    errorDiv.textContent = '';
}

// Function to disable submit button
function disableSubmitButton() {
    submitButton.disabled = true;
    submitButton.style.cursor = "not-allowed";
}

// Function to enable submit button if no errors
function enableSubmitButton() {
    submitButton.disabled = false;
    submitButton.style.cursor = "pointer";
}

// Real-time check and enable the submit button when all validations pass
form.addEventListener('input', function () {
    // Recheck all fields and enable the button only if all fields are valid
    let isValid = true;

    isValid &= validateLicensePlate();
    isValid &= validateModel();
    isValid &= validateOwner();
    isValid &= validateOwnerAddress();
    isValid &= validateOwnerContactNumber();
    isValid &= validateOwnerEmail();
    isValid &= validateVehicleName();
    isValid &= validatePrice();

    if (isValid) {
        enableSubmitButton();
    } else {
        disableSubmitButton();
    }
});
