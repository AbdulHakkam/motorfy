const BASE_URL = "http://localhost:3000";

enum VEHICLE_TYPES {
  CAR = "Car",
  BIKE = "Bike",
}

enum TRANSMISSION_TYPES {
  MANUAL = "Manual",
  AUTOMATIC = "Automatic",
}

enum FUEL_TYPES {
  PETROL = "Petrol",
  DIESEL = "Diesel",
  ELECTRIC = "Electric",
}

enum FILTER_PRICE_LIMITS {
  MIN = 0,
  MAX = 20000000,
}

enum FILTER_YEAR_LIMITS {
  MIN = 1900,
  MAX = new Date().getFullYear(),
}
enum FILTER_ENGINE_LIMITS {
  MIN = 0,
  MAX = 5000,
}
enum FILTER_MILEAGE_LIMITS {
  MIN = 0,
  MAX = 200000,
}

export {
  BASE_URL,
  VEHICLE_TYPES,
  TRANSMISSION_TYPES,
  FUEL_TYPES,
  FILTER_PRICE_LIMITS,
  FILTER_YEAR_LIMITS,
  FILTER_ENGINE_LIMITS,
  FILTER_MILEAGE_LIMITS,
};
