import {describe,it,expect} from 'vitest'; import {impliedProbability,consensusProbability} from '../lib/model';
describe('model maths',()=>{it('calculates implied probability',()=>expect(impliedProbability(2)).toBe(0.5));it('averages consensus probabilities',()=>expect(consensusProbability([2,2])).toBe(0.5));});
