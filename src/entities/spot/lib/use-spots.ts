import { ref, watchEffect } from 'vue';

import { Spot, fetchSpots } from '../../../shared/api';

export function useSpots() {
  const data = ref<Array<Spot>>([]);
  const loading = ref(false);

  watchEffect(() => {
    data.value = [];
    loading.value = true;

    fetchSpots()
      .then((spots) => (data.value = spots))
      .finally(() => (loading.value = false));
  });

  return { data, loading };
}
