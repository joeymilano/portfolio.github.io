import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveLightMode,shanghaiHour} from '../explore/light-mode.mjs';

const utc=hour=>new Date(Date.UTC(2026,8,29,hour,30));

test('a saved choice always wins over the clock',()=>{
 assert.equal(resolveLightMode('night',utc(4)),'night');
 assert.equal(resolveLightMode('day',utc(14)),'day');
});

test('without a saved choice the studio follows Shanghai time',()=>{
 assert.equal(shanghaiHour(utc(16)),0);
 assert.equal(resolveLightMode(null,utc(22)),'night'); // 06:30 in Shanghai
 assert.equal(resolveLightMode(null,utc(23)),'day');   // 07:30
 assert.equal(resolveLightMode(null,utc(10)),'day');   // 18:30
 assert.equal(resolveLightMode('bogus',utc(11)),'night'); // 19:30
});
