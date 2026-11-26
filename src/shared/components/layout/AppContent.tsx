import type {
  PropsWithChildren,
} from "react";

export function AppContent({
  children,
}: PropsWithChildren) {
  return (
    <section className="flex-1 p-6">
      {children}
    </section>
  );
}