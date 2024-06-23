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
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useFormContext } from "react-hook-form";

export const SortOptions = [
  {
    label: "Newest",
    value: "createdAt",
    order: -1,
  },
  {
    label: "Oldest",
    value: "createdAt",
    order: 1,
  },
];

type SortDropdownProps = {
  router: AppRouterInstance;
  pathname: string;
  handleQueryParams: (
    paramList: {
      name: string;
      value: string;
    }[]
  ) => string;
};

const SortDropdown = ({
  router,
  pathname,
  handleQueryParams,
}: SortDropdownProps) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={"sort"}
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              const option = SortOptions.find(
                (option) => option.label === value
              );
              if (option) {
                const params = [
                  { name: "sort", value: option.value },
                  { name: "order", value: option.order.toString() },
                ];
                router.push(`${pathname}?${handleQueryParams(params)}`);
              }
            }}
            defaultValue={field.value}
          >
            <FormControl className="w-[230px]">
              <SelectTrigger>
                <SelectValue placeholder={"Sort by"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {SortOptions.map((type) => (
                <SelectItem value={type.label} key={type.label}>
                  {type.label}
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

export default SortDropdown;
