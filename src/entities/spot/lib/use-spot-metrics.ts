import { ref, watchEffect, toValue, onActivated, onDeactivated, ComputedGetter } from 'vue';

import { fetchMetrics } from '../../../shared/api';
import { selectedSpot } from '../model';

export function useSpotMetrics(id: ComputedGetter<string | null>) {
  const error = ref(null);
  const state = ref<'pending' | 'idle' | 'done'>('idle');
  const updatedAt = ref<Date | null>(null);

  let controller = new AbortController();

  const fetchData = async (): Promise<void> => {
    const rawId = toValue(id);

    if (rawId !== null) {
      error.value = null;
      state.value = 'pending';

      await fetchMetrics(rawId, controller.signal)
        .then((metrics) => {
          selectedSpot.setMetrics(metrics);

          updatedAt.value = new Date();
        })
        .catch((error) => (error.value = error))
        .finally(() => {
          state.value = 'done';
          controller = new AbortController();
        });
    }
  };

  watchEffect(async () => {
    if (selectedSpot.metrics.length === 0) {
      await fetchData();
    }
  });

  onActivated(async () => {
    if (selectedSpot.metrics.length === 0 && state.value !== 'pending') {
      await fetchData();
    }
  });

  onDeactivated(() => {
    controller.abort();
  });

  return {
    error,
    state,
    refetch: async () => {
      selectedSpot.setMetrics([]);

      await fetchData();
    },
  };
}
