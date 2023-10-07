import { onUnmounted, watchEffect } from 'vue';

import { fetchMetrics } from '../../../shared/api';

import { selectedSpot } from '../model';

export function useSpotMetrics() {
  let controller = new AbortController();

  watchEffect(async () => {
    const id = selectedSpot.id;

    if (id !== null && selectedSpot.metrics.length === 0) {
      await fetchMetrics
        .execute(id, controller.signal)
        .then((response) => {
          selectedSpot.setMetrics(response);
        })
        .finally(() => {
          controller = new AbortController();
        });
    }
  });

  onUnmounted(() => {
    if (fetchMetrics.loadingState === 'pending') {
      controller.abort();
    }
  });
}
