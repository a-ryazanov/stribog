import { ref, watchEffect, toValue, ComputedGetter } from 'vue';

import { fetchMetrics } from '../../../shared/api';
import { selectedSpot } from '../model';

export function useSpotMetrics(id: ComputedGetter<string | null>) {
  const error = ref(null);
  const state = ref<'pending' | 'idle' | 'done'>('idle');
  const updatedAt = ref<Date | null>(null);

  const fetchData = () => {
    const rawId = toValue(id);

    if (rawId !== null) {
      error.value = null;
      state.value = 'pending';

      fetchMetrics(rawId)
        .then((metrics) => {
          selectedSpot.setMetrics(metrics);

          updatedAt.value = new Date();
        })
        .catch((error) => (error.value = error))
        .finally(() => (state.value = 'done'));
    }
  };

  watchEffect(fetchData);

  return { error, state, updatedAt, refetch: fetchData };
}
