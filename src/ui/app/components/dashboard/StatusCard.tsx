import React from "react";
import { LatestStatus, CheckpointData } from "~/api/latestStatuses";
import Card from "../shared/Card";

interface StatusCardProps {
  status: LatestStatus;
}

const congestionMap = {
  free: { color: "green", headerBg: "bg-green-50" },
  medium: { color: "yellow", headerBg: "bg-yellow-50" },
  heavy: { color: "red", headerBg: "bg-red-50" },
} as const;

function formatChange(change: number | undefined) {
  if (change === null || change === undefined) return null;
  const positive = change > 0;
  const zero = change === 0;
  return (
    <span className={`ml-1 text-xs ${zero ? 'text-gray-400' : positive ? 'text-red-600' : 'text-green-600'}`}>
      ({positive ? '+' : ''}{change})
    </span>
  );
}

function formatHumanDate(dateStr: string | Date | undefined) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  return isToday
    ? `Сегодня в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`
    : date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
}

export const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  const [left, right] = status.checkpoints;

  const titles = ["Автобусы", "Машины", "Грузовики"];
  const keys: Array<"buses" | "cars" | "trucks"> = ["buses", "cars", "trucks"];

  const renderCell = (
    type: "buses" | "cars" | "trucks",
    data?: CheckpointData,
    delta?: CheckpointData
  ) => {
    const val = data?.[type];
    const ch = delta?.[type];

    if (val === null || val === undefined) return <span className="text-gray-400">—</span>;

    return (
      <>
        {val}
        {formatChange(ch)}
      </>
    );
  };

  const color = congestionMap[status.congestion]?.color ?? "gray";
  const headerBg = congestionMap[status.congestion]?.headerBg ?? "bg-gray-50";

  return (
    <Card color={color}>
      <div className={`flex flex-col gap-y-1 border-b border-gray-900/5 px-6 py-3 ${headerBg}`}>
        <div className="text-base font-semibold text-gray-900">
          {left.title} — {right.title}
        </div>
        <div className="text-xs text-gray-500">
          Обновлено: {formatHumanDate(status.lastUpdatedAt)}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"></th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{left.title}</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">{right.title}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {titles.map((title, idx) => {
                    const key = keys[idx];
                    return (
                      <tr key={key}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0 font-medium">
                          {title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {renderCell(key, left.latest, left.delta)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {renderCell(key, right.latest, right.delta)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;