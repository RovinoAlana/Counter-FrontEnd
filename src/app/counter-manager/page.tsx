"use server";
import CounterManager from "@/components/organisms/CounterManager";
import DashboardLayout from "@/components/organisms/DashboardLayout";

export default async function CounterManagerPage() {
  return (
    <DashboardLayout>
      <CounterManager />
    </DashboardLayout>
  );
}
