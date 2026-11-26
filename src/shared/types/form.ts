export interface FormOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FormError {
  field: string;
  message: string;
}