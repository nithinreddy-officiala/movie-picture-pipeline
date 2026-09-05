import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import MovieList from '../MovieList';
import { loadMovies } from '../../services/movieApi';

jest.mock('../../services/movieApi', () => ({
  loadMovies: jest.fn(),
}));

test('displays titles supplied by the movie service', async () => {
  loadMovies.mockResolvedValueOnce([
    { id: 11, title: 'Movie Alpha' },
    { id: 22, title: 'Movie Beta' },
  ]);

  render(<MovieList onMovieSelect={jest.fn()} />);

  expect(await screen.findByRole('button', { name: 'Movie Alpha' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Movie Beta' })).toBeInTheDocument();
});

test('reports the chosen movie', async () => {
  const movies = [{ id: 11, title: 'Movie Alpha' }];
  loadMovies.mockResolvedValueOnce(movies);
  const onMovieSelect = jest.fn();

  render(<MovieList onMovieSelect={onMovieSelect} />);
  fireEvent.click(await screen.findByRole('button', { name: 'Movie Alpha' }));

  expect(onMovieSelect).toHaveBeenCalledWith(movies[0]);
});
