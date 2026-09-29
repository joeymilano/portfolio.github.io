export const ROUND_MS=45000;
export const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function newRound(seed=1){return {elapsed:0,score:0,combo:0,x:.5,y:.5,lights:[],seed:seed>>>0||1,spawn:0,finished:false,nextId:0};}
function random(state){state.seed=(Math.imul(state.seed,1664525)+1013904223)>>>0;return state.seed/4294967296;}
export function moveFrame(state,x,y){state.x=clamp(x,.12,.88);state.y=clamp(y,.14,.86);return state;}
export function stepRound(state,dt){if(state.finished)return state;const step=clamp(Number.isFinite(dt)?dt:0,0,ROUND_MS-state.elapsed);state.elapsed+=step;state.spawn+=step;while(state.spawn>=720&&state.elapsed<ROUND_MS){state.spawn-=720;state.lights.push({id:++state.nextId,x:.11+random(state)*.78,y:.16+random(state)*.68,age:0});}for(const light of state.lights)light.age+=step;state.lights=state.lights.filter(light=>light.age<1900);if(state.elapsed>=ROUND_MS)state.finished=true;return state;}
export function captureLight(state){if(state.finished)return false;let index=-1,best=Infinity;for(let i=0;i<state.lights.length;i++){const light=state.lights[i],dx=Math.abs(light.x-state.x),dy=Math.abs(light.y-state.y);if(dx<=49/640&&dy<=39/380&&Math.hypot(dx,dy)<best){best=Math.hypot(dx,dy);index=i;}}if(index<0){state.combo=0;return false;}state.lights.splice(index,1);state.combo++;state.score+=10+Math.min(40,(state.combo-1)*5);return true;}
