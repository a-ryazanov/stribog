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

export enum SpotSafetyLineStatus {
  SAFE,
  WARNING,
  DANGER,
}

export interface SpotSafetyLine {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  status: SpotSafetyLineStatus;
}

export interface SpotDetails {
  description: string;
  safetyLines: Array<SpotSafetyLine>;
}
