import type {
  PropsWithChildren,
} from "react";

export function AppMain({
  children,
}: PropsWithChildren) {
  return (
    <main className="flex flex-1 flex-col">
      {children}
    </main>
  );
}