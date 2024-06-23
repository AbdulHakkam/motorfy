"use client";
import { Control, UseFormReturn, useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { location } from "../../../types/advertisement.type";

type ComboboxProps = {
  name: string;
  label: string;
  values: location[];
  hideLabel?: boolean;
  width?: string;
  onSelected?: (value: string[]) => void;
};
const LocationCombobox = ({
  name,
  label,
  values,
  hideLabel,
  width,
  onSelected,
}: ComboboxProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {!hideLabel && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={form.getValues(name) === "" || !values.length}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[230px]",
                    !field.value && "text-muted-foreground",
                    "justify-between"
                  )}
                >
                  {field.value && field.value.length > 1
                    ? field.value[1]
                    : "Select location"}
                  <CaretDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[230px]">
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                  onValueChange={() => {
                    console.log(123);
                  }}
                />
                <CommandEmpty>{`No ${name} found`}</CommandEmpty>
                {values &&
                  values.map((area) => {
                    return (
                      <CommandGroup key={area.name} heading={area.name}>
                        <CommandList>
                          {area.subregion.map((subregion) => {
                            return (
                              <CommandItem
                                value={subregion}
                                key={subregion}
                                onSelect={() => {
                                  form.setValue(name, [area.name, subregion]);
                                  onSelected &&
                                    onSelected([area.name, subregion]);
                                }}
                              >
                                <PopoverClose className="w-full text-left text-black">
                                  {subregion}
                                </PopoverClose>
                              </CommandItem>
                            );
                          })}
                        </CommandList>
                      </CommandGroup>
                    );
                  })}
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationCombobox;
