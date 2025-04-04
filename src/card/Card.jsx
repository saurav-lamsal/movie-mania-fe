import React from 'react'
import './card.css'
import { Link } from 'react-router-dom'
const Card = ({content, title, genre, imgSrc, id, addFavourite}) => {
  return (
    <div className='movie-card'>
        <img src={imgSrc} style={{height:"full", width: "100%"}}>
        </img>
        <h2>{title}</h2>
        <h5>{genre}</h5>
        <p>{content}</p>
        <Link to={`/movie-details/${id}`}><button>Details...</button></Link>
        
        <button onClick={addFavourite}>💗</button>
        </div>
  )
}

export default Card