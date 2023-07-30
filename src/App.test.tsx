import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

describe('App', () => {
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
})

describe('new match form', () => {
  test('renders "Home Team" input', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const homeTeamInput = screen.getByLabelText(/Home Team/i);
    expect(homeTeamInput).toBeInTheDocument();
  })

  test('renders "Away Team" input', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const awayTeamInput = screen.getByLabelText(/Away Team/i);
    expect(awayTeamInput).toBeInTheDocument();
  })

  test('renders "Home Team Score" input', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const homeTeamScoreInput = screen.getByLabelText(/Home Team Score/i);
    expect(homeTeamScoreInput).toBeInTheDocument();
    expect(homeTeamScoreInput).toHaveValue(0);
    expect(homeTeamScoreInput).toHaveAttribute('type', 'number');
    expect(homeTeamScoreInput).toHaveAttribute('min', '0');
    expect(homeTeamScoreInput).toHaveAttribute('max', '99');
    expect(homeTeamScoreInput).toHaveAttribute('step', '1');
    expect(homeTeamScoreInput).toHaveAttribute('name', 'homeTeamScore');
    expect(homeTeamScoreInput).toHaveAttribute('id', 'homeTeamScore');
    expect(homeTeamScoreInput).toHaveAttribute('required');
  })

  test('renders "Away Team Score" input', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const awayTeamScoreInput = screen.getByLabelText(/Away Team Score/i);
    expect(awayTeamScoreInput).toBeInTheDocument();
    expect(awayTeamScoreInput).toHaveValue(0);
    expect(awayTeamScoreInput).toHaveAttribute('type', 'number');
    expect(awayTeamScoreInput).toHaveAttribute('min', '0');
    expect(awayTeamScoreInput).toHaveAttribute('max', '99');
    expect(awayTeamScoreInput).toHaveAttribute('step', '1');
    expect(awayTeamScoreInput).toHaveAttribute('name', 'awayTeamScore');
    expect(awayTeamScoreInput).toHaveAttribute('id', 'awayTeamScore');
    expect(awayTeamScoreInput).toHaveAttribute('required');
  })

  test('renders "Submit" button', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const submitButton = screen.getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();
  })

  test('renders "Cancel" button', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const cancelButton = screen.getByText(/Cancel/i);
    expect(cancelButton).toBeInTheDocument();
  })

  test('renders "Home Team Score" input with value 0', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const homeTeamScoreInput = screen.getByLabelText(/Home Team Score/i);
    expect(homeTeamScoreInput).toHaveValue(0);
  })

  test('renders "Away Team Score" input with value 0', () => {
    render(<App />);
    const startMatchButton = screen.getByText(/Start Match/i);
    act(() => {
      startMatchButton.click();
    });
    const awayTeamScoreInput = screen.getByLabelText(/Away Team Score/i);
    expect(awayTeamScoreInput).toHaveValue(0);
  })
})