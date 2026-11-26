import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface TrainingFilterProps {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export function TrainingFilter({
  value,
  onChange,
}: TrainingFilterProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger>

        <SelectValue placeholder="Status" />

      </SelectTrigger>

      <SelectContent>

        <SelectItem value="all">
          Semua
        </SelectItem>

        <SelectItem value="published">
          Published
        </SelectItem>

        <SelectItem value="draft">
          Draft
        </SelectItem>

      </SelectContent>

    </Select>
  );
}