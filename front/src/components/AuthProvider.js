import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext
} from 'react'
import useUser from '../hooks/useUser'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthContext = createContext({
  user: null,
  loading: false,
  loadingInit: true,
  error: null,
  loginUser: null,
  registerUser: null,
  logoutUser: null
})

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingInit, setLoadingInit] = useState(true)

  const history = useNavigate()
  const location = useLocation()

  const { getCurrentUser, login, register, logout } = useUser()

  useEffect(() => {
    if (error) setError(null)
  }, [location.pathname])

  useEffect(() => {
    (async () => {
      if (!loading || !loadingInit) {
        const user = await getCurrentUser()
          .catch(err => console.log(err))

        setUser(user || null)
        setLoadingInit(false)
      }
    })()
  }, [])

  const registerUser = async d => {
    setLoading(true)

    const { data } = await register(d)
      .catch(err => console.log(err))

    setUser(data.user)
    history('/')
    setLoading(false)
  }

  const loginUser = async d => {
    setLoading(true)

    const { data } = await login(d)
      .catch(err => console.log(err))

    setUser(data.user)
    history('/')
    setLoading(false)
  }

  const logoutUser = async () => {
    setLoading(true)

    await logout()
      .then(() => setUser(null))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      loadingInit,
      error,
      loginUser,
      registerUser,
      logoutUser
    }),
    [user, loading, loadingInit, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInit && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  return context
}
