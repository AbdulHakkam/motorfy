"use client";
import { BASE_URL, VEHICLE_TYPES } from "@/lib/constants";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { BaseResponse } from "../../../../../types/network.type";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Combobox from "@/components/form_components/combobox";
import Dropdown from "@/components/form_components/dropdown";
import { Input } from "@/components/ui/input";
import LogoutButton from "@/components/buttons/Logout.button";
import { Images, Trash } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { VehicleOptions } from "../../../../../types/vehicle.type";
import { NewPostForm, NewPostFormSchema } from "@/lib/forms/newpost.form";
import LocationCombobox from "@/components/form_components/locationCombobox";
import { location } from "../../../../../types/advertisement.type";

//TODO - add remove image
//TODO - styling

const Page = () => {
  const [selectedType, setSelectedType] = useState<VEHICLE_TYPES>(
    VEHICLE_TYPES.CAR
  );

  const [selectedMake, setSelectedMake] = useState<string | undefined>(
    undefined
  );

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

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
    `/vehicle/options/${selectedType}`,
    makeFetcher
  );
  const {
    data: locationsData,
    error: locationsError,
    isLoading: locationsIsLoading,
  } = useSWR<BaseResponse<location[]>, Error>(`/area`, makeFetcher);

  const {
    data: vmakeData,
    error: vmakeError,
    isLoading: vmakeIsLoading,
  } = useSWR<BaseResponse<string[]>, Error>(
    `/vehicle/options/${selectedType}/${selectedMake}`,
    makeFetcher
  );

  const form = NewPostForm();
  const location = form.watch("location");
  useEffect(() => {
    console.log(location);
  }, [location]);

  async function onSubmit(values: z.infer<typeof NewPostFormSchema>) {
    try {
      const formdata = new FormData();
      formdata.append("type", values.type);
      formdata.append("make", values.make);
      formdata.append("vehicleModel", values.model);
      formdata.append("fuel", values.fuelType);
      formdata.append("transmission", values.transmissionType);
      formdata.append("price", values.price);
      formdata.append("engineCapacity", values.engineCapacity);
      formdata.append("year", values.year);
      formdata.append("mileage", values.mileage);
      formdata.append("description", values.description);
      formdata.append("location", location[0] ?? undefined);
      formdata.append("location", location[1] ?? undefined);

      for (let i = 0; i < selectedImages.length; i++) {
        formdata.append("images", selectedImages[i]);
      }

      await fetch(`${BASE_URL}/advertisement/publish`, {
        method: "POST",
        body: formdata,
        headers: {
          Accept: "multipart/form-data",
        },
        credentials: "include",
        redirect: "follow",
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-custom bg-white mt-[50px] w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          className="mt-3 ml-5 p-2"
        >
          {/* Vehicle type selection */}
          <div className="flex flex-row items-center flex-wrap max-w-[500px] justify-between mt-3">
            <div className="mt-[4px] mb-5">
              <LocationCombobox
                name="location"
                label="Location"
                values={locationsData?.data || []}
              />
            </div>
            <div className="mt-[4px] mb-5">
              <Dropdown
                name="type"
                label="Vehicle Type"
                values={Object.values(VEHICLE_TYPES)}
                onSelected={(value) => {
                  setSelectedType(value as VEHICLE_TYPES);
                  setSelectedMake(undefined);
                }}
              />
            </div>
          </div>
          <p className=" font-bold mt-5">Manufacture details</p>
          <div className="flex flex-row items-center flex-wrap max-w-[500px] justify-between mt-3">
            <div className="mt-[4px] mb-5">
              <Combobox
                name="make"
                label="Vehicle Make"
                values={vtypeData?.data.vehicleMakes || []}
                onSelected={setSelectedMake}
              />
            </div>
            <div className="mt-[4px] mb-5">
              <Combobox
                name="model"
                label="Vehicle model"
                values={vmakeData?.data || []}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="max-w-[500px]">
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    type="number"
                    max={2025}
                    min={1850}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className=" font-bold mt-5">Engine details</p>
          <div className="flex flex-row items-center flex-wrap max-w-[500px] justify-between mt-3">
            <Dropdown
              name="fuelType"
              label="Fuel type"
              values={vtypeData?.data.fuelType || []}
            />
            <Dropdown
              name="transmissionType"
              label="Transmission type"
              values={vtypeData?.data.transmissionType || []}
            />
            <FormField
              control={form.control}
              name="engineCapacity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Capacity (CC)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem className="w-full mt-5">
                  <FormLabel>Mileage (KM)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className=" font-bold mt-5">Other details</p>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="max-w-[500px]">
                <FormLabel>Price (Rs.)</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="max-w-[500px] mt-5 flex flex-col">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="h-[90px] max-w-[500px] resize-none rounded-lg border-2 border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className=" font-bold mt-5">Images</p>
          <FormField
            control={form.control}
            name="images"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="max-w-[500px] mt-5">
                <div className="max-w-[500px] flex flex-row">
                  {selectedImages.map((file: File) => (
                    <div
                      key={file.name}
                      className="flex mr-4 items-center justify-center"
                    >
                      <Trash className="absolute z-0" size={20} color="red" />
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-[80px] h-[80px] object-cover rounded-md hover:opacity-0 z-10"
                        width={80}
                        height={80}
                      />
                    </div>
                  ))}
                  <FormLabel>
                    <div className="flex items-center flex-col justify-center border-2 w-[80px] h-[80px] cursor-pointer rounded-md">
                      <Images size={25} />
                      <p className="text-[12px] mt-2"> Add images</p>
                    </div>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        className="hidden"
                        placeholder="image"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(event) => {
                          setSelectedImages((prev) => [
                            ...prev,
                            ...Array.from(event.target.files ?? []),
                          ]);
                          onChange(
                            event.target.files
                              ? Array.from(event.target.files)
                              : []
                          );
                        }}
                      />
                    </FormControl>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Page;
