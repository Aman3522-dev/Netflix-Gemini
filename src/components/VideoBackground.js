import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';


// fetching the trailer video and updating the store
const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector(store => store.movies?.trailerVideo);
    useMovieTrailer(movieId);


  return (
    <div className='w-screen'>
        <iframe
         className='w-screen h-1/4 aspect-video' 
         width="560" 
         height="315" 
         src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      
    </div>
  )
}

export default VideoBackground;
