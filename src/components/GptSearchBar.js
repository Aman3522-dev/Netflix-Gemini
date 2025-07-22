import { useSelector, useDispatch } from "react-redux";
import lang from "../Utils/language";
import { useRef } from "react";
import {API_OPTIONS} from "../Utils/constants"
import gemini from "../Utils/gemini";
import { addGeminiResult } from "../Utils/geminiSlice";


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

   const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };


  const handleGptSearchClick = async () => {
  const prompt = "Act as a movie recommender and suggest 5 best movies for the query: " + searchText.current.value + ". Give only movie names, comma separated.";

  try {
    const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    // console.log("Gemini Response:", response);

    const geminiMovies = response.split(",").map((name) => name.trim());

    // 2. Fetch TMDB data for each movie
    const tmdbResults = await Promise.all(
      geminiMovies.map((movie) => searchMovieTMDB(movie))
    );

    // 3. Use top result for each movie
    const topResults = tmdbResults.map((result) => result?.[0]).filter(Boolean);

    
    dispatch(
      addGeminiResult({ movieNames: geminiMovies, movieResults: topResults })
    );
  } catch (error) {
    console.error("Gemini API error:", error);
  }
};
  
  return (
    <div className='pt-[-35%] md:pt-[10%] flex justify-center'>
      <form className=' w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input
         ref= {searchText}
         type='text'
         className='p-4 m-4 col-span-9'
         placeholder={lang[langKey].gptSearchPlaceholder}
        >          
        </input>
        <button className='col-span-3 py-2 m-4 px-4 bg-red-500 text-white rounded-lg' onClick={handleGptSearchClick}>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar;
