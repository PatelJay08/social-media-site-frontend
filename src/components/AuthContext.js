import { useNavigate } from "react-router-dom"
import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userId,setUserId] = useState(null)

    const [followers,setFollowers] = useState(0)
    const [followings,setFollowings] = useState(0)

    function login(userId){
        setUserId(userId)
        setIsAuthenticated(true)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login,setFollowers,setFollowings,followers,followings }}>
            {children}
        </AuthContext.Provider>
    )
}