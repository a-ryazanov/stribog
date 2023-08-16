import { Spot, SpotMetrics, SpotDetails, SpotSafetyLine, SpotSafetyLineStatus } from './types.ts';

const BASE_URL = import.meta.env.DEV
  ? 'https://cors-anywhere.herokuapp.com/http://193.124.125.33'
  : 'http://193.124.125.33';

export const fetchSpots = async (): Promise<Array<Spot>> => {
  return fetch(`${BASE_URL}/spots`, { method: 'get' })
    .then((response) => response.json())
    .then((spots) => Object.keys(spots).map((id) => ({ id, name: spots[id] })));
};

export const fetchMetrics = async (
  id: string,
  signal: AbortSignal,
): Promise<Array<SpotMetrics>> => {
  return fetch(`${BASE_URL}/spots/${id}/metrics`, { method: 'get', signal }).then((response) =>
    response.json(),
  );
};

export const fetchDetails = async (id: string, signal: AbortSignal): Promise<SpotDetails> => {
  return fetch(`${BASE_URL}/spots/${id}/details`, { method: 'get', signal }).then((response) =>
    response.json(),
  );
};

export type { Spot, SpotMetrics, SpotDetails, SpotSafetyLine };
export { SpotSafetyLineStatus };
