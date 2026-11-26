import { useParams } from "react-router-dom";

import {
  PageContainer,
} from "@/shared/components/common";

export function TrainingDetailPage() {
  const { id } = useParams();

  return (
    <PageContainer
      title="Detail Training"
      description={`Training ID : ${id}`}
    >
      <div className="rounded-lg border bg-card p-6">
        Detail training akan ditampilkan di sini.
      </div>
    </PageContainer>
  );
}

export default TrainingDetailPage;