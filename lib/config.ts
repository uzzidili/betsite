function num(name:string, fallback:number){const v=Number(process.env[name]); return Number.isFinite(v)?v:fallback;}
export const config={
 apiKey:process.env.ODDS_API_KEY ?? '',
 regions:(process.env.ODDS_REGIONS??'uk,eu').split(',').map(s=>s.trim()).filter(Boolean),
 markets:(process.env.ODDS_MARKETS??'h2h').split(',').map(s=>s.trim()).filter(Boolean),
 minBookmakers:num('MIN_BOOKMAKERS',3), minOdds:num('TARGET_ODDS_MIN',1.9), maxOdds:num('TARGET_ODDS_MAX',2.1), targetOdds:num('TARGET_ODDS_CENTRE',2), minEdge:num('MIN_EDGE',0.035), minModelGap:num('MIN_MODEL_GAP',0.025), maxSelections:num('MAX_SELECTIONS',40), maxAccas:num('MAX_ACCAS',12), blockSameEvent:(process.env.BLOCK_SAME_EVENT_COMBINATIONS??'true')!=='false'
};
