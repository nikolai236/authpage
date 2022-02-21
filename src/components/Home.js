import React from 'react'
import { useAuth } from './AuthProvider'

export default function Home () {
  const { logoutUser } = useAuth()

  return (
    <div className='container'>
      <p>Home.</p>
      <button onClick={logoutUser} className='btn btn-primary'>Logout</button>
    </div>
  )
}
