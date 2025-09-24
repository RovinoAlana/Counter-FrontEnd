"use client";
import { IQueue } from "@/interfaces/services/queue.interface";
import React, { useState } from "react";
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
  const [queueNumber, setQueueNumber] = useState("");
  const [queueDetails, setQueueDetails] = useState<IQueue | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = () => {};

  const handleReleaseQueue = () => {};

  return (
    <div className={className}>
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Cek Status Antrian
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Masukkan nomor antrian Anda untuk memeriksa status
        </p>

        <ReleaseQueueForm onSubmit={handleSubmit} isLoading={false} />
      </Card>

      {queueDetails ? (
        <div className="space-y-4">
          <QueueCard queue={queueDetails} />

          {queueDetails.status === "CLAIMED" && (
            <Button
              variant="danger"
              fullWidth
              onClick={handleReleaseQueue}
              leftIcon={
                <span className="material-symbols-outlined">exit_to_app</span>
              }
            >
              Lepaskan Nomor Antrian
            </Button>
          )}
        </div>
      ) : (
        notFound &&
        queueNumber && (
          <Card variant="outline" className="text-center py-6 text-gray-500">
            Nomor antrian <strong>{queueNumber}</strong> tidak ditemukan.
          </Card>
        )
      )}
    </div>
  );
};

export default QueueStatusChecker;
