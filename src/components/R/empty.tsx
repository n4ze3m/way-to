export const REmpty = ({ path }: { path: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          No Paths Found for{" "}
          <span className="bg-white-500 text-indigo-600">{`to/${path}`}</span>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Please add a path to your collection
        </p>
      </div>

      <div className="mt-10 w-full max-w-md">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Add Path to Collection
        </button>
      </div>
    </div>
  );
};
