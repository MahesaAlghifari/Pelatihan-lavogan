import { useNavigate } from "react-router-dom";

import {
  TrainingForm,
  useCreateTraining,
} from "@/features/training";

import {
  PageContainer,
} from "@/shared/components/common";

export function TrainingCreatePage() {
  const navigate = useNavigate();

  const mutation = useCreateTraining();

  return (
    <PageContainer
      title="Tambah Training"
      description="Buat data pelatihan baru."
    >
      <TrainingForm
        loading={mutation.isPending}
        onSubmit={async (values) => {
          await mutation.mutateAsync(values);

          navigate("/admin/training");
        }}
      />
    </PageContainer>
  );
}

export default TrainingCreatePage;