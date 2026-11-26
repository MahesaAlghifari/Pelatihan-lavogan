import { useRef } from "react";

import type {
  ChangeEvent,
} from "react";

import type {
  FieldValues,
} from "react-hook-form";

import {
  useFormContext,
} from "react-hook-form";

import {
  Upload,
  X,
} from "lucide-react";

import {
  Button,
} from "@/shared/components/ui/button";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import type {
  BaseFieldProps,
} from "../types";

interface Props<
  T extends FieldValues,
> extends BaseFieldProps<T> {
  accept?: string;

  multiple?: boolean;
}

export function FormUpload<
  T extends FieldValues,
>({
  name,
  label,
  description,
  disabled,
  accept,
  multiple = false,
}: Props<T>) {
  const form =
    useFormContext<T>();

  const inputRef =
    useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const files =
          field.value as
            | File[]
            | File
            | undefined;

        const handleChange = (
          e: ChangeEvent<HTMLInputElement>
        ) => {
          const selected =
            e.target.files;

          if (!selected) return;

          if (multiple) {
            field.onChange(
              Array.from(selected)
            );
          } else {
            field.onChange(
              selected[0]
            );
          }
        };

        const remove = () => {
          field.onChange(
            multiple ? [] : undefined
          );

          if (inputRef.current) {
            inputRef.current.value =
              "";
          }
        };

        return (
          <FormItem>

            <FormLabel>
              {label}
            </FormLabel>

            <FormControl>

              <div className="space-y-4">

                <input
                  ref={inputRef}
                  hidden
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  disabled={disabled}
                  onChange={handleChange}
                />

                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  onClick={() =>
                    inputRef.current?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" />

                  Upload File
                </Button>

                {!multiple &&
                  files instanceof File && (
                    <div className="flex items-center justify-between rounded-md border p-3">

                      <span className="text-sm">

                        {files.name}

                      </span>

                      <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        onClick={remove}
                      >
                        <X className="h-4 w-4" />
                      </Button>

                    </div>
                  )}

                {multiple &&
                  Array.isArray(files) &&
                  files.length > 0 && (
                    <div className="space-y-2">

                      {files.map(
                        (file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-md border p-3"
                          >
                            <span className="text-sm">

                              {file.name}

                            </span>
                          </div>
                        )
                      )}

                    </div>
                  )}

              </div>

            </FormControl>

            {description && (
              <FormDescription>
                {description}
              </FormDescription>
            )}

            <FormMessage />

          </FormItem>
        );
      }}
    />
  );
}