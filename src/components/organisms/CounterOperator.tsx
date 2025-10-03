"use client";
import { ICounter } from "@/interfaces/services/counter.interface";
import { ICurrentQueuesResponse } from "@/interfaces/services/queue.interface";
import { useGetActiveCounters } from "@/services/counter/wrapper.service";
import { useNextQueue, useSkipQueue, useGetCurrentQueues } from "@/services/queue/wrapper.service";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Select from "../atoms/Select";
import CurrentQueueDisplay from "../molecules/CurrentQueueDisplay";

interface CounterOperatorProps {
  className?: string;
}

const CounterOperator: React.FC<CounterOperatorProps> = ({ className }) => {
  const [selectedCounterId, setSelectedCounterId] = useState<string>("");
  const [selectedCounter, setSelectedCounter] = useState<ICounter | null>(null);
  
  const queryClient = useQueryClient();

  const { 
    data: countersData, 
    isLoading: isCountersLoading,
    error: countersError,
    refetch: refetchCounters
  } = useGetActiveCounters();

  const { 
    data: currentQueuesData,
    isLoading: isCurrentQueuesLoading,
    refetch: refetchCurrentQueues
  } = useGetCurrentQueues();

  const nextQueueMutation = useNextQueue();
  const skipQueueMutation = useSkipQueue();

  const activeCounters = countersData?.data || [];

  const currentCounterData = currentQueuesData?.data?.find(
    (counterData: ICurrentQueuesResponse) => counterData.id === parseInt(selectedCounterId)
  ) || null;

  const handleCounterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const counterId = e.target.value;
    setSelectedCounterId(counterId);
    
    const counter = activeCounters.find(c => c.id.toString() === counterId);
    setSelectedCounter(counter || null);
  };

  const handleNextQueue = () => {
    if (!selectedCounter) return;

    const nextData = {
      counter_id: selectedCounter.id
    };

    nextQueueMutation.mutate(nextData, {
      onSuccess: (response) => {
        if (response?.status === true) {
          queryClient.invalidateQueries({ queryKey: ["queues", "current"] });
          queryClient.invalidateQueries({ queryKey: ["queues", "all"] });
          queryClient.invalidateQueries({ queryKey: ["queues", "metrics"] });
          
          setTimeout(() => {
            refetchCurrentQueues();
          }, 500);
        }
      },
      onError: (error) => {
        console.error("Next queue error:", error);
      }
    });
  };

  const handleSkipQueue = () => {
    if (!selectedCounter || !currentCounterData) return;

    const skipData = {
      queue_number: currentCounterData.currentQueue,
      counter_id: selectedCounter.id
    };

    skipQueueMutation.mutate(skipData, {
      onSuccess: (response) => {
        if (response?.status === true) {
          queryClient.invalidateQueries({ queryKey: ["queues", "current"] });
          queryClient.invalidateQueries({ queryKey: ["queues", "all"] });
          queryClient.invalidateQueries({ queryKey: ["queues", "metrics"] });
          
          setTimeout(() => {
            refetchCurrentQueues();
          }, 500);
        }
      },
      onError: (error) => {
        console.error("Skip queue error:", error);
      }
    });
  };

  const handleRefresh = () => {
    refetchCounters();
    refetchCurrentQueues();
  };

  useEffect(() => {
    if (!selectedCounter) return;

    const interval = setInterval(() => {
      refetchCurrentQueues();
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedCounter, refetchCurrentQueues]);

  const isLoading = isCountersLoading || isCurrentQueuesLoading;
  const isMutationLoading = nextQueueMutation.isPending || skipQueueMutation.isPending;

  return (
    <div className={className}>
      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            OPERATOR COUNTER
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            leftIcon={
              isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              ) : (
                <span className="material-symbols-outlined text-sm">refresh</span>
              )
            }
          >
            {isLoading ? "Memuat..." : "Refresh"}
          </Button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Panel untuk operator counter melayani antrian pengunjung
        </p>

        {countersError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">
              Gagal memuat data counter: {countersError.message}
            </p>
          </div>
        )}

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
          value={selectedCounterId}
          onChange={handleCounterChange}
          disabled={isLoading || activeCounters.length === 0}
        />

        {activeCounters.length === 0 && !isLoading && !countersError && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Tidak ada counter yang aktif
          </p>
        )}
      </Card>

      {selectedCounter ? (
        <div className="space-y-6">
          <CurrentQueueDisplay
            counterName={selectedCounter.name}
            queueNumber={currentCounterData?.currentQueue || 0}
            status={currentCounterData?.status || "CLAIMED"}
          />

          <div className="flex gap-4">
            <Button
              fullWidth
              leftIcon={
                nextQueueMutation.isPending ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <span className="material-symbols-outlined">arrow_forward</span>
                )
              }
              onClick={handleNextQueue}
              isLoading={nextQueueMutation.isPending}
              disabled={isMutationLoading}
            >
              {nextQueueMutation.isPending ? "Memproses..." : "Panggil Antrian Berikutnya"}
            </Button>

            {currentCounterData && currentCounterData.currentQueue > 0 && currentCounterData.status === "CALLED" && (
              <Button
                fullWidth
                variant="danger"
                leftIcon={
                  skipQueueMutation.isPending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <span className="material-symbols-outlined">skip_next</span>
                  )
                }
                onClick={handleSkipQueue}
                isLoading={skipQueueMutation.isPending}
                disabled={isMutationLoading}
              >
                {skipQueueMutation.isPending ? "Memproses..." : "Lewati Antrian"}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Card variant="outline" className="text-center py-8 text-gray-500">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span>Memuat data counter...</span>
            </div>
          ) : activeCounters.length === 0 ? (
            "Tidak ada counter yang aktif saat ini"
          ) : (
            "Silahkan pilih counter untuk mulai melayani antrian"
          )}
        </Card>
      )}
    </div>
  );
};

export default CounterOperator;