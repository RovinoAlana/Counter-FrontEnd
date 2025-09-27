"use client";
import { FC, useState } from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import {
  useClaimQueue,
  useReleaseQueue,
} from "@/services/queue/wrapper.service";
import { useCounterAppStore } from "@/stores/global-states/counter/counter-app.store";
import toast from "react-hot-toast";

interface QueueTicketProps {
  className?: string;
}

const QueueTicketPage: FC<QueueTicketProps> = ({ className }) => {
  const [isClaimSuccess, setIsClaimSuccess] = useState(false);
  const { claimedQueue, setClaimedQueue } = useCounterAppStore();
  const { mutate: claimQueue } = useClaimQueue();
  const { mutate: releaseQueue } = useReleaseQueue();

  const handleClaim = () => {
    claimQueue(undefined, {
      onSuccess: (res) => {
        if (res.status === false || !res.data) {
          return setIsClaimSuccess(false);
        }
        setClaimedQueue({
          counterId: res.data.counterId,
          counterName: res.data.counterName,
          estimatedWaitTime: res.data.estimatedWaitTime,
          position: res.data.positionInQueue,
          queueNumber: res.data.queueNumber,
        });
        setIsClaimSuccess(true);
      },
    });
  };

  const handleReleaseQueue = () => {
    if (!claimedQueue?.counterId) return toast.error("No queue to release");
    if (!claimedQueue?.queueNumber) return toast.error("No queue to release");

    releaseQueue(
      {
        counter_id: claimedQueue.counterId,
        queue_number: claimedQueue.queueNumber,
      },
      {
        onSuccess: (res) => {
          if (res.status === false) return;
          setIsClaimSuccess(false);
          setClaimedQueue(null);
        },
      }
    );
  };

  return (
    <Card className={className}>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Sistem Antrian</h2>

        {!isClaimSuccess ? (
          <div className="flex flex-col items-center w-full">
            <p className="text-gray-600 mb-8 text-center">
              Ambil nomor antrian Anda dengan menekan tombol di bawah ini
            </p>
            <Button
              size="lg"
              fullWidth
              onClick={handleClaim}
              leftIcon={
                <span className="material-symbols-outlined">
                  confirmation_number
                </span>
              }
            >
              Ambil Nomor Antrian
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="text-gray-600 mb-2">Nomor Antrian Anda</div>
            <div className="text-5xl font-bold text-blue-600 mb-4">
              {claimedQueue?.queueNumber}
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 w-full">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Posisi:</span>
                <span className="font-medium">{claimedQueue?.position}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Estimasi waktu tunggu:</span>
                <span className="font-medium">
                  {claimedQueue?.estimatedWaitTime} menit
                </span>
              </div>
            </div>

            <Button variant="outline" onClick={handleReleaseQueue}>
              Ambil Nomor Baru
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default QueueTicketPage;
