import type { PropsWithChildren } from "react";

interface BlankLayoutProps
  extends PropsWithChildren {}

export function BlankLayout({
  children,
}: BlankLayoutProps) {
  return <>{children}</>;
}

export default BlankLayout;