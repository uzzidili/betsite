import type {Event} from './types';
import {config} from './config';
const BASE='https://api.the-odds-api.com/v4';
async function getJson<T>(url:string){const r=await fetch(url,{cache:'no-store'}); if(!r.ok)throw new Error(`Odds API ${r.status}: ${await r.text()}`); return r.json() as Promise<T>;}
export async function discoverFootballSports(){if(!config.apiKey)throw new Error('ODDS_API_KEY is not configured'); const sports=await getJson<{key:string;title:string;group:string;active:boolean}[]>(`${BASE}/sports/?apiKey=${encodeURIComponent(config.apiKey)}`); return sports.filter(s=>s.active&&/soccer|football/i.test(`${s.key} ${s.title} ${s.group}`));}
export async function fetchOddsForSport(sportKey:string){const qs=new URLSearchParams({apiKey:config.apiKey,regions:config.regions.join(','),markets:config.markets.join(','),oddsFormat:'decimal'}); return getJson<Event[]>(`${BASE}/sports/${encodeURIComponent(sportKey)}/odds/?${qs}`);}
