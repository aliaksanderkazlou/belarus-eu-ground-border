import { HistoryRange } from "~/api/historyPoints";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { CheckpointBase } from "~/api/latestStatuses";

interface DashboardFiltersProps {
  selectedRangeOption: string;
  rangeOptions: string[];
  selectedCheckpoint: string;
  checkpoints: CheckpointBase[];
  onRangeChange: (value: string) => void;
  onCheckpointChange: (value: string) => void;
}

const rangeOptionsTitlesMap: Record<HistoryRange, string> = {
  [HistoryRange.Today]: "Сегодня",
  [HistoryRange.ThreeDays]: "Последние 3 дня",
  [HistoryRange.FiveDays]: "Последние 5 дней",
  [HistoryRange.TenDays]: "Последние 10 дней",
  [HistoryRange.Month]: "Последний месяц",
  [HistoryRange.Year]: "Последний год",
  [HistoryRange.AllTime]: "Всё время"
};

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  selectedRangeOption,
  rangeOptions,
  selectedCheckpoint,
  checkpoints,
  onRangeChange,
  onCheckpointChange
}) => {
  return (
    <div className="flex gap-4 flex-wrap sm:justify-end justify-start w-full">

      <Select value={selectedRangeOption} onValueChange={onRangeChange}>
        <SelectTrigger
          className="w-[180px] rounded-lg"
          aria-label="Выбрать диапазон"
        >
          <SelectValue placeholder="Диапазон" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {rangeOptions.map((range) => (
            <SelectItem key={range} value={range} className="rounded-lg">
              {rangeOptionsTitlesMap[range as HistoryRange] ?? range}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedCheckpoint} onValueChange={onCheckpointChange}>
        <SelectTrigger
          className="w-[150px] rounded-lg"
          aria-label="Выбрать пункт пропуска"
        >
          <SelectValue placeholder="Пункт пропуска" />
        </SelectTrigger>
        <SelectContent className="rounded-xl max-h-[300px] overflow-auto">
          {checkpoints.map((cp) => (
            <SelectItem key={cp.name} value={cp.name} className="rounded-lg">
              {cp.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardFilters;