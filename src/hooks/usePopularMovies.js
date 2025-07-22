import { useEffect } from 'react';
import { API_OPTIONS } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../Utils/movieSlice';

const usePopularMovies = () => {
  // fetch data from TDMB and update the store
    const dispatch = useDispatch();
    const getPopularMovies = async () => {
      const data = await fetch (
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json.results);
      dispatch(addPopularMovies(json.results));
    };
  
    useEffect(() => {
      getPopularMovies();
    
    }, []);
};

export default usePopularMovies;