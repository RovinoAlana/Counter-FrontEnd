"use client";
import React, { useMemo } from "react";
import Card from "../atoms/Card";
import { cn } from "@/utils/classname.util";
import Badge from "../atoms/Badge";
import { EQueueStatus } from "@/interfaces/services/queue.interface";

interface CurrentQueueDisplayProps {
  queueNumber: number | null;
  counterName: string;
  status: EQueueStatus;
  className?: string;
}

const CurrentQueueDisplay: React.FC<CurrentQueueDisplayProps> = ({
  queueNumber,
  counterName,
  status,
  className,
}) => {
  const getStatusInfo = () => {
    switch (status) {
      case "CLAIMED":
        return {
          badgeVariant: "primary",
          badgeText: "Sedang Dilayani",
          cardBg: "!bg-blue-50 !border-blue-200",
        };
      case "CALLED":
        return {
          badgeVariant: "warning",
          badgeText: "Menunggu",
          cardBg: "!bg-yellow-50 border-yellow-200",
        };
      case "SERVED":
        return {
          badgeVariant: "success",
          badgeText: "Selesai",
          cardBg: "!bg-green-50 border-green-200",
        };
      case "SKIPPED":
        return {
          badgeVariant: "danger",
          badgeText: "Dilewati",
          cardBg: "!bg-red-50 border-red-200",
        };
      case "RELEASED":
      default:
        return {
          badgeVariant: "default",
          badgeText: "Dilepaskan",
          cardBg: "!bg-gray-50 border-gray-200",
        };
    }
  };

  const statusInfo = useMemo(getStatusInfo, [status]);

  return (
    <Card
      variant="outline"
      className={cn("transition-all", statusInfo.cardBg, className)}
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold text-gray-700">{counterName}</h2>
        {queueNumber ? (
          <div className="mt-4 mb-2 text-5xl font-bold text-gray-900">
            {queueNumber}
          </div>
        ) : (
          <div className="mt-4 mb-2 text-5xl font-bold text-gray-400">-</div>
        )}

        <Badge
          variant={statusInfo.badgeVariant as any}
          size="lg"
          className="mt-2"
        >
          {statusInfo.badgeText}
        </Badge>
      </div>
    </Card>
  );
};

export default CurrentQueueDisplay;
