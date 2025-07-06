import { useLoaderData } from "@remix-run/react";
import { getHistoryPoints, HistoryRange } from "~/api/historyPoints";
import { getLatestStatuses } from "~/api/latestStatuses";
import DashboardContent from "~/components/dashboard/DashboardContent";

export const loader = async () => {
  const latestStatuses = await getLatestStatuses();
  const historyPoints = await getHistoryPoints('brest', HistoryRange.Year);

  return { latestStatuses, historyPoints };
};

export default function Dashboard() {
  const { latestStatuses, historyPoints } = useLoaderData<typeof loader>();
  
  return <DashboardContent
    latestStatuses={latestStatuses}
    historyPoints={historyPoints}
  />;
}