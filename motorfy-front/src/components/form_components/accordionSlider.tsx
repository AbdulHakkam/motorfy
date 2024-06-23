"use client";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField } from "../ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
type AccordionSliderProps = {
  name: string;
  label: string;
  selectedValues: number[];
  max: number;
  formatSelected?: boolean;
  min?: number;
  step?: number;
  apply: (values: number[]) => void;
};
const AccordionSLider = ({
  name,
  label,
  selectedValues,
  apply,
  max,
  min,
  formatSelected,
  step,
}: AccordionSliderProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <AccordionItem value={name} className="w-full">
          <AccordionTrigger className="text-sm">
            <p>{label}</p>
            <p className="ml-auto mr-2 font-bold">
              {formatSelected
                ? selectedValues[0].toLocaleString("en-US")
                : selectedValues[0]}{" "}
              -{" "}
              {formatSelected
                ? selectedValues[1].toLocaleString("en-US")
                : selectedValues[1]}
            </p>
          </AccordionTrigger>
          <FormControl>
            <AccordionContent>
              <div className="flex w-full justify-between items-center">
                <Input
                  type="number"
                  className="w-[110px] text-[13px]"
                  onChange={(event) => {
                    field.value &&
                      field.value?.length > 1 &&
                      field.onChange([event.target.value, field.value[1]]);
                  }}
                  value={field.value && field.value[0]}
                  placeholder="min"
                />
                to
                <Input
                  type="number"
                  className="w-[110px] text-[13px]"
                  onChange={(event) => {
                    field.value &&
                      field.value?.length > 1 &&
                      field.onChange([field.value[0], event.target.value]);
                  }}
                  value={field.value && field.value[1]}
                  placeholder="Max"
                />
              </div>
              <Slider
                className=" h-[20px] mt-2"
                defaultValue={selectedValues}
                value={field.value}
                min={min}
                max={max}
                step={step ?? 1}
                minStepsBetweenThumbs={1}
                onValueChange={field.onChange}
              />

              <div className="w-full flex mt-2">
                <Button
                  type="button"
                  className="w-[60px] h-[30px] ml-auto"
                  onClick={() => {
                    apply(field.value);
                  }}
                >
                  Apply
                </Button>
              </div>
            </AccordionContent>
          </FormControl>
        </AccordionItem>
      )}
    />
  );
};

export default AccordionSLider;
