import test from 'node:test';
import assert from 'node:assert/strict';
import {moveView,viewOffset} from '../explore/camera-control.mjs';
test('repeated input stays within the safe camera envelope',()=>{let v={x:0,y:0};for(let i=0;i<1000;i++)v=moveView(v,.2,-.2);assert.deepEqual(v,{x:1,y:-1});assert.deepEqual(moveView(v,-100,100),{x:-1,y:1});});
test('mobile horizontal range is narrower and neutral view has no offset',()=>{assert.deepEqual(viewOffset({x:0,y:0}),{yaw:0,pitch:0});assert.ok(viewOffset({x:1,y:1},true).yaw<viewOffset({x:1,y:1}).yaw);assert.equal(viewOffset({x:1,y:1}).pitch,.10);});
