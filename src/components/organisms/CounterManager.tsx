"use client";
import {
  ICounter,
  ICreateCounterRequest,
  IUpdateCounterRequest,
} from "@/interfaces/services/counter.interface";
import React, { useState } from "react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import CounterCard from "../molecules/CounterCard";
import CounterForm from "../molecules/CounterForm";

interface CounterManagerProps {
  className?: string;
}

const CounterManager: React.FC<CounterManagerProps> = ({ className }) => {
  const [isAddingCounter, setIsAddingCounter] = useState(false);
  const [editingCounter, setEditingCounter] = useState<ICounter | null>(null);
  const [selectedCounter, setSelectedCounter] = useState<ICounter | null>(null);

  const counters: ICounter[] = [];

  const handleSubmit = (
    data: ICreateCounterRequest | IUpdateCounterRequest
  ) => {};

  const handleCounterClick = (counter: ICounter) => {};

  const handleEditCounter = () => {};

  const handleDeleteCounter = () => {};

  return (
    <div className={className}>
      <Card className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Manajemen Counter
            </h2>
            <p className="text-gray-600 mt-1">Kelola counter/loket pelayanan</p>
          </div>
          {!isAddingCounter && !editingCounter && (
            <Button
              onClick={() => setIsAddingCounter(true)}
              leftIcon={<span className="material-symbols-outlined">add</span>}
            >
              Tambah Counter
            </Button>
          )}
        </div>
      </Card>

      {isAddingCounter || editingCounter ? (
        <Card>
          <h3 className="text-lg font-semibold mb-4">
            {editingCounter ? "Edit Counter" : "Tambah Counter Baru"}
          </h3>
          <CounterForm
            counter={editingCounter || undefined}
            onSubmit={handleSubmit}
            isLoading={false}
            isEditMode={!!editingCounter}
          />
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddingCounter(false);
                setEditingCounter(null);
              }}
            >
              Batal
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {selectedCounter && (
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                onClick={handleEditCounter}
                leftIcon={
                  <span className="material-symbols-outlined">edit</span>
                }
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteCounter}
                isLoading={false}
                leftIcon={
                  <span className="material-symbols-outlined">delete</span>
                }
              >
                Hapus
              </Button>
            </div>
          )}

          {counters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {counters.map((counter) => (
                <CounterCard
                  key={counter.id}
                  counter={counter}
                  isSelected={selectedCounter?.id === counter.id}
                  onClick={handleCounterClick}
                />
              ))}
            </div>
          ) : (
            <Card variant="outline" className="text-center py-8 text-gray-500">
              Belum ada counter. Klik 'Tambah Counter' untuk membuat counter
              baru.
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CounterManager;
