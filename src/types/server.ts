export type HealthType = "healthy" | "disabled" | "error";

export interface Server {
  id: string;
  name: string;
  location: string;
  health: HealthType;
  ip: string;
  volume: number;
  createdAt: string;
}
