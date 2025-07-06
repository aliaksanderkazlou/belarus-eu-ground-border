import { apiClient } from "./apiClient";

export interface LatestStatus {
  checkpoints: Checkpoint[];
  lastUpdatedAt: Date;
  congestion: CongestionLevel;
}

export type CongestionLevel = "free" | "medium" | "heavy";

export interface Checkpoint {
  latest?: CheckpointData;
  delta?: CheckpointData;
  name: string;
  title: string;
}

export interface CheckpointData {
  buses: number;
  cars: number;
  trucks?: number;
  datetime?: Date;
}

export async function getLatestStatuses(): Promise<LatestStatus[]> {
  return await apiClient<LatestStatus[]>("/latest-statuses", {
    method: "GET",
  });
}