import { onUnmounted, watchEffect } from 'vue';

import { fetchDetails } from '../../../shared/api';

import { selectedSpot } from '../model';

export function useSpotDetails() {
  let controller = new AbortController();

  watchEffect(async () => {
    const id = selectedSpot.id;

    if (id !== null && selectedSpot.details === null) {
      await fetchDetails
        .execute(id, controller.signal)
        .then((response) => {
          selectedSpot.setDetails(response);
        })
        .finally(() => {
          controller = new AbortController();
        });
    }
  });

  onUnmounted(() => {
    if (fetchDetails.loadingState === 'pending') {
      controller.abort();
    }
  });
}
