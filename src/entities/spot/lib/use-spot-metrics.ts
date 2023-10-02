import { onActivated, onDeactivated } from 'vue';

import { selectedSpot } from '../model';

export function useSpotMetrics() {
  let controller = new AbortController();

  const fetchData = async (): Promise<void> => {
    await selectedSpot.fetchMetrics(controller.signal).finally(() => {
      controller = new AbortController();
    });
  };

  onActivated(async () => {
    if (selectedSpot.metrics.length === 0) {
      await fetchData();
    }
  });

  onDeactivated(() => {
    if (selectedSpot.loadingState === 'pending') {
      controller.abort();
    }
  });
}
