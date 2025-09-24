"use client";
import { ICounter } from "@/interfaces/services/counter.interface";
import { IQueue } from "@/interfaces/services/queue.interface";
import React from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Select from "../atoms/Select";
import CurrentQueueDisplay from "../molecules/CurrentQueueDisplay";

interface CounterOperatorProps {
  className?: string;
}

const CounterOperator: React.FC<CounterOperatorProps> = ({ className }) => {
  const selectedCounter: ICounter | null = null;
  const currentQueue: IQueue | null = null;
  const activeCounters: ICounter[] = [];
  const handleCounterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};

  const handleNextQueue = () => {};

  const handleSkipQueue = () => {};

  return (
    <div className={className}>
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          OPERATOR COUNTER
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Panel untuk operator counter melayani antrian pengunjung
        </p>

        <Select
          label="Pilih Counter"
          fullWidth
          options={[
            { value: "", label: "Pilih Counter", disabled: true },
            ...activeCounters.map((counter) => ({
              value: counter.id.toString(),
              label: counter.name,
              disabled: false,
            })),
          ]}
          value={""}
          onChange={handleCounterChange}
        />
      </Card>

      {selectedCounter ? (
        <div className="space-y-6">
          <CurrentQueueDisplay
            counterName={""}
            queueNumber={1}
            status={"CLAIMED"}
          />

          <div className="flex gap-4">
            <Button
              fullWidth
              leftIcon={
                <span className="material-symbols-outlined">arrow_forward</span>
              }
              onClick={handleNextQueue}
              isLoading={false}
              disabled={false}
            >
              Panggil Antrian Berikutnya
            </Button>

            {currentQueue && (
              <Button
                fullWidth
                variant="danger"
                leftIcon={
                  <span className="material-symbols-outlined">skip_next</span>
                }
                onClick={handleSkipQueue}
                isLoading={false}
                disabled={false}
              >
                Lewati Antrian
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Card variant="outline" className="text-center py-8 text-gray-500">
          Silahkan pilih counter untuk mulai melayani antrian
        </Card>
      )}
    </div>
  );
};

export default CounterOperator;
