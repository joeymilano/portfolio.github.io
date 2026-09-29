import test from 'node:test';
import assert from 'node:assert/strict';
import {createTracker,sourceOf} from '../explore/analytics.mjs';

function harness(){let clock=0;const sent=[];const tracker=createTracker((name,params,opts)=>sent.push({name,params,opts}),()=>clock);return {tracker,sent,tick:ms=>{clock+=ms}}}

test('open then close reports the source and panel dwell',()=>{
 const {tracker,sent,tick}=harness();
 tracker.source('hotspot');tracker.select('about');tick(4200);tracker.select(null);
 assert.deepEqual(sent.map(e=>e.name),['studio_open','studio_close']);
 assert.deepEqual(sent[0].params,{item:'about',source:'hotspot',objects_seen:1});
 assert.deepEqual(sent[1].params,{item:'about',dwell_ms:4200});
});

test('re-selecting the open item is ignored and switching closes the previous panel',()=>{
 const {tracker,sent,tick}=harness();
 tracker.select('work');tracker.select('work');tick(1000);tracker.source('panel');tracker.select('music');
 assert.deepEqual(sent.map(e=>e.name),['studio_open','studio_close','studio_open']);
 assert.equal(sent[0].params.source,'other');
 assert.deepEqual(sent[2].params,{item:'music',source:'panel',objects_seen:2});
});

test('a source is consumed by one open, and closing clears a stale source',()=>{
 const {tracker,sent}=harness();
 tracker.source('nav');tracker.select(null);tracker.select('books');
 assert.equal(sent[0].params.source,'other');
});

test('look-around fires once and the session summary closes any open panel',()=>{
 const {tracker,sent,tick}=harness();
 tick(900);tracker.look();tracker.look();tracker.select('games');tick(500);tracker.end();
 assert.deepEqual(sent.map(e=>e.name),['studio_look_around','studio_open','studio_close','studio_session_end']);
 assert.deepEqual(sent[3].params,{objects_seen:1,looked_around:true,engaged_ms:1400});
 assert.deepEqual(sent[3].opts,{beacon:true});
});

test('sourceOf maps studio regions and tolerates non-elements',()=>{
 const node=hit=>({closest:selector=>selector===hit?{}:null});
 assert.equal(sourceOf(node('.hotspots')),'hotspot');
 assert.equal(sourceOf(node('#studio-navigation')),'nav');
 assert.equal(sourceOf(node('.loading-links')),'quick_link');
 assert.equal(sourceOf(node('#content-panel')),'panel');
 assert.equal(sourceOf(node('nowhere')),'other');
 assert.equal(sourceOf(null),'other');
});
