import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

import {
  Form,
} from "@/shared/components/ui/form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;

  onSubmit: SubmitHandler<T>;

  className?: string;

  children: React.ReactNode;
}

export function FormProvider<
  T extends FieldValues,
>({
  form,
  onSubmit,
  className,
  children,
}: Props<T>) {
  return (
    <Form {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(
          onSubmit
        )}
      >
        {children}
      </form>
    </Form>
  );
}