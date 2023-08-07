import { Spot, SpotMetrics } from './types.ts';

const BASE_URL = 'http://193.124.125.33';

export const fetchSpots = async (): Promise<Array<Spot>> => {
  return fetch(`${BASE_URL}/spots`, { method: 'get' })
    .then((response) => response.json())
    .then((spots) => Object.keys(spots).map((id) => ({ id, name: spots[id] })));
};

export const fetchMetrics = async (id: string): Promise<Array<SpotMetrics>> => {
  return fetch(`${BASE_URL}/spots/${id}/metrics`, { method: 'get' }).then((response) =>
    response.json(),
  );
};

export type { Spot, SpotMetrics };
