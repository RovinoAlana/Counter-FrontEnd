import React from "react";
import Card from "../atoms/Card";
import { ICurrentQueuesResponse } from "@/interfaces/services/queue.interface";
import CurrentQueueDisplay from "../molecules/CurrentQueueDisplay";

interface QueueDisplayBoardProps {
  className?: string;
}

const counters: ICurrentQueuesResponse[] = [
  {
    id: 1,
    isActive: true,
    name: "Counter 1",
    currentQueue: 5,
    status: "CLAIMED",
  },
  {
    id: 2,
    isActive: true,
    name: "Counter 2",
    currentQueue: 8,
    status: "CALLED",
  },
  {
    id: 3,
    isActive: false,
    name: "Counter 3",
    currentQueue: 0,
    status: "RELEASED",
  },
  {
    id: 4,
    isActive: true,
    name: "Counter 4",
    currentQueue: 12,
    status: "SERVED",
  },
];

const QueueDisplayPage: React.FC<QueueDisplayBoardProps> = ({ className }) => {
  return (
    <div className={className}>
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          PAPAN INFORMASI ANTRIAN
        </h2>
        <p className="text-center text-gray-600">
          Berikut status antrian yang sedang dilayani pada masing-masing counter
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {counters
          .filter(
            (counter: ICurrentQueuesResponse) => counter?.isActive === true
          )
          .map((counter: ICurrentQueuesResponse) => {
            return (
              <CurrentQueueDisplay
                key={counter.id}
                counterName={counter.name || "Counter"}
                queueNumber={counter.currentQueue}
                status={counter.status || "RELEASED"}
              />
            );
          })}

        {counters.filter(
          (counter: ICurrentQueuesResponse) => counter?.isActive === true
        ).length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500">
            Tidak ada counter yang aktif saat ini.
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueDisplayPage;
