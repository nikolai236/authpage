import { useState } from 'react'

const useForms = ({ initialValues }) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => {
    e.persist()

    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  return {
    handleChange,
    values
  }
}

export default useForms
