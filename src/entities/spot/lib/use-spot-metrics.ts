import { ref, watchEffect, toValue, ComputedGetter } from 'vue';

import { fetchMetrics, SpotMetrics } from '../../../shared/api';

export function useSpotMetrics(id: ComputedGetter<string | null>) {
  const data = ref<Array<SpotMetrics>>([]);
  const error = ref(null);
  const loading = ref(false);
  const updatedAt = ref<Date | null>(null);

  watchEffect(() => {
    const rawId = toValue(id);

    if (rawId !== null) {
      data.value = [];
      error.value = null;
      loading.value = true;

      fetchMetrics(rawId)
        .then((metrics) => {
          data.value = metrics;
          updatedAt.value = new Date();
        })
        .catch((error) => (error.value = error))
        .finally(() => (loading.value = false));
    }
  });

  return { data, error, loading, updatedAt };
}
