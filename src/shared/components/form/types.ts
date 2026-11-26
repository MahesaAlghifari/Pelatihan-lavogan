import type {
  FieldValues,
  Path,
} from "react-hook-form";

export interface BaseFieldProps<
  T extends FieldValues,
> {
  name: Path<T>;

  label: string;

  placeholder?: string;

  description?: string;

  disabled?: boolean;

  required?: boolean;
}

export interface SelectOption {
  label: string;

  value: string;
}