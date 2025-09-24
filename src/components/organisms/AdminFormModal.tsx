"use client";
import Button from "@/components/atoms/Button";
import {
  IAdmin,
  ICreateAdminRequest,
  IUpdateAdminRequest,
} from "@/interfaces/services/auth.interface";
import {
  ICreateAdminSchema,
  VCreateAdminSchema,
  VUpdateAdminSchema,
} from "@/schemas/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../atoms/Input";
import {
  useCreateAdmin,
  useUpdateAdmin,
} from "@/services/auth/wrapper.service";

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin: IAdmin | null;
  mode: "create" | "edit";
  onSuccess: () => void;
}

const CreateAdminForm = ({
  onSubmit,
  isPending,
  onCancel,
}: {
  onSubmit: (data: ICreateAdminRequest) => void;
  isPending: boolean;
  onCancel: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAdminSchema>({
    resolver: yupResolver(VCreateAdminSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <Input
            {...register("username")}
            type="text"
            id="username"
            error={errors.username?.message}
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            {...register("email")}
            type="email"
            error={errors.email?.message}
            id="email"
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            {...register("name")}
            type="text"
            id="name"
            error={errors.name?.message}
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            {...register("password")}
            type="password"
            error={errors.password?.message}
            id="password"
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button
            variant="primary"
            type="submit"
            isLoading={isPending}
            className="w-full sm:w-auto sm:ml-3"
          >
            Create
          </Button>
          <Button
            variant="secondary"
            onClick={onCancel}
            className="mt-3 w-full sm:mt-0 sm:w-auto"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

const UpdateAdminForm = ({
  admin,
  onSubmit,
  isPending,
  onCancel,
}: {
  admin: IAdmin;
  onSubmit: (data: IUpdateAdminRequest) => void;
  isPending: boolean;
  onCancel: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VUpdateAdminSchema),
    defaultValues: {
      email: admin.email,
      name: admin.name,
      username: admin.username,
      password: "",
    },
  });

  const processUpdateData = (data: any) => {
    const updateData: IUpdateAdminRequest = {
      id: admin.id,
    };

    if (data.email) updateData.email = data.email;
    if (data.username) updateData.username = data.username;
    if (data.name) updateData.name = data.name;
    if (data.password) updateData.password = data.password;

    onSubmit(updateData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(processUpdateData)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("username")}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            type="text"
            id="name"
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password (leave empty to keep current)
          </label>
          <Input
            type="password"
            id="password"
            fullWidth
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button
            variant="primary"
            type="submit"
            isLoading={isPending}
            className="w-full sm:w-auto sm:ml-3"
          >
            Update
          </Button>
          <Button
            variant="secondary"
            onClick={onCancel}
            className="mt-3 w-full sm:mt-0 sm:w-auto"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default function AdminFormModal({
  isOpen,
  onClose,
  admin,
  mode,
  onSuccess,
}: AdminFormModalProps) {
  const { mutateAsync: createAdmin } = useCreateAdmin();
  const { mutateAsync: updateAdmin } = useUpdateAdmin();

  const handleCreateSubmit = async (data: ICreateAdminRequest) => {
    try {
      await createAdmin(data);
      onSuccess();
    } catch {}
  };

  const handleUpdateSubmit = async (data: IUpdateAdminRequest) => {
    try {
      await updateAdmin(data);
      onSuccess();
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-all -z-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {mode === "create" ? "Create New Admin" : "Edit Admin"}
                  </h3>
                  <div className="mt-6">
                    {mode === "create" ? (
                      <CreateAdminForm
                        onSubmit={handleCreateSubmit}
                        isPending={false}
                        onCancel={onClose}
                      />
                    ) : admin ? (
                      <UpdateAdminForm
                        admin={admin}
                        onSubmit={handleUpdateSubmit}
                        isPending={false}
                        onCancel={onClose}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
