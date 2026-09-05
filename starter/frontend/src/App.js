import React, { useState } from 'react';

import MovieDetails from './components/MovieDetails';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  const [selected, setSelected] = useState(undefined);

  return (
    <main className="container">
      <header>
        <h1>Movie List</h1>
      </header>
      <MovieList onMovieSelect={setSelected} />
      {selected ? (
        <section aria-label="Movie details">
          <h2>Movie Details</h2>
          <MovieDetails movie={selected} />
        </section>
      ) : null}
    </main>
  );
}

export default App;
