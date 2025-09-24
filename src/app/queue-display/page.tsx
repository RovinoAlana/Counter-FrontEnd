"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import QueueDisplayPage from "@/components/organisms/QueueDisplayPage";

export default async function page() {
  return (
    <DashboardLayout>
      <QueueDisplayPage />
    </DashboardLayout>
  );
}
