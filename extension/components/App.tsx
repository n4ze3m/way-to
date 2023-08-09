import { useCookie } from "~hooks/useCookie"

import Link from "./Link"
import Login from "./Login"

export default function App() {
  const { cookie } = useCookie()

  return <>{cookie ? <Link /> : <Login />}</>
}
