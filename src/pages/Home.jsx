import React, { useEffect, useState } from 'react'
import Card from '../card/Card'

const Home = ({searchTerm}) => {
  const [movieData, setMovieData]= useState(null)
  const [searchData, setSearchData]= useState([])
  const [favorites, setFavorites]= useState([])

  const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`
     
      const getMovies = async()=>{
       const data = await fetch(url, {
          method: "GET",
          headers:{
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTYzMGZlOTkzNzM1NGNmYjM3MjhjMjI5NDhmOWE0MyIsIm5iZiI6MTc0MzUxMTM3OC43MTgwMDAyLCJzdWIiOiI2N2ViZGY1MjU4ZTBhYTIzMzhmYjEwMjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3-eh4jUswnQR6RwsBMo6QvFKYQH98sGxeMzLem_OK64'
          }
        }).then(res=>res.json()).then(item=>setMovieData(item.results))
        // setMovieData(data);
      }
      // console.log(data,"d");
      console.log(movieData,"mov");
    
      const getSearchMovies = async()=>{
        const data = await fetch(searchUrl, {
           method: "GET",
           headers:{
             accept: 'application/json',
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTYzMGZlOTkzNzM1NGNmYjM3MjhjMjI5NDhmOWE0MyIsIm5iZiI6MTc0MzUxMTM3OC43MTgwMDAyLCJzdWIiOiI2N2ViZGY1MjU4ZTBhYTIzMzhmYjEwMjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3-eh4jUswnQR6RwsBMo6QvFKYQH98sGxeMzLem_OK64'
           }
         }).then(res=>res.json()).then(item=>item.results)
         setSearchData(data);
       }
    
    useEffect (()=>{
      const storedFavorites= JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites)
    },[])

  // console.log(movieData,"movieData");


    const handleFavorite = (movie)=>{
      let updatedFavorites;
      const isMovieFavorite = favorites.some((fav)=>fav.id === movie.id )
      if(isMovieFavorite){
        updatedFavorites= favorites.filter((fav)=> fav.id !== movie.id ) // movie removed from favorites
      }else{
          updatedFavorites= [...favorites, movie] // add movie to favorites
      }
      // console.log(updatedFavorites,"up");
      // Updte the localstorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      setFavorites(updatedFavorites)
    }
    

    const isFetching= true;
    console.log(!searchTerm);
    
      useEffect(()=>{
        getSearchMovies()
      },[searchTerm])

      handleFavorite(movieData)
    //  console.log(searchData,"e");
  return (
    <div className='display-card'>

      {!searchTerm ? movieData.map((movie)=>(
          <Card title={movie.title} id={movie.id} content={movie.overview} genre={movie.release_date} addFavourite={()=>handleFavorite(movie)} imgSrc={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }/>
        )): searchData.map((movie)=>(
          <Card title={movie.title} id={movie.id} content={movie.overview} genre={movie.release_date} imgSrc={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }/>
        ))}
  </div>
  )
}

export default Home