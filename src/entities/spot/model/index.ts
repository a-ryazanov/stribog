import { reactive } from 'vue';

import { fetchMetrics, fetchDetails, SpotMetrics, SpotDetails } from '../../../shared/api';

interface SelectedSpotStore {
  id: string | null;
  loadingState: 'pending' | 'idle' | 'done';
  metrics: Array<SpotMetrics>;
  details: SpotDetails | null;
  updatedAt: Date | null;
  set: (id: string) => void;
  reset: () => void;
  fetchMetrics: (signal?: AbortSignal) => Promise<void>;
  fetchDetails: (signal?: AbortSignal) => Promise<void>;
}

export const selectedSpot = reactive<SelectedSpotStore>({
  id: null,
  loadingState: 'idle',
  metrics: [],
  details: null,
  updatedAt: null,
  set(id: string) {
    this.id = id;
    this.loadingState = 'idle';
    this.metrics = [];
    this.details = null;
    this.updatedAt = null;
  },
  reset() {
    this.loadingState = 'idle';
    this.metrics = [];
    this.updatedAt = null;
  },
  async fetchMetrics(signal?: AbortSignal) {
    try {
      if (this.id !== null) {
        this.loadingState = 'pending';

        this.metrics = await fetchMetrics(this.id, signal);
        this.updatedAt = new Date();
      }
    } finally {
      this.loadingState = 'done';
    }
  },
  async fetchDetails(signal?: AbortSignal) {
    try {
      if (this.id !== null) {
        this.loadingState = 'pending';

        this.details = await fetchDetails(this.id, signal);
      }
    } finally {
      this.loadingState = 'done';
    }
  },
});
