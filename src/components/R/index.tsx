import { useRouter } from "next/router";
import Heading from "./header";
import { RLinks } from "./links";

export default function RBody({ links }: { links: any }) {
  const router = useRouter();
  const { path } = router.query;
  return (
    <>
      <Heading />
      <RLinks path={path as string} links={links} />
    </>
  );
}
