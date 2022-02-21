import React from 'react'
import useForms from '../hooks/useForms'
import AppError from './AppError'
import { useAuth } from './AuthProvider'
import validate from '../hooks/useValidate'

export default function Register () {
  const { values, handleChange } = useForms(
    {
      initialValues: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  )

  const { error, loading, registerUser } = useAuth()

  const displayError = () => {
    if (error) {
      return <AppError message='App Error' />
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    await registerUser(values)
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        {
          displayError()
        }
        <div className='form-group'>
          <label>username</label>
          <input
            type='text'
            name='username'
            className='form-control'
            onChange={handleChange}
            value={values.username}
            placeholder='Username'
          />
        </div>
        {
                    // error && <AppError message={error.message} />
                }
        <div className='form-group'>
          <label>email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            onChange={handleChange}
            value={values.email}
            placeholder='email'
          />
        </div>
        <div className='form-group'>
          <label>password</label>
          <input
            type='password'
            className='form-control'
            name='password'
            onChange={handleChange}
            value={values.password}
            placeholder='password'
          />
        </div>
        <div className='form-group'>
          <label>confirm password</label>
          <input
            type='password'
            className='form-control'
            name='confirmPassword'
            onChange={handleChange}
            value={values.confirmPassword}
            placeholder='confirm password'
          />
        </div>
        <input
          type='submit'
          value='Submit'
          className='btn btn-primary'
        />
      </form>
    </div>
  )
}
