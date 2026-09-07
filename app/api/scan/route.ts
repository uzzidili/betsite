import {NextResponse} from 'next/server';
import {config} from '../../../lib/config';
import {discoverFootballSports,fetchOddsForSport} from '../../../lib/odds-api';
import {selectionsFromEvent} from '../../../lib/model';
import {buildAccas} from '../../../lib/acca';
export const dynamic='force-dynamic';
export async function GET(){try{if(!config.apiKey)return NextResponse.json({ok:false,error:'ODDS_API_KEY is not configured'},{status:503}); const sports=await discoverFootballSports(); const sportResults=await Promise.all(sports.map(s=>fetchOddsForSport(s.key).catch(()=>[]))); const events=sportResults.flat(); const selections=events.flatMap(selectionsFromEvent).sort((a,b)=>b.score-a.score).slice(0,config.maxSelections); return NextResponse.json({ok:true,scannedSports:sports.length,events:events.length,selections,twoLeg:buildAccas(selections,2),threeLeg:buildAccas(selections,3),generatedAt:new Date().toISOString()});}catch(error){return NextResponse.json({ok:false,error:error instanceof Error?error.message:'Unknown error'},{status:502});}}
