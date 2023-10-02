import { ref, onDeactivated, watchEffect } from 'vue';

import { selectedSpot } from '../model';

export function useSpotDetails() {
  const state = ref<'pending' | 'idle' | 'done'>('idle');

  let controller = new AbortController();

  const fetchData = async () => {
    state.value = 'pending';

    await selectedSpot.fetchDetails(controller.signal).finally(() => {
      state.value = 'done';
      controller = new AbortController();
    });
  };

  watchEffect(async () => {
    await fetchData();
  });

  onDeactivated(() => {
    if (selectedSpot.loadingState === 'pending') {
      controller.abort();
    }
  });

  return { state };
}
