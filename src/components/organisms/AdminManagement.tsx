"use client";
import React, { useState } from "react";
import AdminTable from "@/components/organisms/AdminTable";
import AdminFormModal from "@/components/organisms/AdminFormModal";
import Button from "@/components/atoms/Button";
import { IAdmin } from "@/interfaces/services/auth.interface";
import { useGetAllAdmins } from "@/services/auth/wrapper.service";

export default function AdminManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdmin | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const {
    data: adminList,
    isLoading,
    refetch: refetchAdmin,
  } = useGetAllAdmins();

  const handleOpenCreateModal = () => {
    setSelectedAdmin(null);
    setMode("create");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (admin: IAdmin) => {
    setSelectedAdmin(admin);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    refetchAdmin();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Management</h1>
        <Button onClick={handleOpenCreateModal}>Add New Admin</Button>
      </div>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <AdminTable
          admins={adminList?.data ?? []}
          onEdit={handleOpenEditModal}
          onRefresh={() => refetchAdmin()}
        />
      )}

      <AdminFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        admin={selectedAdmin}
        mode={mode}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
