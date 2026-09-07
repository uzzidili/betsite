import {describe, expect, it} from 'vitest';
import {consensusProbability, impliedProbability, selectionsFromEvent} from '../lib/model';

describe('model maths', () => {
  it('calculates implied probability', () => expect(impliedProbability(2)).toBe(0.5));
  it('rejects invalid odds', () => expect(impliedProbability(1)).toBe(0));
  it('averages consensus', () => expect(consensusProbability([2, 2])).toBe(0.5));
  it('requires an outcome at every configured bookmaker', () => {
    const event = {
      id:'1', sport_key:'soccer', sport_title:'League', commence_time:'2026-01-01', home_team:'A', away_team:'B',
      bookmakers:[
        {title:'one', markets:[{key:'h2h', outcomes:[{name:'A', price:2}]}]},
        {title:'two', markets:[{key:'h2h', outcomes:[{name:'A', price:2}]}]},
        {title:'three', markets:[{key:'h2h', outcomes:[{name:'B', price:2}]}]},
      ],
    };
    expect(selectionsFromEvent(event)).toEqual([]);
  });
});
