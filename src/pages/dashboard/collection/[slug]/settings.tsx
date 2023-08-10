import Head from "next/head";
import SettingsBody from "~/components/Dashboard/Collections/Settings";
import DashboardCollectionLayout from "~/components/Layout/DashboardCollection";

export default function DashboardSettingsPage() {
  return (
    <DashboardCollectionLayout>
      <Head>
        <title>Collection Settings/ Way To Website</title>
      </Head>
      <SettingsBody />
    </DashboardCollectionLayout>
  );
}
