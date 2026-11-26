import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import type {
  BaseFieldProps,
  SelectOption,
} from "../types";

interface Props<T extends FieldValues>
  extends BaseFieldProps<T> {
  options: SelectOption[];

  placeholder?: string;
}

export function FormSelect<
  T extends FieldValues,
>({
  name,
  label,
  description,
  placeholder,
  options,
  disabled,
}: Props<T>) {
  const form =
    useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>

          <FormLabel>
            {label}
          </FormLabel>

          <Select
            value={field.value ?? ""}
            disabled={disabled}
            onValueChange={field.onChange}
          >

            <FormControl>

              <SelectTrigger>

                <SelectValue
                  placeholder={placeholder}
                />

              </SelectTrigger>

            </FormControl>

            <SelectContent>

              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}

          <FormMessage />

        </FormItem>
      )}
    />
  );
}