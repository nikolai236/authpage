import redaxios from 'redaxios'

const useUser = () => {
  const register = async values => {
    delete values.confirmPassword

    const res = await redaxios
      .post('/api/v1/auth/register', values)
      .catch(err => console.log(err))

    return res
  }

  const login = async values => {
    const res = await redaxios
      .post('/api/v1/auth/login', values)
      .catch(err => console.log(err))

    return res
  }

  const logout = async () => {
    return await redaxios
      .get('/api/v1/auth/logout')
      .catch(err => console.log(err))
  }

  const getCurrentUser = async () => {
    const res = await redaxios
      .get('/api/v1/auth')
      .catch(err => console.log(err))

    return res.data
  }

  return {
    register,
    login,
    logout,
    getCurrentUser
  }
}
export default useUser
