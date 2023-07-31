export interface NewMatchFormProps {
    onSubmit: (match: MatchImpl) => void;
    onCancel: () => void;
  }
export interface UpdateMatchFormProps {
    match:MatchImpl,
    onSubmit: (match: MatchImpl) => void;
    onCancel: () => void;
  }
export interface ScoreboardProps {
    match: MatchImpl;
    finishMatch: () => void;
    updateMatch: () => void;
  }

  export interface Match {
    homeTeam: Team;
    awayTeam: Team;
    startDateTime?: Date;
  }
  export interface Team {
    name: string;
    score: number;
  }
  export class MatchImpl implements Match {
    public homeTeam: Team;
    public awayTeam: Team;
    public startDateTime: Date;
   
    constructor(
      homeTeam: Team,
      awayTeam: Team,
      startDateTime?: Date
    ) {
      this.homeTeam = homeTeam;
      this.awayTeam = awayTeam;
      this.startDateTime = startDateTime || new Date(); 
    }
  
    totalScore(): number {
      return this.homeTeam.score + this.awayTeam.score;
    }
  }
