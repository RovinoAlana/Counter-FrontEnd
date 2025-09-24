"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import QueueTicketPage from "@/components/organisms/QueueTicketPage";

export default async function page() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <QueueTicketPage />
      </div>
    </DashboardLayout>
  );
}
