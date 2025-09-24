"use client";
import {
  ICounter,
  ICreateCounterRequest,
  IUpdateCounterRequest,
} from "@/interfaces/services/counter.interface";
import { ICounterSchema, VCounterSchema } from "@/schemas/counter.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Switch from "../atoms/Switch";

interface CounterFormProps {
  counter?: ICounter;
  onSubmit: (data: ICreateCounterRequest | IUpdateCounterRequest) => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

const CounterForm: React.FC<CounterFormProps> = ({
  counter,
  onSubmit,
  isLoading = false,
  isEditMode = false,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICounterSchema>({
    resolver: yupResolver(VCounterSchema),
    defaultValues: {
      name: counter?.name || "",
      max_queue: counter?.maxQueue || 0,
      is_active: counter?.isActive ?? true,
    },
  });

  const handleFormSubmit = (data: ICounterSchema) => {
    if (isEditMode && counter) {
      onSubmit({
        ...data,
        id: counter.id,
      });
    } else {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Input
        label="Nama Counter"
        placeholder="Masukkan nama counter"
        fullWidth
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Antrian Maksimal"
        placeholder="Masukkan antrian maksimal"
        fullWidth
        {...register("max_queue")}
        error={errors.max_queue?.message}
      />

      <Controller
        control={control}
        name="is_active"
        render={({ field: { onChange, value, ref } }) => (
          <Switch
            label="Status Counter"
            description="Counter akan aktif dan dapat digunakan"
            checked={value}
            onChange={onChange}
          />
        )}
      />

      <div className="flex justify-end pt-4">
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {isEditMode ? "Update Counter" : "Buat Counter"}
        </Button>
      </div>
    </form>
  );
};

export default CounterForm;
