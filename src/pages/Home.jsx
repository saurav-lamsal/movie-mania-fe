import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import useFetchMovies from '../services/fetchdata';

const Home = ({ searchTerm }) => {
  const [searchData, setSearchData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
 
  const {data: movieData, isLoading}= useFetchMovies(url)

  console.log(movieData,"data");

  const getSearchMovies = async () => {
    try {
      const res = await fetch(searchUrl, {
        method: "GET",
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTYzMGZlOTkzNzM1NGNmYjM3MjhjMjI5NDhmOWE0MyIsIm5iZiI6MTc0MzUxMTM3OC43MTgwMDAyLCJzdWIiOiI2N2ViZGY1MjU4ZTBhYTIzMzhmYjEwMjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3-eh4jUswnQR6RwsBMo6QvFKYQH98sGxeMzLem_OK64'
        }
      });
      const data = await res.json();
      setSearchData(data.results);
    } catch (error) {
      console.error("Error fetching search movies:", error);
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites( );
  }, []);


  useEffect(() => {
    if (searchTerm) {
      getSearchMovies();
    }
  }, [searchTerm]);

  // Handle adding/removing a favorite movie (should be called on a user action, not during render)
  const handleFavorite = (movie) => {
    let updatedFavorites;
    const isMovieFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isMovieFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id); // remove from favorites
    } else {
      updatedFavorites = [...favorites, movie]; // add to favorites
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  // Render a loader if loading
  if (isLoading) {
    return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;
  } 

  return (

    <div className='display-card'>
      {!searchTerm ? (
        movieData.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            id={movie.id}
            content={movie.overview}
            genre={movie.release_date}
            addFavourite={() => handleFavorite(movie)}
            imgSrc={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          />
        ))
      ) : (
        searchData.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            id={movie.id}
            content={movie.overview}
            genre={movie.release_date}
            imgSrc={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          />
        ))
      )}
    </div>
  );
};

export default Home;
