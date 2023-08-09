import React from "react"

export default function useCurrentTabUrl() {
  const [url, setUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0].url)
    })
  }, [])

  return url
}
