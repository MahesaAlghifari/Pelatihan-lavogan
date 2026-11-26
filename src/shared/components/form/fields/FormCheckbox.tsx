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

import { Checkbox } from "@/shared/components/ui/checkbox";

import type { BaseFieldProps } from "../types";

interface Props<T extends FieldValues>
  extends BaseFieldProps<T> {
  description?: string;
}

export function FormCheckbox<
  T extends FieldValues,
>({
  name,
  label,
  description,
  disabled,
}: Props<T>) {
  const form = useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 rounded-lg border p-4">
          <FormControl>
            <Checkbox
              checked={Boolean(field.value)}
              disabled={disabled}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <div className="space-y-1 leading-none">
            <FormLabel>
              {label}
            </FormLabel>

            {description && (
              <FormDescription>
                {description}
              </FormDescription>
            )}

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}