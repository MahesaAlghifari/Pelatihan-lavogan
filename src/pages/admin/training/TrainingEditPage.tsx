import { useParams } from "react-router-dom";

import {
  TrainingForm,
  useTraining,
  useUpdateTraining,
} from "@/features/training";

import {
  PageContainer,
} from "@/shared/components/common";

export function TrainingEditPage() {
  const { id = "" } = useParams();

  const { data } = useTraining(id);

  const mutation = useUpdateTraining();

  return (
    <PageContainer
      title="Edit Training"
      description="Perbarui data training."
    >
      <TrainingForm
        defaultValues={data}
        loading={mutation.isPending}
        onSubmit={async (values) => {
          await mutation.mutateAsync({
            id,
            data: values,
          });
        }}
      />
    </PageContainer>
  );
}

export default TrainingEditPage;