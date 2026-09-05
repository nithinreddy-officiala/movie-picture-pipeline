import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../../App';

jest.mock('../../services/movieApi', () => ({
  loadMovies: jest.fn(() => Promise.resolve([])),
  loadMovie: jest.fn(),
}));

test('renders the movie application title', () => {
  render(<App />);

  const title = process.env.FAIL_TEST ? 'Pipeline Failure' : 'Movie List';
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
});
