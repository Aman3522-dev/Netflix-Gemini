import { useEffect } from 'react';
import { API_OPTIONS } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../Utils/movieSlice';

const useNowPlayingMovies = () => {
  // fetch data from TDMB and update the store
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
      const data = await fetch (
        'https://api.themoviedb.org/3/movie/now_playing?page=1',
        API_OPTIONS
      );
      const json = await data.json();
      // console.log(json.results);
      dispatch(addNowPlayingMovies(json.results));
    };
  
    useEffect(() => {
      getNowPlayingMovies();
    
    }, []);
};

export default useNowPlayingMovies;