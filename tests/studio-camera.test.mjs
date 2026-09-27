import test from 'node:test';
import assert from 'node:assert/strict';
import {moveView,viewOffset,wheelTurn} from '../explore/camera-control.mjs';
test('repeated input stays within the safe camera envelope',()=>{let v={x:0,y:0};for(let i=0;i<1000;i++)v=moveView(v,.2,-.2);assert.deepEqual(v,{x:1,y:-1});assert.deepEqual(moveView(v,-100,100),{x:-1,y:1});});
test('mobile horizontal range is narrower and neutral view has no offset',()=>{assert.deepEqual(viewOffset({x:0,y:0}),{yaw:0,pitch:0,pan:0});assert.ok(viewOffset({x:1,y:1},true).yaw<viewOffset({x:1,y:1}).yaw);assert.equal(viewOffset({x:1,y:1}).pitch,.10);});
test('mobile pans along the room instead of orbiting so left corners stay reachable',()=>{
 assert.equal(viewOffset({x:0,y:0},true).pan,0);
 assert.equal(viewOffset({x:-1,y:0},true).yaw,0);
 assert.equal(viewOffset({x:-1,y:0},true).pan,-3.6);
 assert.equal(viewOffset({x:1,y:0},true).pan,1);
 assert.equal(viewOffset({x:-1,y:0}).pan,0);
 assert.equal(viewOffset({x:-1,y:0}).yaw,-.22);
});
test('wheel steps turn the camera in both directions and remain bounded across input devices',()=>{
 assert.equal(wheelTurn(0,100),.12);
 assert.equal(wheelTurn(0,-100),-.12);
 assert.equal(wheelTurn(0,3,1),.0576);
 assert.equal(wheelTurn(0,1,2,800),.22);
 assert.ok(Math.abs(wheelTurn(20,0)-.024)<1e-10);
 assert.equal(wheelTurn(0,0),0);
});
