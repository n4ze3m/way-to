import { useRouter } from "next/router";
import React from "react";
import BreadCrumbs from "~/components/Common/BreadCrumbs";
import { Loading } from "~/components/Common/Loading";
import { api } from "~/utils/api";
import { LinksCard } from "./LinksCard";
import { Skeleton } from "antd";

export const LinkList = () => {
  const router = useRouter();

  const { slug } = router.query as {
    slug: string;
  };
  const { status, data } = api.collection.getCollectionById.useQuery({
    id: slug,
  });

  React.useEffect(() => {
    if (status === "error") {
      router.push("/404");
    }
  }, [status, data]);

  return (
    <div className="mt-6">
      {status === "loading" && (
        <div>
            <Loading gridCount={2} />
        </div>
      )}
      {status === "success" && (
        <div>
          {/* <BreadCrumbs
            pages={[
              {
                name: data.name,
                href: `/dashboard/collections/${data.id}`,
              },
            ]}
          /> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.url.map((item) => (
              <LinksCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
