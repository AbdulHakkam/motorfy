"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fuelTypes = exports.transmissionTypes = exports.vehicleTypes = void 0;
var vehicleTypes;
(function (vehicleTypes) {
    vehicleTypes["CAR"] = "Car";
    vehicleTypes["BIKE"] = "Bike";
})(vehicleTypes || (exports.vehicleTypes = vehicleTypes = {}));
var transmissionTypes;
(function (transmissionTypes) {
    transmissionTypes["MANUAL"] = "Manual";
    transmissionTypes["AUTOMATIC"] = "Automatic";
})(transmissionTypes || (exports.transmissionTypes = transmissionTypes = {}));
var fuelTypes;
(function (fuelTypes) {
    fuelTypes["PETROL"] = "Petrol";
    fuelTypes["DIESEL"] = "Diesel";
    fuelTypes["ELECTRIC"] = "Electric";
})(fuelTypes || (exports.fuelTypes = fuelTypes = {}));
