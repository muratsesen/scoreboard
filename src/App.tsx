import React from 'react';
import { MatchImpl, NewMatchFormProps, ScoreboardProps, Team, UpdateMatchFormProps } from './types';

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
export default App;

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

    const exampleMatch: MatchImpl = new MatchImpl(_homeTeam, _awayTeam, new Date('2011-11-11T12:00:00.000Z'));

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

export function Scoreboard({ match, finishMatch, updateMatch }: ScoreboardProps) {
  const { homeTeam, awayTeam } = match;
  return (
    <div>
      <div>
        <label>
          {homeTeam.name}
          <span>{homeTeam.score}</span>
        </label>
      </div>
      <div>
        <label>
          {awayTeam.name}
          <span>{awayTeam.score}</span>
        </label>
      </div>

      <button onClick={finishMatch}>Finish</button>
      <button onClick={updateMatch}>Update</button>
    </div>
  );
}

export function UpdateMatchForm({ onSubmit, onCancel, match }: UpdateMatchFormProps) {
  const [homeTeam, setHomeTeam] = React.useState<Team>(match.homeTeam)
  const [awayTeam, setAwayTeam] = React.useState<Team>(match.awayTeam)

  function submitMatch() {


    const exampleMatch: MatchImpl = new MatchImpl(homeTeam, awayTeam, match.startDateTime);

    onSubmit(exampleMatch);
  }

  return (
    <div>
      <h2>Update Match</h2>
      <label htmlFor="homeTeam">{homeTeam.name}:
        <input placeholder='homeTeamScore' value={homeTeam.score} onChange={(e) => setHomeTeam(prev => ({ name: homeTeam.name, score: parseInt(e.target.value) }))} type="text" id="homeTeam" /></label>

      <label htmlFor="awayTeam">{awayTeam.name}:
        <input placeholder='awayTeamScore' value={awayTeam.score} onChange={(e) => setAwayTeam(prev => ({ ...prev, score: parseInt(e.target.value) }))} type="text" id="awayTeam" /></label>

      <button onClick={submitMatch} >Submit</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export function Summary({ matchList, closeSummary }: { matchList: MatchImpl[], closeSummary: () => void }) {

  //sort mach list according to totalScore and startDateTime
  //TODO: useMemo or useCallback
  
  matchList.sort((a, b) => {
    if (a.totalScore() === b.totalScore()) {
      return a.startDateTime.getTime() - b.startDateTime.getTime();
    }
    return b.totalScore() - a.totalScore();
  })
  return (
    <div>
      <h2>Summary</h2>
      {matchList.map((match, index) => (
        <div key={match.startDateTime.toLocaleDateString()}>
          <span>{index + 1}-</span>
          <span data-testid={`homeTeamName-${index}`}>{match.homeTeam.name}</span>
          <span data-testid={`homeTeamScore-${index}`}>{match.homeTeam.score}</span>
          -
          <span data-testid={`awayTeamName-${index}`}>{match.awayTeam.name}</span>
          <span data-testid={`awayTeamScore-${index}`}> {match.awayTeam.score}</span>
        </div>
      ))}

      <button onClick={closeSummary}>Close</button>
    </div>
  )
}