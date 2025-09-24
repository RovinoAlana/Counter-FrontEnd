"use server";
import CounterOperator from "@/components/organisms/CounterOperator";
import DashboardLayout from "@/components/organisms/DashboardLayout";

export default async function CounterOperatorPage() {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <CounterOperator />
      </div>
    </DashboardLayout>
  );
}
