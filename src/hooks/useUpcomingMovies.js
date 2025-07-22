import { useEffect } from 'react';
import { API_OPTIONS } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import {  addUpcomingMovies } from '../Utils/movieSlice';

const useUpcomingMovies = () => {
  // fetch data from TDMB and update the store
    const dispatch = useDispatch();
    const getUpcomingMovies = async () => {
      const data = await fetch (
        'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json.results);
      dispatch(addUpcomingMovies(json.results));
    };
  
    useEffect(() => {
      getUpcomingMovies();
    
    }, []);
};

export default useUpcomingMovies;