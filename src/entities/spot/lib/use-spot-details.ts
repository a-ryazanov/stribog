import { ref, watchEffect, toValue, onActivated, onDeactivated, ComputedGetter } from 'vue';

import { fetchDetails, SpotDetails } from '../../../shared/api';

export function useSpotDetails(id: ComputedGetter<string | null>) {
  const data = ref<SpotDetails | null>(null);
  const state = ref<'pending' | 'idle' | 'done'>('idle');
  const error = ref(null);

  let controller = new AbortController();

  const fetchData = async () => {
    const rawId = toValue(id);

    if (rawId !== null) {
      data.value = null;
      error.value = null;
      state.value = 'pending';

      await fetchDetails(rawId, controller.signal)
        .then((details) => {
          data.value = details;
        })
        .catch((error) => (error.value = error))
        .finally(() => {
          state.value = 'done';
          controller = new AbortController();
        });
    }
  };

  watchEffect(fetchData);

  onActivated(async () => {
    if (data.value === null && state.value !== 'pending') {
      await fetchData();
    }
  });

  onDeactivated(() => {
    controller.abort();
  });

  return {
    data,
    error,
    state,
    refetch: fetchData,
  };
}
