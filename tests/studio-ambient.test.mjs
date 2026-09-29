import test from 'node:test';
import assert from 'node:assert/strict';
import {loopBounds,resolveSound,soundLevel} from '../explore/ambient.mjs';

test('room sound stays off unless the visitor turned it on',()=>{
 for(const value of [null,'','off','yes'])assert.equal(resolveSound(value),false);
 assert.equal(resolveSound('on'),true);
});

test('room sound is silent when muted, hidden, or while the music shelf plays',()=>{
 assert.ok(soundLevel({on:true,hidden:false,selected:null})>0);
 assert.ok(soundLevel({on:true,hidden:false,selected:'work'})>0);
 assert.equal(soundLevel({on:false,hidden:false,selected:null}),0);
 assert.equal(soundLevel({on:true,hidden:true,selected:null}),0);
 assert.equal(soundLevel({on:true,hidden:false,selected:'music'}),0);
});

test('the loop skips codec silence at both edges but keeps quiet audible passages',()=>{
 const samples=new Float32Array(1000).fill(.2);samples.fill(0,0,20);samples.fill(0,960);samples[500]=0;
 assert.deepEqual(loopBounds(samples,1000),{start:.02,end:.96});
 assert.deepEqual(loopBounds(new Float32Array(1000).fill(.2),1000),{start:0,end:1});
});
