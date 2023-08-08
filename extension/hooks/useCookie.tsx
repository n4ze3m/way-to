import React from "react"

export const useCookie = () => {
  const [cookie, setCookie] = React.useState(null)
  React.useEffect(() => {
    chrome.cookies.get(
      {
        url: process.env.PLASMO_PUBLIC_HOST,
        name: "wtw:token"
      },
      (cookie) => {
        setCookie(cookie?.value)
      }
    )
  }, [])

  const setCookieFunction = (value: string) => {
    chrome.cookies.set({
      url: process.env.PLASMO_PUBLIC_HOST,
      name: "wtw:token",
      value: value
    })

    setCookie(value)
  }

  return {
    cookie,
    setCookie: setCookieFunction
  }
}
