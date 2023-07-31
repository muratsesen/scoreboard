import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App, { NewMatchForm, Scoreboard, Summary, UpdateMatchForm } from './App';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { MatchImpl } from './types';

describe('App', () => {
  test('renders without error', () => {
    render(<App />);
  })

  test('renders the title Live Football World Cup Scoreboard', () => {
    render(<App />);
    const title = screen.getByText(/Live Football World Cup Scoreboard/i);
    expect(title).toBeInTheDocument();
  })

  test('renders "Start Match" button when no List is in progress', () => {
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

    beforeEach(() => {
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

describe('Scoreboard', () => {
  const exampleMatch:MatchImpl = {
    homeTeam: { name: 'England', score: 3 },
    awayTeam: { name: 'Finland', score: 2 },
    startDateTime: new Date('2011-11-11T12:00:00.000Z'),
    totalScore : function(){ return this.homeTeam.score + this.awayTeam.score;}
  };

  const mockFinishMatch = jest.fn();
  const mockUpdateMatch = jest.fn();
  beforeEach(() => {
    render(<Scoreboard match={exampleMatch} finishMatch={mockFinishMatch} updateMatch={mockUpdateMatch} />);
  })

  describe('layout', () => {

    test('renders correct team names and scores', () => {
      const homeTeamLabel = screen.getByText('England');
      const homeTeamScore = screen.getByText('3');
      const awayTeamLabel = screen.getByText('Finland');
      const awayTeamScore = screen.getByText('2');

      expect(homeTeamLabel).toBeInTheDocument();
      expect(homeTeamScore).toBeInTheDocument();
      expect(awayTeamLabel).toBeInTheDocument();
      expect(awayTeamScore).toBeInTheDocument();
    })
    test('should contain Finish button', () => {
      const finishMatchButton = screen.getByText(/Finish/i);
      expect(finishMatchButton).toBeInTheDocument();
    })
    test('should contain Update button', () => {
      const updateMatchButton = screen.getByText(/Update/i);
      expect(updateMatchButton).toBeInTheDocument();
    })
  })

  describe('actions', () => {
    test('should call finishMatch when finish button is clicked', () => {
      const finishMatchButton = screen.getByText(/Finish/i);

      fireEvent.click(finishMatchButton);
      expect(mockFinishMatch).toHaveBeenCalled();
    })
    test('should call updateMatch when update button is clicked', () => {
      const updateMatchButton = screen.getByText(/Update/i);

      fireEvent.click(updateMatchButton);
      expect(mockUpdateMatch).toHaveBeenCalled();

    })
  })

})

describe('UpdateMatchForm', () => {
  const exampleMatch = {
    homeTeam: { name: 'England', score: 3 },
    awayTeam: { name: 'Finland', score: 2 },
    startDateTime: new Date('2011-11-11T12:00:00.000Z'),
    totalScore : function(){ return this.homeTeam.score + this.awayTeam.score;}
  };
  const exampleUpdatedMatch = {
    homeTeam: { name: 'England', score: 3 },
    awayTeam: { name: 'Finland', score: 3 },
    startDateTime: new Date('2011-11-11T12:00:00.000Z')
  };

  const onCancelMock = jest.fn();
  const onSubmitMock = jest.fn();
  const mockFinishMatch = jest.fn();
  const mockUpdateMatch = jest.fn();
  beforeEach(() => {
    render(<UpdateMatchForm match={exampleMatch} onSubmit={onSubmitMock} onCancel={onCancelMock} />);
  })

  describe('layout', () => {

    test('should renders correct team names and scores', () => {
      const homeTeamLabel = screen.getByText('England:');
      const homeTeamScore = screen.queryByPlaceholderText('homeTeamScore');
      const awayTeamLabel = screen.getByText('Finland:');
      const awayTeamScore = screen.queryByPlaceholderText('awayTeamScore');

      expect(homeTeamLabel).toBeInTheDocument();
      expect(homeTeamScore).toBeInTheDocument();
      expect(awayTeamLabel).toBeInTheDocument();
      expect(awayTeamScore).toBeInTheDocument();
    })
    test('should contain Submit  button', () => {
      const submitButton = screen.getByText(/Submit/i);
      expect(submitButton).toBeInTheDocument();
    })
    test('should contain Cancel button', () => {
      const cancelButton = screen.getByText(/Cancel/i);
      expect(cancelButton).toBeInTheDocument();
    })
  })

  describe('actions', () => {
    test('should call onSubmit when submit button is clicked', async () => {
      const homeTeamScore = await screen.findByPlaceholderText('homeTeamScore');
      const awayTeamScore = await screen.findByPlaceholderText('awayTeamScore');

      fireEvent.change(homeTeamScore, { target: { value: '3' } });
      fireEvent.change(awayTeamScore, { target: { value: '3' } });

      const updateMatchButton = screen.getByText(/Submit/i);
      fireEvent.click(updateMatchButton);

      expect(onSubmitMock).toHaveBeenCalledWith(exampleUpdatedMatch);

    })
    test('should call cancel when cancel button is clicked', () => {
      const cancelButton = screen.getByText(/Cancel/i);

      fireEvent.click(cancelButton);
      expect(onCancelMock).toHaveBeenCalled();
    })
  })

})

describe('Summary', () => {
  const exampleMatchList = [
    {
      homeTeam: { name: 'Mexico', score: 0 },
      awayTeam: { name: 'Canada', score: 5 },
      startDateTime: new Date('2023-08-01T12:10:00.000Z'),
      totalScore : function(){ return this.homeTeam.score + this.awayTeam.score;}
    },
    {
      homeTeam: { name: 'Spain', score: 10 },
      awayTeam: { name: 'Brasil', score: 2 },
      startDateTime: new Date('2023-08-01T12:11:00.000Z'),
      totalScore : function(){ return this.homeTeam.score + this.awayTeam.score;}
    },
    {
      homeTeam: { name: 'Germany', score: 2 },
      awayTeam: { name: 'France', score: 2 },
      startDateTime: new Date('2023-08-02T12:10:00.000Z'),
      totalScore : function(){ return this.homeTeam.score + this.awayTeam.score;}
    },
    {
      homeTeam: { name: 'Uruguay', score: 6 },
      awayTeam: { name: 'Italy', score: 6 },
      startDateTime: new Date('2023-08-02T12:10:00.000Z'),
      totalScore : function(){ return this.homeTeam.score + this.awayTeam.score;}
    },
    {
      homeTeam: { name: 'Argentina', score: 3 },
      awayTeam: { name: 'Australia', score: 1 },
      startDateTime: new Date('2023-08-03T12:10:00.000Z'),
      totalScore : function(){ return this.homeTeam.score + this.awayTeam.score;}
    },
  ];

  const closeSummaryMock = jest.fn();

  beforeEach(() => {
    render(<Summary matchList={exampleMatchList} closeSummary={closeSummaryMock} />);
  })

  describe('layout', () => {

    test('should renders correct team names and scores', async () => {
      const homeTeamLabel0 = await screen.findByText(/Uruguay/i);
      const awayTeamLabel0 = await screen.findByText(/Italy/i);
      const homeTeamLabel1 = await screen.findByText(/Spain/i);
      const awayTeamLabel1 = await screen.findByText(/Brasil/i);
      const homeTeamLabel2 = await screen.findByText(/Mexico/i);
      const awayTeamLabel2 = await screen.findByText(/Canada/i);
      const homeTeamLabel3 = await screen.findByText(/Argentina/i);
      const awayTeamLabel3 = await screen.findByText(/Australia/i);
      const homeTeamLabel4 = await screen.findByText(/Germany/i);
      const awayTeamLabel4 = await screen.findByText(/France/i);


      // const homeTeamScore0 = screen.queryByTestId('homeTeamScore-0');
      // const homeTeamScore1 = screen.queryByTestId('homeTeamScore-1');
      // const homeTeamScore2 = screen.queryByTestId('homeTeamScore-2');

      // const awayTeamScore0 = screen.queryByTestId('awayTeamScore-0');
      // const awayTeamScore1 = screen.queryByTestId('awayTeamScore-1');
      // const awayTeamScore2 = screen.queryByTestId('awayTeamScore-2');


      expect(homeTeamLabel0).toBeInTheDocument();
      expect(awayTeamLabel0).toBeInTheDocument();
      expect(homeTeamLabel1).toBeInTheDocument();
      expect(awayTeamLabel1).toBeInTheDocument();
      expect(homeTeamLabel2).toBeInTheDocument();
      expect(awayTeamLabel2).toBeInTheDocument();
      expect(homeTeamLabel3).toBeInTheDocument();
      expect(awayTeamLabel3).toBeInTheDocument();
      expect(homeTeamLabel4).toBeInTheDocument();
      expect(awayTeamLabel4).toBeInTheDocument();
      
      // expect(awayTeamScore0).toBeInTheDocument();
      // expect(homeTeamScore1).toBeInTheDocument();
      // expect(homeTeamScore2).toBeInTheDocument();
      // expect(awayTeamScore0).toBeInTheDocument();
      // expect(awayTeamScore1).toBeInTheDocument();
      // expect(awayTeamScore2).toBeInTheDocument();
      
      // expect(homeTeamScore0).toHaveTextContent('0');
      // expect(awayTeamScore0).toHaveTextContent('5');
    })
    xtest('should contain Finish button', () => {
      const finishMatchButton = screen.getByText(/Finish/i);
      expect(finishMatchButton).toBeInTheDocument();
    })
    xtest('should contain Update button', () => {
      const updateMatchButton = screen.getByText(/Update/i);
      expect(updateMatchButton).toBeInTheDocument();
    })
  })

  describe('actions', () => {
    xtest('should call finishMatch when finish button is clicked', () => {
      const finishMatchButton = screen.getByText(/Finish/i);

      fireEvent.click(finishMatchButton);
      expect(closeSummaryMock).toHaveBeenCalled();
    })
  })

})

