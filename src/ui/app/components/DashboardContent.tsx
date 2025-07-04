import StatusCard from "./StatusCard";

const borderCheckpoints = [
  {
    id: 1,
    name: 'Брест — Тересполь',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/tuple.svg',
    status: 'Загружен',
    updatedAt: '2025-07-02T17:00:00+02:00',
    data: [
      { title: 'Автобусы', rb: { value: 3, change: -2 }, pl: { value: 2, change: 0 } },
      { title: 'Автомобили', rb: { value: 10, change: 2 }, pl: { value: 8, change: -1 } },
      { title: 'Время прохождения', rb: '2 ч', pl: '3 ч' },
      { title: 'Стоимость подсадки', rb: '10 BYN', pl: '5 EUR' },
      { title: 'Переносы автобусов', value: 4 },
    ],
  },
  {
    id: 2,
    name: 'Каменный Лог — Мядининкай',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/savvycal.svg',
    status: 'Свободен',
    updatedAt: '2025-07-02T17:05:00+02:00',
    data: [
      { title: 'Автобусы', rb: { value: 1, change: 0 }, pl: { value: 1, change: 0 } },
      { title: 'Автомобили', rb: { value: 4, change: -1 }, pl: { value: 5, change: 1 } },
      { title: 'Время прохождения', rb: '1 ч', pl: '1.5 ч' },
      { title: 'Стоимость подсадки', rb: '12 BYN', pl: '4 EUR' },
      { title: 'Переносы автобусов', value: 1 },
    ],
  },
  {
    id: 3,
    name: 'Бенякони — Шальчининкай',
    imageUrl: 'https://tailwindcss.com/plus-assets/img/logos/48x48/reform.svg',
    status: 'Средняя загрузка',
    updatedAt: '2025-07-02T17:10:00+02:00',
    data: [
      { title: 'Автобусы', rb: { value: 2, change: 0 }, pl: { value: 1, change: -1 } },
      { title: 'Автомобили', rb: { value: 7, change: 1 }, pl: { value: 6, change: 0 } },
      { title: 'Время прохождения', rb: '1.5 ч', pl: '2 ч' },
      { title: 'Стоимость подсадки', rb: '9 BYN', pl: '3.5 EUR' },
      { title: 'Переносы автобусов', value: 2 },
    ],
  }
];

export default function DashboardContent() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {borderCheckpoints.map((checkpoint) => (
        <StatusCard
          id={checkpoint.id}
          name={checkpoint.name}
          status={checkpoint.status}
          updatedAt={checkpoint.updatedAt}
          data={checkpoint.data}
        />
      ))}
    </ul>
  );
}