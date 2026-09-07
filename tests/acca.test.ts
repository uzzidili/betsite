import {describe,it,expect} from 'vitest'; import {buildAccas} from '../lib/acca';
const s=(id:string,eventId:string,score:number)=>({eventId,event:`${eventId} game`,league:'L',country:'C',kickoff:new Date().toISOString(),market:'h2h',selection:id,bookmaker:'B',odds:2,impliedProbability:.5,modelProbability:.55,edge:.05,score});
describe('accas',()=>{it('blocks same event',()=>{const x=buildAccas([s('a','e1',9),s('b','e1',8),s('c','e2',7)],2); expect(x.some(a=>a.legs.filter(l=>l.eventId==='e1').length>1)).toBe(false);});});
