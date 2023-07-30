import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without error', () => {
  render(<App />);
})

test('renders the title Live Football World Cup Scoreboard', () => {
  render(<App />);
  const title = screen.getByText(/Live Football World Cup Scoreboard/i);
  expect(title).toBeInTheDocument();
})

test('Start Match button will be visible on screen', () => {
  render(<App />);
  const startMatchButton = screen.getByText(/Start Match/i);
  expect(startMatchButton).toBeInTheDocument();
})