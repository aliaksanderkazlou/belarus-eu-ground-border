import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getHistoryPoints, HistoryRange } from "~/api/historyPoints";
import { getLatestStatuses } from "~/api/latestStatuses";
import DashboardContent from "~/components/dashboard/DashboardContent";
import { defer } from "@remix-run/node"; 

const defaultCheckpoint = "brest";
const defaultRange = HistoryRange.ThreeDays;

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const checkpoint = url.searchParams.get("checkpoint") || defaultCheckpoint;
  const range = (url.searchParams.get("range") as HistoryRange) || defaultRange;

  const historyPointsPromise = getHistoryPoints(checkpoint, range);
  const latestStatuses = await getLatestStatuses();

  return defer({
    latestStatuses,
    historyPoints: historyPointsPromise,
    selectedCheckpoint: checkpoint,
    selectedRange: range,
  });
};

export default function Dashboard() {
  const { latestStatuses, historyPoints, selectedCheckpoint, selectedRange } = useLoaderData<typeof loader>();
  const [_, setSearchParams] = useSearchParams();

  const handleSelectableParameterChange = (parameterName: string, parameterValue: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      newParams.set(parameterName, parameterValue);

      return newParams;
    }, {
      replace: true,
      preventScrollReset: true
    });
  }

  const handleCheckpointChange = (newCheckpoint: string) => {
    handleSelectableParameterChange("checkpoint", newCheckpoint);
  }

  const handleRangeChange = (newRange: string) => {
    handleSelectableParameterChange("range", newRange);
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