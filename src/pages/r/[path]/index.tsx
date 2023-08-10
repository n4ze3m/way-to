import { GetServerSideProps } from "next";
import Head from "next/head";
import RBody from "~/components/R";
import { prisma } from "~/server/db";
import { getUserAllCollections } from "~/server/lib/collection";

export default function RedirectPath({ links }: { links: any }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Redirecting...</title>
      </Head>
      <RBody 
      links={links}
      />
    </div>
  );
}

// server side props

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get access_token from cookie
  const access_token = context.req.cookies["wtw:token"];

  // get path from url
  const path = context.params?.path as string;

  const ids = await getUserAllCollections(prisma, access_token!);

  if (!ids) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const link = await prisma.collectionUrl.findMany({
    where: {
      collection_id: {
        in: ids,
      },
      to_path: path,
    },
    include: {
      Collection: true
    }
  });

  return {
    props: {
      links: link.map((l) => {
        return {
          id: l.id,
          to_path: l.to_path,
          url: l.url,
          collection_name: l.Collection.name,
        };
      }),
    },
  };
};
