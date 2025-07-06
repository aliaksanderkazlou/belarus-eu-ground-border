import { LatestStatus } from "~/api/latestStatuses";
import StatusCard from "./StatusCard";
import Card from "../shared/Card";
import { HistoryPoint } from "~/api/historyPoints";
import HistoryGraph from "./HistoryGraph";

interface DashboardContentProps {
  latestStatuses: LatestStatus[],
  historyPoints: HistoryPoint[],
}

export default function DashboardContent({ latestStatuses, historyPoints }: DashboardContentProps) {
  return (
    <div>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {latestStatuses.map((status) => (
          <StatusCard
            status={status}
          />
        ))}
      </ul>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-1 xl:gap-x-8 pt-10">
        <HistoryGraph
          historyPoints={historyPoints}
        />
      </ul>
    </div>
  );
}