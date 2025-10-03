"use client";
import { IQueue } from "@/interfaces/services/queue.interface";
import { useSearchQueue, useReleaseQueue, useGetAllQueues } from "@/services/queue/wrapper.service";
import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import QueueCard from "../molecules/QueueCard";
import ReleaseQueueForm from "../molecules/ReleaseQueueForm";

interface QueueStatusCheckerProps {
  className?: string;
}

const QueueStatusChecker: React.FC<QueueStatusCheckerProps> = ({
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queueNumber, setQueueNumber] = useState("");
  const [queueDetails, setQueueDetails] = useState<IQueue[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const queryClient = useQueryClient();

  const { 
    data: allQueuesResult, 
    isLoading: isAllQueuesLoading,
    error: allQueuesError,
    refetch: refetchAllQueues
  } = useGetAllQueues();

  const releaseQueueMutation = useReleaseQueue();

  const handleSubmit = (data: { queueNumber: string }) => {
    const searchNumber = data.queueNumber.trim();
    if (!searchNumber) return;
    
    setQueueNumber(searchNumber);
    setSearchQuery(searchNumber);
    setNotFound(false);
    setSearchAttempted(true);
  };

  // Handle search results
  useEffect(() => {
    if (searchQuery && allQueuesResult && !isAllQueuesLoading) {
      console.log("Searching in local data for:", searchQuery);
      
      const searchNumber = parseInt(searchQuery);
      
      if (!isNaN(searchNumber)) {
        const foundQueues = allQueuesResult.data?.filter((queue: IQueue) => 
          queue.queueNumber === searchNumber
        ) || [];

        console.log("Found queues:", foundQueues);

        const displayableStatuses = ["CLAIMED", "CALLED", "SERVED", "SKIPPED"];
        const displayableQueues = foundQueues.filter(queue => 
          displayableStatuses.includes(queue.status)
        );

        if (displayableQueues.length > 0) {
          setQueueDetails(displayableQueues);
          setNotFound(false);
        } else {
          setQueueDetails([]);
          setNotFound(true);
        }
      } else {
        const foundQueues = allQueuesResult.data?.filter((queue: IQueue) => 
          queue.counter?.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

        const displayableStatuses = ["CLAIMED", "CALLED", "SERVED", "SKIPPED"];
        const displayableQueues = foundQueues.filter(queue => 
          displayableStatuses.includes(queue.status)
        );

        if (displayableQueues.length > 0) {
          setQueueDetails(displayableQueues);
          setNotFound(false);
        } else {
          setQueueDetails([]);
          setNotFound(true);
        }
      }
    }
  }, [searchQuery, allQueuesResult, isAllQueuesLoading]);

  const handleReleaseQueue = (queue: IQueue) => {
    const releaseData = {
      queue_number: queue.queueNumber,
      counter_id: queue.counter?.id || 0
    };

    console.log("Releasing queue with data:", releaseData);

    releaseQueueMutation.mutate(releaseData, {
      onSuccess: (response) => {
        console.log("Release queue success response:", response);
        
        // Hanya reset state jika berhasil, tidak perlu cek response.status
        // karena sudah dihandle di wrapper
        queryClient.invalidateQueries({ queryKey: ["queues", "all"] });
        queryClient.invalidateQueries({ queryKey: ["queues", "current"] });
        
        // Reset state
        setSearchQuery("");
        setQueueNumber("");
        setQueueDetails([]);
        setNotFound(false);
        setSearchAttempted(false);
        
        // Refresh data
        setTimeout(() => {
          refetchAllQueues();
        }, 500);
      },
      onError: (error) => {
        console.error("Release queue component error:", error);
        // Error sudah dihandle di wrapper, tidak perlu action tambahan
      }
    });
  };

  // Get all queues untuk display awal
  const getAllQueues = (): IQueue[] => {
    if (!allQueuesResult || allQueuesResult.status !== true || !allQueuesResult.data) {
      return [];
    }

    return allQueuesResult.data
      .filter((queue: IQueue) => {
        const displayableStatuses = ["CLAIMED", "CALLED", "SERVED", "SKIPPED"];
        return displayableStatuses.includes(queue.status);
      })
      .slice(0, 20);
  };

  const allQueues = getAllQueues();
  const isLoading = isAllQueuesLoading;

  return (
    <div className={className}>
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Cek Status Antrian
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Masukkan nomor antrian Anda untuk memeriksa status
        </p>

        <ReleaseQueueForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading} 
        />
      </Card>

      {/* Error State untuk All Queues */}
      {allQueuesError && !searchAttempted && (
        <Card variant="outline" className="text-center py-6 text-red-500 border-red-200 mb-4">
          <span className="material-symbols-outlined text-red-500 text-3xl mb-2">
            error
          </span>
          <p className="font-medium">Gagal memuat daftar antrian</p>
          <p className="text-sm text-red-400 mt-1">
            {allQueuesError.message || "Silakan refresh halaman"}
          </p>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card variant="outline" className="text-center py-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">
              {searchQuery ? `Mencari antrian ${queueNumber}...` : "Memuat daftar antrian..."}
            </span>
          </div>
        </Card>
      )}

      {/* Search Results */}
      {!isLoading && searchAttempted && (
        <>
          {/* Queue Found */}
          {queueDetails.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Hasil Pencarian ({queueDetails.length} ditemukan):
              </h3>
              <div className="space-y-3">
                {queueDetails.map((queue: IQueue) => (
                  <div key={`${queue.id}-${queue.queueNumber}-${queue.counter?.id || 'no-counter'}`} className="space-y-3">
                    <QueueCard queue={queue} />
                    {queue.status === "CLAIMED" && (
                      <Button
                        variant="danger"
                        fullWidth
                        onClick={() => handleReleaseQueue(queue)}
                        disabled={releaseQueueMutation.isPending}
                        leftIcon={
                          releaseQueueMutation.isPending ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          ) : (
                            <span className="material-symbols-outlined">exit_to_app</span>
                          )
                        }
                      >
                        {releaseQueueMutation.isPending ? "Memproses..." : `Lepaskan Antrian ${queue.queueNumber}`}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Queue Not Found */}
          {notFound && queueNumber && (
            <Card variant="outline" className="text-center py-6 text-gray-500">
              <span className="material-symbols-outlined text-yellow-500 text-3xl mb-2">
                search_off
              </span>
              <p>
                Nomor antrian <strong className="font-semibold">{queueNumber}</strong> tidak ditemukan.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Pastikan nomor antrian sudah benar
              </p>
            </Card>
          )}
        </>
      )}

      {/* All Queues Display - Tampilkan ketika belum search */}
      {!isLoading && !searchAttempted && allQueues.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Antrian yang Sedang Aktif:</h3>
            <span className="text-sm text-gray-500">{allQueues.length} antrian</span>
          </div>
          <div className="space-y-3">
            {allQueues.map((queue: IQueue) => (
              <QueueCard 
                key={`${queue.id}-${queue.queueNumber}-${queue.counter?.id || 'no-counter'}`} 
                queue={queue} 
              />
            ))}
          </div>
          {allQueues.length >= 20 && (
            <p className="text-sm text-gray-400 text-center">
              Menampilkan 20 antrian terbaru
            </p>
          )}
        </div>
      )}

      {/* Empty State - ketika tidak ada antrian aktif */}
      {!isLoading && !searchAttempted && allQueues.length === 0 && !allQueuesError && (
        <Card variant="outline" className="text-center py-8 text-gray-400">
          <span className="material-symbols-outlined text-4xl mb-3">
            search
          </span>
          <p>Masukkan nomor antrian untuk memeriksa status</p>
          <p className="text-sm text-gray-400 mt-2">Tidak ada antrian aktif saat ini</p>
        </Card>
      )}
    </div>
  );
};

export default QueueStatusChecker;