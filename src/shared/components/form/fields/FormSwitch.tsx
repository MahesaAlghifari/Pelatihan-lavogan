import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import {
  Switch,
} from "@/shared/components/ui/switch";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import type { BaseFieldProps } from "../types";

export function FormSwitch<
  T extends FieldValues,
>({
  name,
  label,
  disabled,
}: BaseFieldProps<T>) {
  const form = useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-4">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Switch
              checked={!!field.value}
              disabled={disabled}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}