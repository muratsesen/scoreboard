export interface NewMatchFormProps {
    onSubmit: (match: Match) => void;
    onCancel: () => void;
  }

  export interface Match {
    homeTeam: Team;
    awayTeam: Team;
    startDateTime: Date;
    totalScore(): number;
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
      startDateTime: Date
    ) {
      this.homeTeam = homeTeam;
      this.awayTeam = awayTeam;
      this.startDateTime = startDateTime; 
    }
  
    totalScore(): number {
      return this.homeTeam.score + this.awayTeam.score;
    }
  }
