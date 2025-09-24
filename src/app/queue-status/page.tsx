"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import QueueStatusChecker from "@/components/organisms/QueueStatusPage";

export default async function QueueStatusPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <QueueStatusChecker />
      </div>
    </DashboardLayout>
  );
}
