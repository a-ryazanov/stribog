import { ref, watchEffect, toValue, ComputedGetter } from 'vue';

// import { fetchSpotImage } from '../../../shared/api';
// import { selectedSpot } from '../model';

export function useSpotDescription(id: ComputedGetter<string | null>) {
  const error = ref(null);
  const state = ref<'pending' | 'idle' | 'done'>('idle');

  const fetchData = () => {
    const rawId = toValue(id);

    if (rawId !== null) {
      error.value = null;
      state.value = 'pending';

      // fetchSpotImage({ coords: [] })
      //   .then((map) => {
      //     selectedSpot.setMap(map);
      //   })
      //   .catch((error) => (error.value = error))
      //   .finally(() => (state.value = 'done'));
    }
  };

  watchEffect(fetchData);

  return { error, state, refetch: fetchData };
}
