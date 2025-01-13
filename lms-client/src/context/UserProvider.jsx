import { useQuery } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
import { axiosReq } from '../utils/axiosReq'
import useAuth from '../hook/useAuth'


export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const { token } = useAuth()

  const { data, isLoading } = useQuery({
    enabled: !!token,
    queryKey: ['user'],
    queryFn: () => axiosReq.get('/auth/me', { headers: { Authorization: token } }),
  })
  useEffect(() => {
    if (data) {
      setUser(data.data)
    }
  }, [data])

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider