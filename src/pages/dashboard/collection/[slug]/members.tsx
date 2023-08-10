import Head from "next/head";
import MembersBody from "~/components/Dashboard/Collections/Members";
import DashboardCollectionLayout from "~/components/Layout/DashboardCollection";

export default function DashboardMembersPage() {
  return (
    <DashboardCollectionLayout>
      <Head>
        <title>Collection Members / Way To Website</title>
      </Head>
      <MembersBody />
    </DashboardCollectionLayout>
  );
}
