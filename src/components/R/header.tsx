import Link from "next/link";

export default function Heading() {
  return (
    <div className="relative bg-white">
      <div className="flex items-center md:justify-between p-6 md:space-x-10 ">
        <div>
          <Link href="/" className="flex flex-shrink-0 items-center px-4">
            <img className="h-8 w-auto" src="/logo.png" alt="WayToWebsite" />
            <span className="ml-1 text-xl font-bold">Way To Website</span>
          </Link>
        </div>
        <div className="-my-2 -mr-2">
          <Link
            href="/dashboard"
            className="relative   rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-expanded="false"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
