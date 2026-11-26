interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}


export function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {

  if (!active || !payload?.length) {
    return null;
  }


  return (
    <div
      className="
        rounded-xl
        border
        bg-background
        p-4
        shadow-lg
      "
    >

      <p className="mb-3 text-sm font-semibold">
        {label}
      </p>


      {payload.map((item) => (
        <div
          key={item.dataKey}
          className="
            flex
            items-center
            justify-between
            gap-8
            text-sm
          "
        >

          <span className="capitalize text-muted-foreground">
            {item.dataKey}
          </span>


          <span className="font-semibold">
            {item.value}
          </span>

        </div>
      ))}

    </div>
  );
}