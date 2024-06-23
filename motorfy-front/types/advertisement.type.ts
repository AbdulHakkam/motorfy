export type Advertisement = {
  type: string[];
  make: string;
  title: string;
  description: string;
  vehicleModel: string;
  transmission: string[];
  fuel: string[];
  price: number;
  mileage: number;
  sellerId: string;
  year: number;
  engineCapacity: number;
  images: string[];
  location?: string[];
  _id?: string;
  createdAt: string;
};

export type location = {
  name: string;
  subregion: string[];
};
