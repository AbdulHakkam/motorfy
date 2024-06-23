import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VEHICLE_TYPES } from "../constants";

export const NewPostFormSchema = z.object({
  type: z.string(),
  make: z.string(),
  model: z.string(),
  fuelType: z.string(),
  transmissionType: z.string(),
  price: z.string(),
  engineCapacity: z.string(),
  mileage: z.string(),
  year: z.string(),
  images: z.array(z.instanceof(File).refine((file) => file.size < 7000000)),
  description: z.string(),
  location: z.array(z.string()),
});

export const NewPostForm = () => {
  return useForm<z.infer<typeof NewPostFormSchema>>({
    resolver: zodResolver(NewPostFormSchema),
    defaultValues: {
      type: VEHICLE_TYPES.CAR,
    },
  });
};
