import React, { useEffect, useState, useContext } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import axios from 'axios'
import { SearchContext } from '../context/SearchContext'

export default function RecipeItems() {
  const recipes = useLoaderData()
  const [allRecipes, setAllRecipes] = useState([])
  const [isFavRecipe, setIsFavRecipe] = useState(false)
  const favItems = JSON.parse(localStorage.getItem("fav")) ?? []
  const navigate = useNavigate()
  const path = window.location.pathname === "/myRecipe"

  // ✅ Access the global search query
  const { searchQuery } = useContext(SearchContext)

  useEffect(() => {
    setAllRecipes(recipes)
  }, [recipes])

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`)
    setAllRecipes(prev => prev.filter(recipe => recipe._id !== id))
    const updatedFav = favItems.filter(recipe => recipe._id !== id)
    localStorage.setItem("fav", JSON.stringify(updatedFav))
  }

  const favRecipe = (item) => {
    const isAlreadyFav = favItems.some(recipe => recipe._id === item._id)
    const updatedFav = isAlreadyFav
      ? favItems.filter(recipe => recipe._id !== item._id)
      : [...favItems, item]
    localStorage.setItem("fav", JSON.stringify(updatedFav))
    setIsFavRecipe(prev => !prev)
  }

  // ✅ Filter recipes based on searchQuery
  const filteredRecipes = allRecipes?.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className='card-container'>
        {filteredRecipes?.length > 0 ? (
          filteredRecipes.map((item, index) => (
            <div key={index} className='card' onClick={() => navigate(`/recipe/${item._id}`)}>
              <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px" />
              <div className='card-body'>
                <div className='title'>{item.title}</div>
                <div className='icons'>
                  <div className='timer'><BsStopwatchFill />{item.time}</div>
                  {!path ? (
                    <FaHeart
                      onClick={(e) => {
                        e.stopPropagation()
                        favRecipe(item)
                      }}
                      style={{ color: favItems.some(res => res._id === item._id) ? "red" : "" }}
                    />
                  ) : (
                    <div className='action'>
                      <Link to={`/editRecipe/${item._id}`} className="editIcon" onClick={(e) => e.stopPropagation()}><FaEdit /></Link>
                      <MdDelete onClick={(e) => {
                        e.stopPropagation()
                        onDelete(item._id)
                      }} className='deleteIcon' />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No recipes found.</p>
        )}
      </div>
    </>
  )
}
