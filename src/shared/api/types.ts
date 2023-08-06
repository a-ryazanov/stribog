export interface Spot {
  id: string;
  name: string;
}

export interface SpotMetrics {
  time: string;
  windSpeed: number;
  azimuth: number;
  temperature: number;
  voltage: number;
}
