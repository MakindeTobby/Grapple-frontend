import { createContext, useState, useContext } from "react"

const ThemeContext = createContext(null);
export {ThemeContext}

const Theme = ({children}) =>{

    const checked = () =>{
      const jwt = localStorage.getItem("jwt")
      if (jwt) {
          return true
      }else{
          return false
      }
  }
  const user = checked()

  return (
    <ThemeContext.Provider value={{user}}>
        {children}
    </ThemeContext.Provider>
  )
}
 export const useAuth = () => useContext(ThemeContext)

export default Theme