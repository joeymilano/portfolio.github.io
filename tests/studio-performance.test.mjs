import test from 'node:test';
import assert from 'node:assert/strict';
import {shouldRender,isIdle,qualityProfile,advanceQuality} from '../explore/performance.mjs';

test('elapsed scheduler renders 30 fps on both 60 Hz and 120 Hz callbacks',()=>{
 for(const hz of [60,120]){let last=-Infinity,count=0;for(let i=0;i<hz*5;i++){const now=i*1000/hz;if(shouldRender(now,last,true)){last=now;count++;}}assert.ok(count>=149&&count<=151,`${hz} Hz yielded ${count}`);}
});
test('active mode caps 120 Hz callbacks at 60 fps and input forces the next frame',()=>{
 let last=-Infinity,count=0;for(let i=0;i<120*3;i++){const now=i*1000/120;if(shouldRender(now,last,false)){last=now;count++;}}assert.ok(count>=179&&count<=181);
 assert.equal(shouldRender(1005,1000,true,true),true);
});
test('idle requires quiet input, settled camera and light, and finished transitions',()=>{
 const state={now:5000,lastInput:2000,selected:'about',cameraDistance:.001,lookDistance:.001,transitioning:false,lightMix:1,quality:0};
 assert.equal(isIdle(state),true);
 assert.equal(isIdle({...state,quality:3}),true);
 for(const change of [{lastInput:4000},{cameraDistance:.02},{lookDistance:.02},{transitioning:true},{lightMix:.5}])assert.equal(isIdle({...state,...change}),false);
});
test('quality steps down only after two poor full-speed samples and recovers after sustained good samples',()=>{
 let state={level:0,low:0,high:0};state=advanceQuality(state,42,4);assert.equal(state.level,0);
 state=advanceQuality(state,42,4);assert.equal(state.level,1);
 state=advanceQuality(state,30,4,false);assert.equal(state.level,1);
 state=advanceQuality(state,60,4);state=advanceQuality(state,60,4);assert.equal(state.level,1);
 state=advanceQuality(state,60,4);assert.equal(state.level,0);
});
test('quality tiers lower pixel ratio, then shadow size, then shadow updates',()=>{
 assert.deepEqual(qualityProfile(0,false),{ratio:2,shadowSize:2048,shadowUpdates:true});
 assert.deepEqual(qualityProfile(4,false),{ratio:1,shadowSize:1024,shadowUpdates:false});
 assert.deepEqual(qualityProfile(0,true),{ratio:1.5,shadowSize:1024,shadowUpdates:true});
 assert.deepEqual(qualityProfile(2,true),{ratio:1,shadowSize:1024,shadowUpdates:false});
});
