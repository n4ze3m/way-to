import "~components/tailwind.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd"

import App from "~components/App"

const queryClient = new QueryClient()

function IndexPopup() {
  return (
    <div
      style={{
        width: 600,
        height: 600
      }}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: `Poppins !important;`
            }
          }}>
          <App />
        </ConfigProvider>
      </QueryClientProvider>
    </div>
  )
}

export default IndexPopup
