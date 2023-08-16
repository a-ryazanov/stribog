import { ref, watchEffect, toValue, onActivated, onDeactivated, ComputedGetter } from 'vue';

import { fetchDetails, SpotDetails } from '../../../shared/api';

interface Options {
  immediate?: boolean;
}
export function useSpotDetails(
  id: ComputedGetter<string | null>,
  { immediate }: Options = { immediate: true },
) {
  const data = ref<SpotDetails | null>(null);
  const state = ref<'pending' | 'idle' | 'done'>('idle');

  let controller = new AbortController();

  const fetchData = async () => {
    const rawId = toValue(id);

    if (rawId !== null) {
      data.value = null;
      state.value = 'pending';

      await fetchDetails(rawId, controller.signal)
        .then((details) => {
          data.value = details;
        })
        .finally(() => {
          state.value = 'done';
          controller = new AbortController();
        });
    }
  };

  watchEffect(async () => {
    if (immediate) {
      await fetchData();
    }
  });

  onActivated(async () => {
    if (data.value === null && state.value !== 'pending' && immediate) {
      await fetchData();
    }
  });

  onDeactivated(() => {
    controller.abort();
  });

  return {
    data,
    state,
    refetch: fetchData,
  };
}
