import type {
  PropsWithChildren,
  ReactNode,
} from "react";

import {
  cn,
} from "@/shared/lib/utils";

import {
  PageContent,
} from "../page/PageContent";

import {
  PageHeader,
} from "../page/PageHeader";


interface PageContainerProps
  extends PropsWithChildren {
  title: string;

  description?: string;

  action?: ReactNode;

  className?: string;

  contentClassName?: string;
}


export function PageContainer({
  title,
  description,
  action,
  className,
  contentClassName,
  children,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "space-y-6",
        className
      )}
    >

      <PageHeader
        title={title}
        description={description}
        action={action}
      />

      <PageContent
        className={contentClassName}
      >
        {children}
      </PageContent>

    </div>
  );
}