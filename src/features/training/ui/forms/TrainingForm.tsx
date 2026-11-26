import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  Training,
  TrainingLevel,
} from "@/entities/training";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

const schema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter"),

  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter"),

  duration: z.coerce
    .number()
    .positive("Durasi harus lebih dari 0"),

  level: z.enum([
    "beginner",
    "intermediate",
    "advanced",
  ]),
});

export type TrainingFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<Training>;

  loading?: boolean;

  onSubmit: (
    values: TrainingFormValues
  ) => Promise<void> | void;
}

export function TrainingForm({
  defaultValues,
  loading = false,
  onSubmit,
}: Props) {
  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      duration: defaultValues?.duration ?? 1,
      level:
        defaultValues?.level ??
        "beginner",
    },
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Title */}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Judul Training
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Masukkan judul training"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Deskripsi
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Masukkan deskripsi training"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration */}

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Durasi (Jam)
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Level */}

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Level
                  </FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(
                        value as TrainingLevel
                      )
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih level" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner
                      </SelectItem>

                      <SelectItem value="intermediate">
                        Intermediate
                      </SelectItem>

                      <SelectItem value="advanced">
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              disabled={loading}
              type="submit"
            >
              {loading
                ? "Menyimpan..."
                : "Simpan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}