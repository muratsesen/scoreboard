import React from 'react';
import { MatchImpl, NewMatchFormProps } from './types';

function App() {
  const [showNewMatchForm, setShowNewMatchForm] = React.useState(false)
  const [match, setMatch] = React.useState()

  function startMatch() {
   
  }
  return (
    <div>
      <h1>Live Football World Cup Scoreboard</h1>
      <button onClick={() => setShowNewMatchForm(true)}>Start Match</button>

      {showNewMatchForm && <NewMatchForm onSubmit={startMatch} onCancel={() => setShowNewMatchForm(false)} />}
    </div>
  );
}


export function NewMatchForm({ onSubmit, onCancel }: NewMatchFormProps) {
  const [homeTeam, setHomeTeam] = React.useState("")
  const [awayTeam, setAwayTeam] = React.useState("")

  function submitMatch() {
    const _homeTeam = {
      name: homeTeam,
      score: 0
    };
    const _awayTeam = {
      name: awayTeam,
      score: 0
    };

    const exampleMatch: MatchImpl = new MatchImpl( _homeTeam, _awayTeam, new Date('2011-11-11T12:00:00.000Z'));

    onSubmit(exampleMatch);
  }
  const isSubmitDisabled = homeTeam.length === 0 || awayTeam.length === 0;
  return (
    <div>
      <h2>New Match</h2>
      <label htmlFor="homeTeam">Home Team:
        <input value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} type="text" id="homeTeam" /></label>

      <label htmlFor="awayTeam">Away Team:
        <input value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} type="text" id="awayTeam" /></label>

      <button onClick={submitMatch} disabled={isSubmitDisabled}>Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default App;
