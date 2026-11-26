import type {
  PropsWithChildren,
} from "react";

interface Props
  extends PropsWithChildren {
  title: string;

  description?: string;
}

export function FormSection({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}