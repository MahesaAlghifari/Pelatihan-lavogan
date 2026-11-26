import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import { Textarea } from "@/shared/components/ui/textarea";

import type { BaseFieldProps } from "../types";

interface Props<T extends FieldValues>
  extends BaseFieldProps<T> {
  rows?: number;
}

export function FormTextarea<
  T extends FieldValues,
>({
  name,
  label,
  placeholder,
  rows = 5,
  disabled,
}: Props<T>) {
  const form = useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Textarea
              {...field}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}