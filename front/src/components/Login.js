import React from 'react'
import useForms from '../hooks/useForms'
import { useAuth } from './AuthProvider'

export default function Login () {
  const { values, handleChange } = useForms({
    initialValues: {
      email: '',
      password: ''
    }
  })
  const { error, loading, loginUser } = useAuth()

  const handleSubmit = async (e) => {
    if (!error) {
      e.preventDefault()

      await loginUser(values)
    }
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input
            type='email'
            name='email'
            className='form-control'
            onChange={handleChange}
            value={values.email}
          />
        </div>
        <div>
          <label>password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <input type='submit' value='Submit' className="btn btn-primary"/>
      </form>
    </div>
  )
}
