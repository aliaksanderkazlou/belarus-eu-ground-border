import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getHistoryPoints, HistoryRange } from "~/api/historyPoints";
import { getLatestStatuses } from "~/api/latestStatuses";
import DashboardContent from "~/components/dashboard/DashboardContent";

const defaultCheckpoint = "brest";
const defaultRange = HistoryRange.Today;

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const checkpoint = url.searchParams.get("checkpoint") || defaultCheckpoint;
  const range = (url.searchParams.get("range") as HistoryRange) || defaultRange;

  const latestStatuses = await getLatestStatuses();
  const historyPoints = await getHistoryPoints(checkpoint, range);

  return Response.json({
    latestStatuses,
    historyPoints,
    selectedCheckpoint: checkpoint,
    selectedRange: range,
  });
};

export default function Dashboard() {
  const { latestStatuses, historyPoints, selectedCheckpoint, selectedRange } = useLoaderData<typeof loader>();
  const [_, setSearchParams] = useSearchParams();

  const handleCheckpointChange = (newCheckpoint: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("checkpoint", newCheckpoint);
      return newParams;
    }, { replace: true });
  };

  const handleRangeChange = (newRange: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("range", newRange);
      return newParams;
    }, { replace: true });
  };

  return (
    <DashboardContent
      latestStatuses={latestStatuses}
      historyPoints={historyPoints}
      selectedCheckpoint={selectedCheckpoint}
      selectedRangeOption={selectedRange}
      rangeOptions={[
        HistoryRange.Today,
        HistoryRange.ThreeDays,
        HistoryRange.FiveDays,
        HistoryRange.TenDays,
        HistoryRange.Month,
        HistoryRange.Year,
        HistoryRange.AllTime
      ]}
      onCheckpointChange={handleCheckpointChange}
      onRangeChange={handleRangeChange}
    />
  );
}