"use client";
import React from "react";
import Card from "../atoms/Card";
import { ICounter } from "@/interfaces/services/counter.interface";
import { cn } from "@/utils/classname.util";
import Badge from "../atoms/Badge";

interface CounterCardProps {
  counter: ICounter;
  isSelected?: boolean;
  onClick?: (counter: ICounter) => void;
  className?: string;
}

const CounterCard: React.FC<CounterCardProps> = ({
  counter,
  isSelected = false,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(counter);
    }
  };

  return (
    <Card
      variant="outline"
      className={cn(
        "cursor-pointer transition-all hover:border-blue-500 hover:shadow-sm",
        isSelected ? "border-blue-500 ring-2 ring-blue-200" : "",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {counter.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Queue: {counter.currentQueue} dari {counter.maxQueue}
          </p>
        </div>
        <Badge variant={counter.isActive ? "success" : "danger"}>
          {counter.isActive ? "Aktif" : "Non-aktif"}
        </Badge>
      </div>
    </Card>
  );
};

export default CounterCard;
