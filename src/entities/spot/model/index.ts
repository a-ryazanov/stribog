import { reactive } from 'vue';

import { SpotMetrics, SpotDetails } from '../../../shared/api';

interface SelectedSpotStore {
  id: string | null;
  metrics: Array<SpotMetrics>;
  details: SpotDetails | null;
  set: (id: string) => void;
  setMetrics: (payload: Array<SpotMetrics>) => void;
  setDetails: (payload: SpotDetails | null) => void;
}

export const selectedSpot = reactive<SelectedSpotStore>({
  id: null,
  metrics: [],
  details: null,
  set(id: string) {
    this.id = id;
    this.metrics = [];
    this.details = null;
  },
  setMetrics(payload) {
    if (this.metrics.length === 0 && payload.length === 0) {
      return;
    }

    this.metrics = payload;
  },
  setDetails(payload) {
    this.details = payload;
  },
});
