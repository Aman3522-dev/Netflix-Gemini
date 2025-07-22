import { useSelector } from "react-redux";

const GptMovieSuggestions = () => {
  const { movieResults } = useSelector((store) => store.gemini);

  if (!movieResults?.length) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-center">Movie Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movieResults.map((movie) => (
          <div key={movie.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.overview?.slice(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
