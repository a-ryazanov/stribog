import { reactive } from 'vue';

import { SpotMetrics } from '../../../shared/api';

interface SelectedSpotStore {
  id: string | null;
  metrics: Array<SpotMetrics>;
  updatedAt: Date | null;
  set: (id: string) => void;
  setMetrics: (data: Array<SpotMetrics>) => void;
  setUpdatedAt: (data: Date) => void;
}

export const selectedSpot = reactive<SelectedSpotStore>({
  id: null,
  metrics: [],
  updatedAt: null,
  set(id: string) {
    selectedSpot.id = id;
    selectedSpot.metrics = [];
  },
  setMetrics(metrics: Array<SpotMetrics>) {
    selectedSpot.metrics = metrics;
  },
  setUpdatedAt(updatedAt: Date) {
    selectedSpot.updatedAt = updatedAt;
  },
});
