"use client";

import { Form } from "@/components/ui/form";
import Dropdown from "../form_components/dropdown";
import {
  BASE_URL,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  FILTER_PRICE_LIMITS,
  VEHICLE_TYPES,
  FILTER_YEAR_LIMITS,
  FILTER_ENGINE_LIMITS,
  FILTER_MILEAGE_LIMITS,
} from "@/lib/constants";
import { useCallback } from "react";
import useSWR, { Fetcher } from "swr";
import { BaseResponse } from "../../../types/network.type";
import { VehicleOptions } from "../../../types/vehicle.type";
import Combobox from "../form_components/combobox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AccordionSlider from "../form_components/accordionSlider";
import { SearchForm } from "@/lib/forms/search.form";
import {
  FadersHorizontal,
  Funnel,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

import { location } from "../../../types/advertisement.type";
import LocationCombobox from "../form_components/locationCombobox";
import SortDropdown from "../form_components/sortDropdown";

const FilterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const makeFetcher: Fetcher<any, string> = async (url: string) => {
    try {
      if (!url || url.endsWith("undefined")) return;
      const res = await fetch(`${BASE_URL}${url}`);
      return await res.json();
    } catch (error) {
      return error;
    }
  };

  const {
    data: vtypeData,
    error: vtypeError,
    isLoading: vtypeIsLoading,
  } = useSWR<BaseResponse<VehicleOptions>, Error>(
    `/vehicle/options/${searchParams.get("type") ?? VEHICLE_TYPES.CAR}`,
    makeFetcher
  );

  const {
    data: vmakeData,
    error: vmakeError,
    isLoading: vmakeIsLoading,
  } = useSWR<BaseResponse<string[]>, Error>(
    `/vehicle/options/${searchParams.get("type") ?? VEHICLE_TYPES.CAR}/${
      searchParams.get("make") ?? "undefined"
    }`,
    makeFetcher
  );

  const {
    data: locationsData,
    error: locationsError,
    isLoading: locationsIsLoading,
  } = useSWR<BaseResponse<location[]>, Error>(`/area`, makeFetcher);

  const form = SearchForm(searchParams);

  const handleQueryParams = useCallback(
    (paramList: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      paramList.forEach(({ name, value }) => params.set(name, value));

      return params.toString();
    },
    [searchParams]
  );
  return (
    <Accordion
      type="single"
      collapsible
      className="min-h-custom hidden search-m:block w-[270px] mr-3 mt-3"
    >
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          className="rounded-md p-4 bg-white flex flex-col items-center"
        >
          <div className="flex flex-row w-full mx-[20px] mb-2 items-center">
            <MapPin size={18} className=" text-mainRed" />
            <p className="font-bold ml-2">Location</p>
          </div>
          <LocationCombobox
            name="location"
            label="Location"
            values={locationsData?.data || []}
            width="230"
            onSelected={(values) => {
              router.push(
                pathname +
                  "?" +
                  handleQueryParams([
                    { name: "location", value: values.join("+") },
                  ])
              );
            }}
            hideLabel
          />
          <div className="flex flex-row w-full mx-[20px] mb-2 items-center mt-6">
            <Funnel size={18} className=" text-mainRed" />
            <p className="font-bold ml-2">Sort</p>
          </div>
          <SortDropdown
            router={router}
            pathname={pathname}
            handleQueryParams={handleQueryParams}
          />
          <div className="flex flex-row justify-between w-full mx-[20px] mt-8">
            <div className="flex items-center">
              <FadersHorizontal size={20} className=" text-mainRed" />
              <p className="font-bold ml-2">Filter</p>
            </div>
            <p
              className=" text-mainRed font-bold cursor-pointer"
              onClick={() => {
                form.reset();
                router.push(pathname);
              }}
            >
              Clear
            </p>
          </div>
          <AccordionItem value="vehicleType" className="w-full">
            <AccordionTrigger className="text-sm">
              <p>Vehicle Type</p>
              <p className="ml-auto mr-2 font-bold">
                {searchParams.get("type") || VEHICLE_TYPES.CAR}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <Dropdown
                name="type"
                values={Object.values(VEHICLE_TYPES)}
                placeholder="Select Vehicle Type"
                onSelected={(value) => {
                  router.push(
                    pathname +
                      "?" +
                      handleQueryParams([{ name: "type", value: value }])
                  );
                }}
                defaultSelected={searchParams.get("type") || undefined}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="brand" className="w-full">
            <AccordionTrigger className="text-sm">
              <p>Brand</p>
              <p className="ml-auto mr-2 font-bold">
                {searchParams.get("make") || ""} -{" "}
                {searchParams.get("vehicleModel") || ""}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col items-center flex-wrap justify-between">
                <div className="mt-[4px] mb-5">
                  <Combobox
                    name="make"
                    label="Vehicle Make"
                    values={vtypeData?.data.vehicleMakes || []}
                    onSelected={(value) => {
                      router.push(
                        pathname +
                          "?" +
                          handleQueryParams([{ name: "make", value: value }])
                      );
                    }}
                  />
                </div>
                <div className="mt-[4px]">
                  <Combobox
                    name="vehicleModel"
                    label="Vehicle model"
                    values={vmakeData?.data || []}
                    onSelected={(value) => {
                      router.push(
                        pathname +
                          "?" +
                          handleQueryParams([
                            { name: "vehicleModel", value: value },
                          ])
                      );
                    }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="transmission" className="w-full">
            <AccordionTrigger className="text-sm">
              <p>Transmission</p>
              <p className="ml-auto mr-2 font-bold">
                {searchParams.get("transmission") || ""}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <Dropdown
                name="Transmission"
                values={Object.values(TRANSMISSION_TYPES)}
                placeholder="Select Transmission"
                onSelected={(value) => {
                  router.push(
                    pathname +
                      "?" +
                      handleQueryParams([
                        { name: "transmission", value: value },
                      ])
                  );
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="fuelType" className="w-full">
            <AccordionTrigger className="text-sm">
              <p>Fuel</p>
              <p className="ml-auto mr-2 font-bold">
                {searchParams.get("fuel") || ""}
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <Dropdown
                name="fuel"
                values={Object.values(FUEL_TYPES)}
                placeholder="Select Vehicle Type"
                onSelected={(value) => {
                  router.push(
                    pathname +
                      "?" +
                      handleQueryParams([{ name: "fuel", value: value }])
                  );
                }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionSlider
            name="price"
            label="Price (Rs.)"
            selectedValues={[
              parseInt(
                searchParams.get("priceFrom") ??
                  FILTER_PRICE_LIMITS.MIN.toString(),
                10
              ),
              parseInt(
                searchParams.get("priceTo") ??
                  FILTER_PRICE_LIMITS.MAX.toString(),
                10
              ),
            ]}
            max={FILTER_PRICE_LIMITS.MAX}
            step={100000}
            formatSelected
            apply={(values) => {
              router.push(
                pathname +
                  "?" +
                  handleQueryParams([
                    { name: "priceFrom", value: values[0].toString() },
                    { name: "priceTo", value: values[1].toString() },
                  ])
              );
            }}
          />
          <AccordionSlider
            name="year"
            label="Year"
            selectedValues={[
              parseInt(
                searchParams.get("yearFrom") ??
                  FILTER_YEAR_LIMITS.MIN.toString(),
                10
              ),
              parseInt(
                searchParams.get("yearTo") ?? FILTER_YEAR_LIMITS.MAX.toString(),
                10
              ),
            ]}
            min={FILTER_YEAR_LIMITS.MIN}
            max={FILTER_YEAR_LIMITS.MAX}
            apply={(values) => {
              router.push(
                pathname +
                  "?" +
                  handleQueryParams([
                    { name: "yearFrom", value: values[0].toString() },
                    { name: "yearTo", value: values[1].toString() },
                  ])
              );
            }}
          />
          <AccordionSlider
            name="engineCapacity"
            label="Engine (cc)"
            selectedValues={[
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
            ]}
            min={FILTER_ENGINE_LIMITS.MIN}
            max={FILTER_ENGINE_LIMITS.MAX}
            apply={(values) => {
              router.push(
                pathname +
                  "?" +
                  handleQueryParams([
                    { name: "engineFrom", value: values[0].toString() },
                    { name: "engineTo", value: values[1].toString() },
                  ])
              );
            }}
          />
          <AccordionSlider
            name="mileage"
            label="Mileage (km)"
            selectedValues={[
              parseInt(
                searchParams.get("mileageFrom") ??
                  FILTER_MILEAGE_LIMITS.MIN.toString(),
                10
              ),
              parseInt(
                searchParams.get("mileageTo") ??
                  FILTER_MILEAGE_LIMITS.MAX.toString(),
                10
              ),
            ]}
            min={FILTER_MILEAGE_LIMITS.MIN}
            max={FILTER_MILEAGE_LIMITS.MAX}
            apply={(values) => {
              router.push(
                pathname +
                  "?" +
                  handleQueryParams([
                    { name: "mileageFrom", value: values[0].toString() },
                    { name: "mileageTo", value: values[1].toString() },
                  ])
              );
            }}
          />
        </form>
      </Form>
    </Accordion>
  );
};

export default FilterForm;
