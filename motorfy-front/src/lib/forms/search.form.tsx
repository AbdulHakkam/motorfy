import { zodResolver } from "@hookform/resolvers/zod";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FILTER_PRICE_LIMITS,
  FILTER_YEAR_LIMITS,
  FILTER_ENGINE_LIMITS,
  FILTER_MILEAGE_LIMITS,
} from "../constants";

const formSchema = z.object({
  type: z.string().optional(),
  make: z.string().optional(),
  vehicleModel: z.string().optional(),
  transmission: z.string().optional(),
  fuel: z.string().optional(),
  price: z.array(z.number()).optional(),
  year: z.array(z.number()).optional(),
  engineCapacity: z.array(z.number()).optional(),
  mileage: z.array(z.number()).optional(),
  location: z.array(z.string()).optional(),
  sort: z.string().optional(),
});

export const SearchForm = (searchParams: ReadonlyURLSearchParams) => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: searchParams.get("type") || undefined,
      make: searchParams.get("make") || undefined,
      vehicleModel: searchParams.get("vehicleModel") || undefined,
      price: [
        parseInt(
          searchParams.get("priceFrom") ?? FILTER_PRICE_LIMITS.MIN.toString(),
          10
        ),
        parseInt(
          searchParams.get("priceTo") ?? FILTER_PRICE_LIMITS.MAX.toString(),
          10
        ),
      ],
      year: [
        parseInt(
          searchParams.get("yearFrom") ?? FILTER_YEAR_LIMITS.MIN.toString(),
          10
        ),
        parseInt(
          searchParams.get("yearTo") ?? FILTER_YEAR_LIMITS.MAX.toString(),
          10
        ),
      ],
      engineCapacity: [
        parseInt(
          searchParams.get("engineCapacityFrom") ??
            FILTER_ENGINE_LIMITS.MIN.toString(),
          10
        ),
        parseInt(
          searchParams.get("engineCapacityTo") ??
            FILTER_ENGINE_LIMITS.MAX.toString(),
          10
        ),
      ],
      mileage: [
        parseInt(
          searchParams.get("mileageFrom") ??
            FILTER_MILEAGE_LIMITS.MIN.toString(),
          10
        ),
        parseInt(
          searchParams.get("mileageTo") ?? FILTER_MILEAGE_LIMITS.MAX.toString(),
          10
        ),
      ],
    },
  });
};
