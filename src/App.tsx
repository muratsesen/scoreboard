import React from 'react';

function App() {
  const [showNewMatchForm, setShowNewMatchForm] = React.useState(false)
  const [match, setMatch] = React.useState()
  return (
    <div>
      <h1>Live Football World Cup Scoreboard</h1>
      <button onClick={()=>setShowNewMatchForm(true)}>Start Match</button>

      {showNewMatchForm && <h2>New Match</h2>}
    </div>
  );
}

export default App;
