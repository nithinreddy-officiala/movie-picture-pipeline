import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { loadMovies } from '../services/movieApi';

function MovieList({ onMovieSelect }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let active = true;

    loadMovies().then((results) => {
      if (active) setMovies(results);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li className="movieItem" key={id}>
          <button type="button" onClick={() => onMovieSelect({ id, title })}>
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieSelect: PropTypes.func.isRequired,
};

export default MovieList;
