import {
  fuelTypes,
  transmissionTypes,
} from "../../util/constants/vehicle.constants";

export type vehicleParamResponse = {
  fuelType: fuelTypes[];
  transmissionType: transmissionTypes[];
  vehicleMakes: string[];
};
