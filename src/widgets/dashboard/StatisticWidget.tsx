import { Card, CardContent } from "@/shared/components/ui/card";

interface StatisticWidgetProps {
  totalTraining: number;
  totalCertificate: number;
  completedTraining: number;
  totalQuiz: number;
}

export function StatisticWidget({
  totalTraining,
  totalCertificate,
  completedTraining,
  totalQuiz,
}: StatisticWidgetProps) {
  const items = [
    {
      title: "Training",
      value: totalTraining,
    },
    {
      title: "Selesai",
      value: completedTraining,
    },
    {
      title: "Quiz",
      value: totalQuiz,
    },
    {
      title: "Sertifikat",
      value: totalCertificate,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              {item.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {item.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}