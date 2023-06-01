import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
    const [yoursearch, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const fetchMovie = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=d199a82d&s=${yoursearch}`);
            const { Search } = response.data;
            setMovies(Search);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleSearch = () => {
        fetchMovie();
        setShowFavorites(false);
    };

    const handleAddToFavorites = (movie) => {
        setFavorites([...favorites, movie]);
    };

    const handleRemoveFromFavorites = (movie) => {
        const updatedFavorites = favorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID);
        setFavorites(updatedFavorites);
    };

    const handleShowFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    const displayedMovies = showFavorites ? favorites : movies;

    return (
        <div>
            <div className="my-4 mb-4">
                <input
                    type="text"
                    value={yoursearch}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Entrez votre recherche"
                    className="border border-gray-900 px-2 py-1 rounded"
                />
                <button onClick={handleSearch} className="bg-gray-900 hover:bg-gray-500 text-white px-4 py-2 rounded ml-2">
                    Rechercher
                </button>
                <button onClick={handleShowFavorites} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-2">
                    Favoris
                </button>
            </div>

            <div className="flex flex-wrap -mx-2">
                {displayedMovies.map((movie) => (
                    <div key={movie.imdbID} className="w-1/4 px-2">
                        <div className="movie-card border border-gray-300 rounded p-4">
                            <img src={movie.Poster} alt={movie.Title} className="w-full mb-2" />
                            <h3 className="text-xl font-semibold">{movie.Title}</h3>
                            <p className="text-gray-500">{movie.Year}</p>
                            {!showFavorites && (
                                <button
                                    onClick={() => handleAddToFavorites(movie)}
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
                                >
                                    Ajouter
                                </button>
                            )}
                            {showFavorites && (
                                <button
                                    onClick={() => handleRemoveFromFavorites(movie)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2"
                                >
                                    Supprimer
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;
