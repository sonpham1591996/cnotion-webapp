import { FC } from "react";

interface CardStatsProps {
  statSubtitle: string;
  statTitle: string;
  statPercent?: string;
  statDescription?: string;
}

export const CardStats: FC<CardStatsProps> = ({
  statSubtitle,
  statTitle,
}: CardStatsProps) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words dark:bg-transparent rounded mb-6 xl:mb-0 shadow-lg">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="dark:text-white uppercase font-bold text-xs">
              {statSubtitle}
            </h5>
            <span className="font-semibold text-xl dark:text-white">
              {statTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
