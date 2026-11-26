import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Button,
} from "@/shared/components/ui/button";

import {
  Calendar,
} from "@/shared/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import { cn } from "@/shared/lib/utils";

import type {
  BaseFieldProps,
} from "../types";

interface Props<T extends FieldValues>
  extends BaseFieldProps<T> {
  placeholder?: string;
}

export function FormDatePicker<
  T extends FieldValues,
>({
  name,
  label,
  placeholder = "Pilih tanggal",
  disabled,
}: Props<T>) {
  const form =
    useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">

          <FormLabel>
            {label}
          </FormLabel>

          <Popover>

            <PopoverTrigger
              asChild
            >

              <FormControl>

                <Button
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "justify-start text-left font-normal",
                    !field.value &&
                      "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {field.value ? (
                    format(
                      new Date(field.value),
                      "dd MMM yyyy"
                    )
                  ) : (
                    placeholder
                  )}
                </Button>

              </FormControl>

            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0"
              align="start"
            >

              <Calendar
                mode="single"
                selected={
                  field.value
                    ? new Date(field.value)
                    : undefined
                }
                onSelect={(date) =>
                  field.onChange(date)
                }
              />

            </PopoverContent>

          </Popover>

          <FormMessage />

        </FormItem>
      )}
    />
  );
}