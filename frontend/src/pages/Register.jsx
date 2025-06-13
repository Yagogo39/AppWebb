import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSumbit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/auth/register', values)
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <div className='text-3xl text-blue-500'>Register</div>
      </div>
    </div>
  )
}
export default Register