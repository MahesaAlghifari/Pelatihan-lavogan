import type {
  FieldValues,
} from "react-hook-form";

import {
  useFormContext,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import {
  Input,
} from "@/shared/components/ui/input";

import type {
  BaseFieldProps,
} from "../types";

interface Props<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  type?: React.HTMLInputTypeAttribute;
}

export function FormTextField<
  T extends FieldValues,
>({
  name,
  label,
  placeholder,
  disabled,
  type = "text",
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

          <FormControl>

            <Input
              {...field}
              type={type}
              placeholder={
                placeholder
              }
              disabled={disabled}
            />

          </FormControl>

          <FormMessage />

        </FormItem>
      )}
    />
  );
}