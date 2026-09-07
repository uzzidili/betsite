import {NextResponse} from 'next/server';
import {buildAccas} from '../../../lib/acca';
import {config} from '../../../lib/config';
import {selectionsFromEvent} from '../../../lib/model';
import {discoverFootballSports, fetchOddsForSport} from '../../../lib/odds-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!config.apiKey) return NextResponse.json({ok:false, error:'ODDS_API_KEY is not configured'}, {status:503});
    const sports = await discoverFootballSports();
    const results = await Promise.allSettled(sports.map((sport) => fetchOddsForSport(sport.key)));
    const events = results.flatMap((result) => result.status === 'fulfilled' ? result.value : []);
    const selections = events.flatMap(selectionsFromEvent).sort((a, b) => b.score - a.score).slice(0, config.maxSelections);
    return NextResponse.json({ok:true, scannedSports:sports.length, events:events.length, selections, twoLeg:buildAccas(selections, 2), threeLeg:buildAccas(selections, 3), generatedAt:new Date().toISOString()});
  } catch (error) {
    return NextResponse.json({ok:false, error:error instanceof Error ? error.message : 'Unknown error'}, {status:502});
  }
}
