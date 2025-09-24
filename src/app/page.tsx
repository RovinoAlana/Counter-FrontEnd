"use server";
import DashboardLayout from "@/components/organisms/DashboardLayout";
import DashboardPage from "@/components/organisms/DashboardPage";

export default async function Home() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
