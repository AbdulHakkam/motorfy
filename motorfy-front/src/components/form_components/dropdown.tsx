import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

type DropdownProps = {
  name: string;
  values: string[];
  width?: string;
  label?: string;
  placeholder?: string;
  defaultSelected?: string;
  onSelected?: (value: string) => void;
};

const Dropdown = ({
  name,
  label,
  values,
  width,
  defaultSelected,
  placeholder,
  onSelected,
}: DropdownProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onSelected && onSelected(value);
            }}
            defaultValue={defaultSelected ?? field.value}
          >
            <FormControl className={`w-[${width ?? "230"}px]`}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Dropdown;
