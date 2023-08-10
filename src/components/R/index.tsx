import { useRouter } from "next/router";
import Heading from "./header";

export default function RBody({ links }: { links: any }) {
  const router = useRouter();
  const { path } = router.query;
  return (
    <>
      <Heading />
      <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Too Many
            {" "}
            <span className="bg-white-500 text-indigo-600">
            {`to/${path}`}
            </span>
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Please choose your destination below
          </p>
        </div>

        <div className="mt-10 w-full max-w-md">
          <div className="grid grid-cols-1 gap-4">
            {links.map((link: any) => (
              <a href={link.url} className="-space-y-px rounded-md shadow-sm">
                <div className="flex flex-col justify-start items-start rounded-md border border-gray-300 bg-white py-3 px-6 space-y-3">
                  <span
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    title={link.collection_name}
                  >
                    {link.collection_name}
                  </span>

                  <span 
                  title={link.url}
                  className="text-xs text-gray-500">{link.url}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
