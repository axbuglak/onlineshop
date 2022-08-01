import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, checkIsAuth } from '../store/features/auth/authSlice'
import { toast } from 'react-toastify'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { status } = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ username, password }))
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/3 mx-auto h-2/3 mt-20 rounded-md px-3 py-5 shadow-md bg-slate-800"
    >
      <h1 className="text-lg text-white text-center">Registration</h1>
      <label className="text-xs text-gray-300">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="mt-1 text-gray-300 w-full rounded-lg bg-slate-700 border py-1 px-2 text-xs outline-none placeholder:text-gray-500 border-gray-500"
        />
      </label>
      <label className="text-xs text-gray-300">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-1 text-gray-300 w-full rounded-lg bg-slate-700 border py-1 px-2 text-xs outline-none placeholder:text-gray-500 border-gray-500"
        />
      </label>

      <div className="flex gap-x-5 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-2 py-1 rounded-md text-white text-sm bg-slate-700 hover:bg-slate-800 transition-all"
        >
          Accept registration
        </button>

        <Link
          to="/login"
          className="px-2 py-1 rounded-md text-white text-base bg-gray-500 hover:bg-slate-800 transition-all"
        >
          Login
        </Link>
      </div>
    </form>
  )
}