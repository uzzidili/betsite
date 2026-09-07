import type {Bookmaker, Event, Selection} from './types';
import {config} from './config';

export const impliedProbability = (odds: number) => odds > 1 ? 1 / odds : 0;
export function consensusProbability(prices: number[]) {
  const probabilities = prices.filter((price) => Number.isFinite(price) && price > 1).map(impliedProbability);
  if (!probabilities.length) return 0;
  return probabilities.reduce((sum, probability) => sum + probability, 0) / probabilities.length;
}
const priceScore = (odds: number) => 1 - Math.abs(odds - config.targetOdds) / Math.max(config.targetOdds - config.minOdds, config.maxOdds - config.targetOdds);
function bookmakersFor(event: Event, market: string) { return (event.bookmakers ?? []).filter((bookmaker: Bookmaker) => bookmaker.markets?.some((item) => item.key === market)); }
export function selectionsFromEvent(event: Event) {
  const selections: Selection[] = [];
  for (const market of config.markets) {
    const books = bookmakersFor(event, market);
    if (books.length < config.minBookmakers) continue;
    const outcomes = new Map<string, {prices: number[]; best?: {price: number; bookmaker: string}}>();
    for (const book of books) for (const outcome of book.markets?.find((item) => item.key === market)?.outcomes ?? []) {
      if (!Number.isFinite(outcome.price) || outcome.price <= 1) continue;
      const row = outcomes.get(outcome.name) ?? {prices: []}; row.prices.push(outcome.price);
      if (!row.best || outcome.price > row.best.price) row.best = {price: outcome.price, bookmaker: book.title}; outcomes.set(outcome.name, row);
    }
    for (const [name, row] of outcomes) {
      if (!row.best || row.prices.length < config.minBookmakers) continue;
      const odds = row.best.price; if (odds < config.minOdds || odds > config.maxOdds) continue;
      const modelProbability = consensusProbability(row.prices); const implied = impliedProbability(odds); const edge = modelProbability - implied;
      if (edge < config.minEdge || edge < config.minModelGap) continue;
      selections.push({eventId:event.id,event:`${event.home_team} vs ${event.away_team}`,league:event.sport_title,country:'Global',kickoff:event.commence_time,market,selection:name,bookmaker:row.best.bookmaker,odds,impliedProbability:implied,modelProbability,edge,score:edge * 100 + priceScore(odds)});
    }
  }
  return selections;
}
