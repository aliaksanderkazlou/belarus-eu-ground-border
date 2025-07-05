import { LatestStatus } from "~/api/latestStatuses";
import StatusCard from "./StatusCard";

interface DashboardContentProps {
  latestStatuses: LatestStatus[],
}

export default function DashboardContent({ latestStatuses }: DashboardContentProps) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {latestStatuses.map((status) => (
        <StatusCard
          status={status}
        />
      ))}
    </ul>
  );
}