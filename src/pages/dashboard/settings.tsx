import Head from "next/head";
import { DashboardHome } from "~/components/Dashboard/Home";
import DashboardSettingsBody from "~/components/Dashboard/Settings";
import DashboardLayout from "~/components/Layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard / Way To Website</title>
      </Head>
      <DashboardSettingsBody />
    </DashboardLayout>
  );
}
