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

type ComboboxProps = {
  name: string;
  label: string;
  values: string[];
  onSelected?: (value: string) => void;
};
const Combobox = ({ name, label, values, onSelected }: ComboboxProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="h-[19px]">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={form.getValues(name) === "" || !values.length}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[230px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {values.find((value) => value === field.value) ??
                    `Select ${label}`}
                  <CaretDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[230px] p-0 z-0">
              <Command>
                <CommandInput
                  placeholder={`Search ${label.toLowerCase()}...`}
                />
                <CommandEmpty>{`No ${name} found`}</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {values &&
                      values.map((value) => (
                        <CommandItem
                          value={value}
                          key={value}
                          onSelect={() => {
                            form.setValue(name, value);
                            onSelected && onSelected(value);
                          }}
                        >
                          <PopoverClose className="w-full text-left">
                            {value}
                          </PopoverClose>
                        </CommandItem>
                      ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Combobox;
