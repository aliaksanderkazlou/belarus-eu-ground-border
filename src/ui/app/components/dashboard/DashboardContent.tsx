import { LatestStatus } from "~/api/latestStatuses";
import StatusCard from "./StatusCard";
import { HistoryPoint } from "~/api/historyPoints";
import { HistoryGraph } from "./HistoryGraph";
import DashboardFilters from "./DashboardFilters";

interface DashboardContentProps {
  latestStatuses: LatestStatus[];
  historyPoints: HistoryPoint[];
  selectedRangeOption: string;
  rangeOptions: string[];
  selectedCheckpoint: string;
  onRangeChange: (value: string) => void;
  onCheckpointChange: (value: string) => void;
}

export default function DashboardContent({
  latestStatuses,
  historyPoints,
  selectedRangeOption,
  rangeOptions,
  selectedCheckpoint,
  onRangeChange,
  onCheckpointChange
}: DashboardContentProps) {
  return (
    <div>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {latestStatuses.map((status) => (
          <StatusCard
            key={status.checkpoints.map(cp => cp.name).join('-')}
            status={status}
          />
        ))}
      </ul>

      <div className="pt-10">
        <DashboardFilters
          checkpoints={Array.from(
            new Map(
              latestStatuses
                .flatMap((s) => s.checkpoints)
                .map((cp) => [cp.name, { name: cp.name, title: cp.title }])
            ).values()
          )}
          selectedCheckpoint={selectedCheckpoint}
          rangeOptions={rangeOptions}
          selectedRangeOption={selectedRangeOption}
          onRangeChange={onRangeChange}
          onCheckpointChange={onCheckpointChange}
        />
      </div>

      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-1 xl:gap-x-8 pt-2">
        <HistoryGraph
          historyPoints={historyPoints}
        />
      </ul>
    </div>
  );
}