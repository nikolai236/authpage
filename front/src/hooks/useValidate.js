export default function validate (values) {
  const keys = Object.keys(values)

  const validator = (key) => {
    switch (key) {
      case 'username':
        return (val) =>
          /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
            .test(val)

      case 'email':
        return (val) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(val)

      case 'password':
        return (val) =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val)

      case 'confirmPassword':
        return (val) =>
          val === values.password
    }
  }

  for (let i = 0; i < keys.length; i++) {
    const val = values[keys[i]]

    if (!validator(keys[i])(val) && val === '') return false
  }

  return true
}
