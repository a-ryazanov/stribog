import { ref, watchEffect, toValue, onActivated, onDeactivated, ComputedGetter } from 'vue';

import { fetchMetrics } from '../../../shared/api';
import { selectedSpot } from '../model';

interface Options {
  immediate?: boolean;
}

export function useSpotMetrics(
  id: ComputedGetter<string | null>,
  { immediate }: Options = { immediate: true },
) {
  const state = ref<'pending' | 'idle' | 'done'>('idle');
  const updatedAt = ref<Date | null>(null);

  let controller = new AbortController();

  const fetchData = async (): Promise<void> => {
    const rawId = toValue(id);

    if (rawId !== null) {
      state.value = 'pending';

      await fetchMetrics(rawId, controller.signal)
        .then((metrics) => {
          selectedSpot.setMetrics(metrics);

          updatedAt.value = new Date();
        })
        .finally(() => {
          state.value = 'done';
          controller = new AbortController();
        });
    }
  };

  watchEffect(async () => {
    if (selectedSpot.metrics.length === 0 && immediate) {
      await fetchData();
    }
  });

  onActivated(async () => {
    if (selectedSpot.metrics.length === 0 && state.value !== 'pending' && immediate) {
      await fetchData();
    }
  });

  onDeactivated(() => {
    controller.abort();
  });

  return {
    state,
    updatedAt,
    refetch: fetchData,
  };
}
