import { apiClient } from "./apiClient";

export interface HistoryPoint {
  buses: number;
  cars: number;
  trucks?: number;
  datetime: Date;
}

export enum HistoryRange {
  Today = "today",
  ThreeDays = "3d",
  FiveDays = "5d",
  TenDays = "10d",
  Month = "1m",
  Year = "1y",
  AllTime = "all",
}

export async function getHistoryPoints(checkpoint: string, range: HistoryRange): Promise<HistoryPoint[]> {
  const query = new URLSearchParams({
    checkpoint,
    range,
  });

  return await apiClient<HistoryPoint[]>(`/history-points?${query.toString()}`, {
    method: "GET",
  });
}