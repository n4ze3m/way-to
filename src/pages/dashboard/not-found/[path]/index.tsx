import Head from "next/head";
import { DashboardHome } from "~/components/Dashboard/Home";
import DashboardNotFoundBody from "~/components/Dashboard/Not-Found";
import DashboardLayout from "~/components/Layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Head>
        <title>Not Found/ Way To Website</title>
      </Head>
      <DashboardNotFoundBody />
    </DashboardLayout>
  );
}
