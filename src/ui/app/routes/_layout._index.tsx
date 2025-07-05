import { useLoaderData } from "@remix-run/react";
import { getLatestStatuses } from "~/api/latestStatuses";
import DashboardContent from "~/components/DashboardContent";

export const loader = async () => {
  const latestStatuses = await getLatestStatuses();

  return { latestStatuses };
};

export default function Dashboard() {
  const { latestStatuses } = useLoaderData<typeof loader>();

  console.log(latestStatuses);
  
  return <DashboardContent
    latestStatuses={latestStatuses}
  />;
}