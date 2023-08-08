import { useState } from "react"

import "./tailwind.css"
import { useCookie } from "~hooks/useCookie"

function IndexPopup() {
  const [data, setData] = useState("")

  const {
    cookie,
    setCookie
  } = useCookie()

  return (
    <div
      style={{
        // width and height 500
        width: 500,
        height: 500
      }}>
      {/* text bold */}
      <div className="text-2xl font-bold">Hello World</div>
      {/* text */}
      {cookie}
    </div>
  )
}

export default IndexPopup
