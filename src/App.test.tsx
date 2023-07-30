import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('renders without error', () => {
  render(<App />);
})

test('renders the title Live Football World Cup Scoreboard', () => {
  render(<App />);
  const title = screen.getByText(/Live Football World Cup Scoreboard/i);
  expect(title).toBeInTheDocument();
})

test('renders "Start Match" button when no match is in progress', () => {
  render(<App />);
  const startMatchButton = screen.getByText(/Start Match/i);
  expect(startMatchButton).toBeInTheDocument();
})

test('opens new match form when "Start Match" button is clicked', async () => {
  render(<App />);
  const startMatchButton = screen.getByText(/Start Match/i);
  act(() => {
    startMatchButton.click();
  });
  const newMatchForm = await screen.findByText(/New Match/i);

  expect(newMatchForm).toBeInTheDocument();
})