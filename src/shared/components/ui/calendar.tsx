import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button, buttonVariants } from "@/shared/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "outline",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        `
        group/calendar
        bg-white
        p-2
        [--cell-radius:12px]
        [--cell-size:36px]
        `,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, {
            month: "short",
          }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn(
          `
          relative
          flex
          flex-col
          gap-4
          `,
          defaultClassNames.months
        ),
        month: cn(
          `
          flex
          w-full
          flex-col
          gap-4
          `,
          defaultClassNames.month
        ),
        nav: cn(
          `
          absolute
          inset-x-0
          top-0
          flex
          w-full
          items-center
          justify-between
          px-1
          `,
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({
            variant: buttonVariant,
          }),
          `
          h-8
          w-8
          rounded-lg
          p-0
          text-slate-500
          hover:bg-blue-50
          hover:text-blue-600
          `,
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({
            variant: buttonVariant,
          }),
          `
          h-8
          w-8
          rounded-lg
          p-0
          text-slate-500
          hover:bg-blue-50
          hover:text-blue-600
          `,
          defaultClassNames.button_next
        ),
        month_caption: cn(
          `
          flex
          h-9
          w-full
          items-center
          justify-center
          px-10
          `,
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          `
          text-sm
          font-semibold
          text-slate-900
          select-none
          `,
          defaultClassNames.caption_label
        ),
        month_grid: cn(
          `
          w-full
          border-collapse
          `,
          defaultClassNames.month_grid
        ),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          `
          flex-1
          text-center
          text-xs
          font-medium
          text-slate-400
          `,
          defaultClassNames.weekday
        ),
        week: cn(
          `
          mt-2
          flex
          w-full
          `,
          defaultClassNames.week
        ),
        day: cn(
          `
          group/day
          relative
          flex
          aspect-square
          h-9
          w-full
          items-center
          justify-center
          rounded-lg
          text-sm
          font-medium
          text-slate-700
          transition

          hover:bg-blue-50
          hover:text-blue-600
          `,
          defaultClassNames.day
        ),
        today: cn(
          `
          border
          border-blue-200
          text-blue-600
          font-semibold
          `,
          defaultClassNames.today
        ),
        outside: cn(
          `
          text-slate-300
          `,
          defaultClassNames.outside
        ),
        disabled: cn(
          `
          text-slate-300
          opacity-50
          `,
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }
          return (
            <ChevronDownIcon
              className={cn("size-4", className)}
              {...props}
            />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>;
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  // Evaluasi apakah tanggal ini dipilih (single)
  const isSelectedSingle =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={isSelectedSingle ? true : undefined}
      data-outside={modifiers.outside ? true : undefined}
      className={cn(
        `
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        text-sm
        font-medium
        text-slate-700
        transition-colors

        hover:bg-blue-50
        hover:text-blue-600

        data-[selected-single=true]:bg-blue-600
        data-[selected-single=true]:text-white

        data-[outside=true]:text-slate-400
        data-[outside=true]:opacity-50
        `,
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar, CalendarDayButton };