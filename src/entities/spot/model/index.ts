import { reactive } from 'vue';

import { SpotMetrics } from '../../../shared/api';

interface SelectedSpotStore {
  id: string | null;
  metrics: Array<SpotMetrics>;
  set: (id: string) => void;
  setMetrics: (data: Array<SpotMetrics>) => void;
}

export const selectedSpot = reactive<SelectedSpotStore>({
  id: null,
  metrics: [],
  set(id: string) {
    selectedSpot.id = id;
    selectedSpot.metrics = [];
  },
  setMetrics(metrics: Array<SpotMetrics>) {
    selectedSpot.metrics = metrics;
  },
});
