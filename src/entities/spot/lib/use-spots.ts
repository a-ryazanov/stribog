import { ref, watchEffect } from 'vue';

import { Spot, fetchSpots } from '../../../shared/api';

export function useSpots() {
  const data = ref<Array<Spot>>([]);
  const error = ref(null);
  const loading = ref(false);

  watchEffect(() => {
    data.value = [];
    error.value = null;
    loading.value = true;

    fetchSpots()
      .then((spots) => (data.value = spots))
      .catch((error) => (error.value = error))
      .finally(() => (loading.value = false));
  });

  return { data, error, loading };
}
