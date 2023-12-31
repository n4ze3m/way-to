import Head from "next/head";
import { LinksBody } from "~/components/Dashboard/Collections/Links";
import DashboardCollectionLayout from "~/components/Layout/DashboardCollection";

export default function DashboardPage() {
  return (
    <DashboardCollectionLayout>
      <Head>
        <title>Collection Mangement / Way To Website</title>
      </Head>
      <LinksBody />
    </DashboardCollectionLayout>
  );
}
