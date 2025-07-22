import { API_OPTIONS } from '../Utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../Utils/movieSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trailer");
      }

      const json = await response.json();

      // Prefer "Trailer", then "Teaser", then first available
      const trailer =
        json.results.find((video) => video.type === "Trailer" && video.site === "YouTube") ||
        json.results.find((video) => video.type === "Teaser" && video.site === "YouTube") ||
        json.results[0];

      if (trailer) {
        dispatch(addTrailerVideo(trailer));
      } else {
        console.warn("No trailer or teaser found.");
      }

    } catch (error) {
      console.error("Error fetching trailer:", error.message);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMovieVideos();
    }
  }, [movieId]); // 🔁 dynamic update on movieId change
};

export default useMovieTrailer;
