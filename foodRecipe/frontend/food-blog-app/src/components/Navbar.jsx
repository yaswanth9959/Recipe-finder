import React, { useEffect, useState, useContext } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'
import { SearchContext } from '../context/SearchContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  let token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem("user"))

  // ✅ Use context-based search state
  const { searchQuery, setSearchQuery } = useContext(SearchContext)

  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    } else {
      setIsOpen(true)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search:", searchQuery)
  }

  return (
    <>
      <header className="navbar">
        <h2>Food Blog</h2>

        {/* ✅ Search Bar linked to global state */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search recipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
          <li onClick={() => isLogin && setIsOpen(true)}><NavLink to={!isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
          <li onClick={checkLogin}>
            <p className='login'>
              {isLogin ? "Login" : "Logout"} {user?.email ? `(${user?.email})` : ""}
            </p>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  )
}
