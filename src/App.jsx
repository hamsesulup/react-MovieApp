import { useState, useEffect } from 'react';
import Search from './Components/Search';
import './index.css';
import Spinner from './Components/Spinner';
import MovieCard from './Components/MovieCard';

const apiUrl = 'https://api.themoviedb.org/3';

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2I3MDMyNjg0N2NmNzIyYjYzNGEwM2U5N2JmODkyZCIsIm5iZiI6MTY2NzgwODYwMi42NDksInN1YiI6IjYzNjhiZDVhMWU5MjI1MDA3ZGQ1ZjMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-P9NYABMBkjblO0-PPjgjy9Fu08eaRYJMMKPUMZdff4';

   
const apiOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const fetchMovies = async() =>{
    setIsLoading(true);
    setMovieList([]);

    try {
      const endpoint = `${apiUrl}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, apiOptions);
      
      if(!response.ok){
        throw new Error("Nothing was working!!");
      }

      const data = await response.json();

      if (data.Response == 'False'){
        setErrorMessage('Failed to load data');
        setMovieList([]);
        return;
      }

      setMovieList(data.results);

    } catch (error) {
      console.log(`Eror: ${error}`);
      setErrorMessage('Error fetching movies, please try letter');
    }finally{
      setIsLoading(false);
    }
  }


  useEffect(()=>{
    fetchMovies();
  },[]);

  return (
    <>
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src='./hero.png' alt='hero banner'/>
          <h1> Find <span className="text-gradient">Movies</span> You'll Enjoy Whitout the Hassle</h1>
        
          <Search searchTerm={searchTerm}  setSearchTerm={setSearchTerm} />
        
        </header>

        <section className='all-movies'>
          <h2 className='mt-[20px]'>All Movies</h2>

          {isLoading? ( 
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{ errorMessage }</p>
          ) : (

            <ul>
             {movieList.map((movie) => (
              <MovieCard key={movie.id}  movie={movie} />
             ))
             }
            </ul>

          )}
          
        </section>

      </div>
    </main>
    
    </>
  )
}

export default App