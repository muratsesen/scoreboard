import React, { ChangeEvent } from 'react';
import { MatchImpl, NewMatchFormProps, ScoreboardProps, Team, UpdateMatchFormProps } from './types';
import './App.css';

function App() {
  const [showNewMatchForm, setShowNewMatchForm] = React.useState(false)
  const [showUpdateMatchForm, setShowUpdateMatchForm] = React.useState(false)
  const [showSummary, setShowSummary] = React.useState(false)
  const [match, setMatch] = React.useState<MatchImpl | null>(null);
  const [matchList, setMatchList] = React.useState<MatchImpl[] | []>([]);

  function startMatch(match:MatchImpl) {
    if(!match) return;
    match.startDateTime = new Date();
    setMatch(match);
    setShowNewMatchForm(false);
  }
  function finishMatch(){
    if(!match) return;

    setMatchList(prev => [...prev, match]);
    setMatch(null);
  }
  function handleButtonClick(action:string){
    setShowNewMatchForm(false);
    setShowUpdateMatchForm(false);
    setShowSummary(false);
    if(action === "startMatch") setShowNewMatchForm(true);
    if(action === "showSummary") setShowSummary(true);
    if(action === "updateMatch") setShowUpdateMatchForm(true);
  
  }
  return (
    <div>
      <h1>Live Football World Cup Scoreboard</h1>

      <button className='button basic' disabled={match !== null} onClick={() => handleButtonClick("startMatch")}>Start Match</button>
      <button className='button basic' onClick={() => handleButtonClick("showSummary")}>Show Summary</button>

      {showNewMatchForm && <NewMatchForm onSubmit={startMatch} onCancel={() => setShowNewMatchForm(false)} />}

      {showSummary && <Summary matchList={matchList} closeSummary={() => setShowSummary(false)} />}

      {match && <Scoreboard match={match} finishMatch={finishMatch} updateMatch={() => handleButtonClick("updateMatch")} />}

      {showUpdateMatchForm && match !== null && 
      <UpdateMatchForm match={match} 
      onSubmit={(match:MatchImpl)=>{setMatch(match); setShowUpdateMatchForm(false)}} 
      onCancel={() => setShowUpdateMatchForm(false)} />}
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

    const exampleMatch: MatchImpl = new MatchImpl(_homeTeam, _awayTeam,new Date("1970-01-01T00:00:00.000Z"));

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

      <button className='button success' onClick={submitMatch} disabled={isSubmitDisabled}>Submit</button>
      <button className='button basic' onClick={onCancel}>Cancel</button>
    </div>
  )
}

export function Scoreboard({ match, finishMatch, updateMatch }: ScoreboardProps) {
  const { homeTeam, awayTeam } = match;
  return (
    <div>
      
        <label>
          {homeTeam.name}
          <span> {homeTeam.score}</span>
        </label>
      
     {' '} -  {' '}
        <label>
          {awayTeam.name}
          <span> {awayTeam.score}</span>
        </label>
     
      <br />
      <button className='button danger' onClick={finishMatch}>Finish</button>
      <button className='button basic' onClick={updateMatch}>Update</button>
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
  const handleHomeTeamScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value);

    const score:number = isNaN(newScore) ? 0 : newScore;

    // Use the functional update form and spread the prev state
    setHomeTeam((prev) => ({ ...prev, score }));
  };
  const handleAwayTeamScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value);

    const score:number = isNaN(newScore) ? awayTeam.score : newScore;

    // Use the functional update form and spread the prev state
    setAwayTeam((prev) => ({ ...prev, score }));
  };
  return (
    <div>
      <h2>Update Match</h2>
      <label htmlFor="homeTeam">{homeTeam.name}:
        <input placeholder='homeTeamScore' 
        value={homeTeam.score} 
        onChange={handleHomeTeamScoreChange} type="number" min={0} id="homeTeam" /></label>

      <label htmlFor="awayTeam">{awayTeam.name}:
        <input placeholder='awayTeamScore' value={awayTeam.score} 
        onChange={handleAwayTeamScoreChange} type="number" min={0} id="awayTeam" /></label>

      <button className='button success' onClick={submitMatch} >Submit</button>
      <button className='button basic' onClick={onCancel}>Cancel</button>
    </div>
  )
}

export function Summary({ matchList, closeSummary }: { matchList: MatchImpl[], closeSummary: () => void }) {

  //sort mach list according to totalScore and startDateTime
  //TODO: useMemo or useCallback

  if (matchList.length === 0) return (
    <div>
      <h2>Summary</h2>
      No match yet
    </div>)

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
          <span>{index + 1}- </span>
          <span data-testid={`homeTeamName-${index}`}>{match.homeTeam.name}</span>
          <span data-testid={`homeTeamScore-${index}`}> {match.homeTeam.score}</span>
          {' '}-{' '}
          <span data-testid={`awayTeamName-${index}`}>{match.awayTeam.name}</span>
          <span data-testid={`awayTeamScore-${index}`}> {match.awayTeam.score}</span>
        </div>
      ))}

      <button className='button basic' onClick={closeSummary}>Close</button>
    </div>
  )
}