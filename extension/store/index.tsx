import { create } from "zustand"

// set cookie, setCookie

type CookieStore = {
  cookie: string | null
  setCookie: (value: string) => void
}

export const useCookieStore = create<CookieStore>((set) => ({
  cookie: null,
  setCookie: (value: string) => {
    set({ cookie: value })
  }
}))
