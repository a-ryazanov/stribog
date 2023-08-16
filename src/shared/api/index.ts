import { reactive } from 'vue';

import { Spot, SpotMetrics, SpotDetails, SpotSafetyLine, SpotSafetyLineStatus } from './types.ts';

const BASE_URL = import.meta.env.DEV
  ? 'https://cors-anywhere.herokuapp.com/http://193.124.125.33'
  : 'http://193.124.125.33';

export const fetchSpots = async (): Promise<Array<Spot>> => {
  globalFetch.setState('pending');

  return fetch(`${BASE_URL}/spots`, { method: 'get' })
    .then((response) => response.json())
    .then((spots) => Object.keys(spots).map((id) => ({ id, name: spots[id] })))
    .then((response) => {
      globalFetch.setState('done');

      return response;
    });
};

export const fetchMetrics = async (
  id: string,
  signal: AbortSignal,
): Promise<Array<SpotMetrics>> => {
  globalFetch.setState('pending');

  return fetch(`${BASE_URL}/spots/${id}/metrics`, { method: 'get', signal })
    .then((response) => response.json())
    .then((response) => {
      globalFetch.setState('done');

      return response;
    });
};

export const fetchDetails = async (id: string, signal: AbortSignal): Promise<SpotDetails> => {
  globalFetch.setState('pending');

  return fetch(`${BASE_URL}/spots/${id}/details`, { method: 'get', signal })
    .then((response) => response.json())
    .then((response) => {
      globalFetch.setState('done');

      return response;
    });
};

type LoadingState = 'idle' | 'pending' | 'done';

interface GlobalFetchState {
  state: LoadingState;
  setState: (state: LoadingState) => void;
}

export const globalFetch = reactive<GlobalFetchState>({
  state: 'idle',
  setState: (state) => {
    globalFetch.state = state;
  },
});

export type { Spot, SpotMetrics, SpotDetails, SpotSafetyLine };
export { SpotSafetyLineStatus };
