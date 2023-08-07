import { ref, watchEffect, toValue, ComputedGetter } from 'vue';

import { fetchMetrics, SpotMetrics } from '../../../shared/api';

export function useSpotMetrics(id: ComputedGetter<string | null>) {
  const data = ref<Array<SpotMetrics>>([]);
  const error = ref(null);
  const state = ref<'pending' | 'idle' | 'done'>('idle');
  const updatedAt = ref<Date | null>(null);

  const fetchData = () => {
    const rawId = toValue(id);

    if (rawId !== null) {
      data.value = [];
      error.value = null;
      state.value = 'pending';

      fetchMetrics(rawId)
        .then((metrics) => {
          data.value = metrics;
          updatedAt.value = new Date();
        })
        .catch((error) => (error.value = error))
        .finally(() => (state.value = 'done'));
    }
  };

  watchEffect(fetchData);

  return { data, error, state, updatedAt, refetch: fetchData };
}
