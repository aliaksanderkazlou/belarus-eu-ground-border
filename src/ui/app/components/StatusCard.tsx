import React from "react";

interface StatusCardProps {
  id: number;
  name: string;
  status: string;
  updatedAt: string;
  data: any,
}

function formatChange(change: number) {
  const positive = change > 0;
  const zero = change === 0;
  return (
    <span className={`ml-1 text-xs ${zero ? 'text-gray-400' : positive ? 'text-red-600' : 'text-green-600'}`}>
      ({positive ? '+' : ''}{change})
    </span>
  );
}

const StatusCard: React.FC<StatusCardProps> = ({
  id,
  name,
  status,
  updatedAt,
  data
}) => {
  return (
    <li key={id} className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white">
      <div className="flex flex-col gap-y-1 border-b border-gray-900/5 bg-gray-50 px-6 py-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-base font-semibold text-gray-900">{name}</div>
            <div className="text-xs text-gray-500">Обновлено: {new Date(updatedAt).toLocaleString()}</div>
          </div>
          <span
            className={`ml-4 mt-0.5 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${status === 'Свободен'
              ? 'bg-green-50 text-green-700 ring-green-600/20'
              : status === 'Загружен'
                ? 'bg-red-50 text-red-700 ring-red-600/20'
                : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
              }`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"></th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">РБ</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">РП</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item, idx) => (
                    <tr key={idx}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0 font-medium">
                        {item.title}
                      </td>
                      {'rb' in item && 'pl' in item ? (
                        <>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                            {typeof item.rb === 'object' ? (
                              <>
                                {item.rb.value}
                                {'change' in item.rb && formatChange(item.rb.change)}
                              </>
                            ) : (
                              item.rb
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                            {typeof item.pl === 'object' ? (
                              <>
                                {item.pl.value}
                                {'change' in item.pl && formatChange(item.pl.change)}
                              </>
                            ) : (
                              item.pl
                            )}
                          </td>
                        </>
                      ) : (
                        <td colSpan={2} className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {item.value}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
};

export default StatusCard;