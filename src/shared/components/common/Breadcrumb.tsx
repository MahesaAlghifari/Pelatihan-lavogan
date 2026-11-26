import { Fragment } from "react";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  homeHref?: string;
  className?: string;
}

export default function Breadcrumb({
  items,
  showHome = true,
  homeHref = "/",
  className = "",
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-sm ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {showHome && (
          <>
            <li>
              <Link
                to={homeHref}
                className="flex items-center text-gray-500 transition-colors hover:text-primary"
              >
                <HomeIcon className="h-4 w-4" />
              </Link>
            </li>

            {items.length > 0 && (
              <li>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </li>
            )}
          </>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="text-gray-500 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium"
                    style={{ color: "var(--text-primary)" }}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>

              {!isLast && (
                <li>
                  <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}