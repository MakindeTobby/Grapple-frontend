import jwtDecode from "jwt-decode"
import { createContext, useState, useContext } from "react"
import setAuthToken from "../Auth/Util/setAuthToken"
let logUser

if (localStorage.jwt) {
  const jwt = localStorage.getItem("jwt")
  setAuthToken(jwt)
  logUser = jwtDecode(jwt)
}


const ThemeContext = createContext(null);
export { ThemeContext }

const Theme = ({ children }) => {
  const [docUser, setDocUser] = useState(logUser)


  const checked = () => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      return true
    } else {
      return false
    }
  }
  const user = checked()

  return (
    <ThemeContext.Provider value={{ user, docUser }}>
      {children}
    </ThemeContext.Provider>
  )
}
export const useAuth = () => useContext(ThemeContext)

export default Theme