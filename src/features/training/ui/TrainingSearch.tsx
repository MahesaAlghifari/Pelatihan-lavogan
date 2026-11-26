import { Input } from "@/shared/components/ui/input";

interface TrainingSearchProps {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export function TrainingSearch({
  value,
  onChange,
}: TrainingSearchProps) {
  return (
    <Input
      placeholder="Cari pelatihan..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}