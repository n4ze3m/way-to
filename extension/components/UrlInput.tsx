import * as antd from "antd"

export const UrlInput = (props: antd.InputProps) => {
  return (
    <div className="mt-1 flex rounded-md shadow-sm">
      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
        to/
      </span>
      <antd.Input
        {...props}
        className="block w-full min-w-0 flex-grow rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
      />
    </div>
  )
}
