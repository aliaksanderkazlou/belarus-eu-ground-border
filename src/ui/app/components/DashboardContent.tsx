import { LatestStatus } from "~/api/latestStatuses";
import StatusCard from "./StatusCard";
import Card from "./shared/Card";

interface DashboardContentProps {
  latestStatuses: LatestStatus[],
}

export default function DashboardContent({ latestStatuses }: DashboardContentProps) {
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
        <Card>
          <div>
            <label htmlFor="comment" className="block text-sm/6 font-medium text-gray-900">
              Add your comment
            </label>
            <div className="mt-2">
              <textarea
                id="comment"
                name="comment"
                rows={4}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                defaultValue={''}
              />
            </div>
          </div>
        </Card>
      </ul>
    </div>
  );
}