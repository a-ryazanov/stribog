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
  pressure: number;
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

export interface BaseQuery<Params, Response> {
  loadingState: 'pending' | 'idle' | 'done';
  lastResponseTime: Date | null;
  error: string | null;
  execute: (params: Params, signal?: AbortSignal) => Promise<Response>;
}
