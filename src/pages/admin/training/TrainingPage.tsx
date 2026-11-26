import {
  TrainingFilter,
  TrainingList,
  TrainingSearch,
  useTrainingFilter,
} from "@/features/training";

import {
  PageContainer,
} from "@/shared/components/common";

export function TrainingPage() {
  const filter = useTrainingFilter();

  return (
    <PageContainer
      title="Training"
      description="Kelola seluruh data pelatihan."
    >
      <div className="space-y-4">
        <TrainingSearch
          value={filter.search}
          onChange={filter.setSearch}
        />

        <TrainingFilter
          value={filter.status}
          onChange={filter.setStatus}
        />

        <TrainingList />
      </div>
    </PageContainer>
  );
}

export default TrainingPage;