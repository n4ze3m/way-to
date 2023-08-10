import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";

export default function Navbar() {
  const user = useUser();

  return (
    <Popover>
      <div className="mx-auto max-w-7xl  p-6  px-4 sm:px-6">
        <nav
          className="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/" className="flex flex-shrink-0 items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt="WayToWebsite"
                />
                <span className="ml-1 text-xl font-bold">Way To Website</span>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>

          <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
            <span className="inline-flex rounded-md shadow">
              {user ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Login
                </Link>
              )}
            </span>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <img className="h-8 w-auto" src="/logo.png" alt="PageAssist" />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            {user ? (
              <Link
                href="/dashboard"
                className="m-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/auth"
                className="m-3 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </Link>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
