"use client";
import Button from "@/components/atoms/Button";
import { IAdmin } from "@/interfaces/services/auth.interface";
import {
  useDeleteAdmin,
  useToggleAdminStatus,
} from "@/services/auth/wrapper.service";
import { format } from "date-fns";
import React, { useState } from "react";

interface AdminTableProps {
  admins: IAdmin[];
  onEdit: (admin: IAdmin) => void;
  onRefresh: () => void;
}

export default function AdminTable({
  admins,
  onEdit,
  onRefresh,
}: AdminTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleStatus = useToggleAdminStatus();
  const deleteAdmin = useDeleteAdmin();

  const handleToggleStatus = async (id: number) => {
    toggleStatus.mutate(
      { id: id },
      {
        onSuccess: (res) => {
          if (res.error) {
            return;
          }
          onRefresh();
        },
      }
    );
  };

  const handleDelete = async (id: number) => {
    deleteAdmin.mutate(id, {
      onSuccess: (res) => {
        if (res.error) {
          // Handle error (e.g., show a toast notification)
          return;
        }

        onRefresh();
      },
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!admins || admins.length === 0) {
    return <div className="text-center py-8">No admin users found</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {admins.map((admin) => (
            <React.Fragment key={admin.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {admin.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{admin.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{admin.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Admin
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {admin.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleExpand(admin.id)}
                      rightIcon={
                        <span className="material-symbols-outlined text-base">
                          {expandedId === admin.id
                            ? "expand_less"
                            : "expand_more"}
                        </span>
                      }
                    >
                      Details
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => onEdit(admin)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant={admin.isActive ? "danger" : "secondary"}
                      onClick={() => handleToggleStatus(admin.id)}
                      isLoading={false}
                    >
                      {admin.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(admin.id)}
                      isLoading={false}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
              {expandedId === admin.id && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 bg-gray-50">
                    <div className="text-sm text-gray-500">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p>
                            <strong>Created:</strong>{" "}
                            {format(new Date(admin.createdAt), "PPpp")}
                          </p>
                          <p>
                            <strong>Updated:</strong>{" "}
                            {format(new Date(admin.updatedAt), "PPpp")}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>ID:</strong> {admin.id}
                          </p>
                          <p>
                            <strong>Deleted:</strong>{" "}
                            {admin.deletedAt
                              ? format(new Date(admin.deletedAt), "PPpp")
                              : "No"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
