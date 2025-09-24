"use client";
<<<<<<< HEAD

=======
>>>>>>> 694165616118d095623a75c3711c15f895207861
import React, { useMemo } from "react";
import Card from "../atoms/Card";
import { cn } from "@/utils/classname.util";
import Badge from "../atoms/Badge";
<<<<<<< HEAD
import { EQueueStatus } from "@/interfaces/service/queue.interface";
=======
import { EQueueStatus } from "@/interfaces/services/queue.interface";
>>>>>>> 694165616118d095623a75c3711c15f895207861

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
<<<<<<< HEAD
          cardBg: "bg-blue-50 border-blue-200",
=======
          cardBg: "!bg-blue-50 !border-blue-200",
>>>>>>> 694165616118d095623a75c3711c15f895207861
        };
      case "CALLED":
        return {
          badgeVariant: "warning",
          badgeText: "Menunggu",
<<<<<<< HEAD
          cardBg: "bg-yellow-50 border-yellow-200",
=======
          cardBg: "!bg-yellow-50 border-yellow-200",
>>>>>>> 694165616118d095623a75c3711c15f895207861
        };
      case "SERVED":
        return {
          badgeVariant: "success",
          badgeText: "Selesai",
<<<<<<< HEAD
          cardBg: "bg-green-50 border-green-200",
=======
          cardBg: "!bg-green-50 border-green-200",
>>>>>>> 694165616118d095623a75c3711c15f895207861
        };
      case "SKIPPED":
        return {
          badgeVariant: "danger",
          badgeText: "Dilewati",
<<<<<<< HEAD
          cardBg: "bg-red-50 border-red-200",
=======
          cardBg: "!bg-red-50 border-red-200",
>>>>>>> 694165616118d095623a75c3711c15f895207861
        };
      case "RELEASED":
      default:
        return {
          badgeVariant: "default",
          badgeText: "Dilepaskan",
<<<<<<< HEAD
          cardBg: "bg-gray-50 border-gray-200",
=======
          cardBg: "!bg-gray-50 border-gray-200",
>>>>>>> 694165616118d095623a75c3711c15f895207861
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
<<<<<<< HEAD
=======

>>>>>>> 694165616118d095623a75c3711c15f895207861
        {queueNumber ? (
          <div className="mt-4 mb-2 text-5xl font-bold text-gray-900">
            {queueNumber}
          </div>
        ) : (
          <div className="mt-4 mb-2 text-5xl font-bold text-gray-400">-</div>
        )}

        <Badge
<<<<<<< HEAD
          variant={statusInfo.badgeVariant as
            | "primary"
            | "warning"
            | "success"
            | "danger"
            | "default"
          }
=======
          variant={statusInfo.badgeVariant as any}
>>>>>>> 694165616118d095623a75c3711c15f895207861
          size="lg"
          className="mt-2"
        >
          {statusInfo.badgeText}
        </Badge>
      </div>
    </Card>
  );
};

<<<<<<< HEAD
export default CurrentQueueDisplay;
=======
export default CurrentQueueDisplay;
>>>>>>> 694165616118d095623a75c3711c15f895207861
