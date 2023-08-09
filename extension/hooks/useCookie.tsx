import React from "react"

import { useCookieStore } from "~store"

export const useCookie = () => {
  const { cookie, setCookie } = useCookieStore()
  
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

  const removeCookie = () => {
    chrome.cookies.remove({
      url: process.env.PLASMO_PUBLIC_HOST,
      name: "wtw:token"
    })
    setCookie(null)
  }

  return {
    cookie,
    setCookie: setCookieFunction,
    removeCookie
  }
}
