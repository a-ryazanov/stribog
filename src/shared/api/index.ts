import { reactive } from 'vue';

import {
  Spot,
  SpotMetrics,
  SpotDetails,
  SpotSafetyLine,
  SpotSafetyLineStatus,
  BaseQuery,
} from './types.ts';

const BASE_URL = import.meta.env.DEV
  ? 'https://cors-anywhere.herokuapp.com/http://193.124.125.33'
  : 'http://193.124.125.33';

export const fetchSpots = async (): Promise<Array<Spot>> =>
  fetch(`${BASE_URL}/spots`, { method: 'get' })
    .then((response) => response.json())
    .then((spots) => Object.keys(spots).map((id) => ({ id, name: spots[id] })));

interface FetchMetricsQuery extends BaseQuery<string, Array<SpotMetrics>> {}

export const fetchMetrics = reactive<FetchMetricsQuery>({
  loadingState: 'idle',
  lastResponseTime: null,
  error: null,
  async execute(id, signal) {
    this.loadingState = 'pending';

    return fetch(`${BASE_URL}/spots/${id}/metrics`, { method: 'get', signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((data: Array<SpotMetrics>) => {
        this.lastResponseTime = new Date();

        return data;
      })
      .catch((error: Error) => {
        this.error = error.message;

        return [];
      })
      .finally(() => {
        this.loadingState = 'done';
      });
  },
});

interface FetchDetailsQuery extends BaseQuery<string, SpotDetails | null> {}

export const fetchDetails = reactive<FetchDetailsQuery>({
  loadingState: 'idle',
  lastResponseTime: null,
  error: null,
  async execute(id, signal) {
    this.loadingState = 'pending';

    return fetch(`${BASE_URL}/spots/${id}/details`, { method: 'get', signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error(`${response.status} ${response.statusText}`);
      })
      .then((data: SpotDetails) => {
        this.lastResponseTime = new Date();

        return data;
      })
      .catch((error: Error) => {
        this.error = error.message;

        return null;
      })
      .finally(() => {
        this.loadingState = 'done';
      });
  },
});

export type { Spot, SpotMetrics, SpotDetails, SpotSafetyLine };
export { SpotSafetyLineStatus };
