import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App, { NewMatchForm } from './App';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';

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

describe('New match form', () => {
  const onCancelMock = jest.fn();
  const onSubmitMock = jest.fn();
  describe('layout', () => {
    beforeEach(() => {
      render(<NewMatchForm onCancel={onCancelMock} onSubmit={onSubmitMock} />);
    })

    test('renders "Home Team" input', () => {
      const homeTeamInput = screen.getByLabelText(/Home Team/i);
      expect(homeTeamInput).toBeInTheDocument();
    })
    
    test('renders "Away Team" input', () => {
      const awayTeamInput = screen.getByLabelText(/Away Team/i);
      expect(awayTeamInput).toBeInTheDocument();
    })
    
    
    test('renders "Submit" button', () => {
      const submitButton = screen.getByText(/Submit/i);
      expect(submitButton).toBeInTheDocument();
    })
    
    test('renders "Cancel" button', () => {
      const cancelButton = screen.getByText(/Cancel/i);
      expect(cancelButton).toBeInTheDocument();
    })
  })

  describe('actions', () => {
   
    beforeEach(()=>{
      render(<NewMatchForm onCancel={onCancelMock} onSubmit={onSubmitMock} />);
    })
    test('renders Submit button disabled when input fields are empty', () => {
      const submitButton = screen.getByText(/Submit/i);
      expect(submitButton).toBeDisabled();
    })

    test('renders Submit button enabled when input fields are not empty', () => {
      const homeTeamInput = screen.getByLabelText(/Home Team/i);
      const awayTeamInput = screen.getByLabelText(/Away Team/i);

      fireEvent.change(homeTeamInput, { target: { value: 'Home Team A' } });
      fireEvent.change(awayTeamInput, { target: { value: 'Away Team B' } });

      const submitButton = screen.getByText(/Submit/i);
      expect(submitButton).toBeEnabled();
    })

    test('submit button works properly', async () => {

      const homeTeamInput = await screen.findByLabelText(/Home Team/i);
      const awayTeamInput = await screen.findByLabelText(/Away Team/i);
      const submitButton = await screen.findByText(/Submit/i);

      fireEvent.change(homeTeamInput, { target: { value: 'Home Team A' } });
      fireEvent.change(awayTeamInput, { target: { value: 'Away Team B' } });

      fireEvent.click(submitButton);

      expect(onSubmitMock).toHaveBeenCalledWith({
        homeTeam: {
          name: 'Home Team A',
          score: 0
        },
        awayTeam: {
          name: 'Away Team B',
          score: 0
        },
        startDateTime: new Date('2011-11-11T12:00:00.000Z')
      });

    })

    test('cancel button works properly', async () => {
      const cancelButton = await screen.findByText(/Cancel/i);
      fireEvent.click(cancelButton);
      expect(onCancelMock).toHaveBeenCalled();
  })
  })


})