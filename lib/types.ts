export type Outcome={name:string;price:number};
export type Bookmaker={title:string;key?:string;markets?:{key:string;outcomes:Outcome[]}[]};
export type Event={id:string;sport_key:string;sport_title:string;commence_time:string;home_team:string;away_team:string;bookmakers?:Bookmaker[]};
export type Selection={eventId:string;event:string;league:string;country:string;kickoff:string;market:string;selection:string;bookmaker:string;odds:number;impliedProbability:number;modelProbability:number;edge:number;score:number};
export type Acca={legs:Selection[];combinedOdds:number;combinedScore:number};
