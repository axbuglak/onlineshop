import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../store/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navigation = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('You are logged out')
  }
  return (
    <nav className="flex justify-between items-center px-5 py-2 shadow-md bg-slate-800 text-white">
      <Link to="/" className="text-xl">
        Posts Forum
      </Link>

      {isAuth && (
        <span>
          <NavLink
            to={'posts'}
            className={({ isActive }) =>
              isActive
                ? 'after:scale-x-[100%] after:content-[""] relative after:absolute after:bg-white after:bottom-[-1.5px] after:right-0 after:h-[1.5px] after:w-[100%] after:rounded-md mr-3'
                : 'mr-3 after:rounded-md after:ease-linear after:duration-150 hover:after:scale-x-[100%] after:content-[""] relative after:absolute after:bg-white after:bottom-[-1.5px] after:right-0 after:h-[1.5px] after:w-[100%] after:scale-x-0'
            }
          >
            My posts
          </NavLink>
          <NavLink
            to={'new'}
            className={({ isActive }) =>
              isActive
                ? 'after:scale-x-[100%] after:content-[""] relative after:absolute after:bg-white after:bottom-[-1.5px] after:right-0 after:h-[1.5px] after:w-[100%] after:rounded-md'
                : 'after:rounded-md after:ease-linear after:duration-150 hover:after:scale-x-[100%] after:content-[""] relative after:absolute after:bg-white after:bottom-[-1.5px] after:right-0 after:h-[1.5px] after:w-[100%] after:scale-x-0'
            }
          >
            Create post
          </NavLink>
        </span>
      )}
      {isAuth ? (
        <button className="bg-gray-500 rounded-md py-[2px] px-3 shadow-md hover:bg-slate-800 transition-all"
        onClick={logoutHandler}>
          Log out
        </button>
      ) : (
        <div>
          <Link
            to="/login"
            className="bg-gray-500 rounded-md py-[2px] px-3 shadow-md hover:bg-slate-800 transition-all mr-3"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-500 rounded-md py-[2px] px-3 shadow-md hover:bg-slate-800 transition-all"
          >
            Registration
          </Link>
        </div>
      )}
    </nav>
  )
}
