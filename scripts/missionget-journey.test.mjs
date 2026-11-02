import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, transition, scenarios } from '../assets/missionget/journey.mjs';
test('a selected request cannot execute before recognition and human review', () => {
  let state = initialState();
  assert.equal(transition(state, {type:'CONFIRM'}), state);
  state = transition(state, {type:'SELECT',scenario:1});
  assert.equal(transition(state, {type:'CONFIRM'}), state);
  state = transition(state, {type:'RECOGNIZED'});
  assert.equal(state.phase, 'review');
  assert.equal(transition(state, {type:'COMPLETE'}), state);
  state = transition(state, {type:'CONFIRM'});
  assert.equal(state.phase, 'running');
  state = transition(state, {type:'COMPLETE'});
  assert.deepEqual(state, {phase:'delivered',scenario:1});
});
test('reset rejects delayed callbacks and an invalid scene cannot replace a selection', () => {
  let state = transition(initialState(), {type:'SELECT',scenario:2});
  assert.equal(transition(state, {type:'SELECT',scenario:3}), state);
  assert.equal(transition(state, {type:'SELECT',scenario:-1}), state);
  state = transition(state, {type:'RESET'});
  assert.deepEqual(transition(state, {type:'RECOGNIZED'}), initialState());
  assert.deepEqual(transition(state, {type:'COMPLETE'}), initialState());
});
test('the explicit sample shortcut works before a scene is selected', () => {
  assert.deepEqual(transition(initialState(), {type:'SKIP'}), {phase:'delivered',scenario:0});
});
test('each locale and scene has a request, review details and a readable example document', () => {
  for (const lang of ['zh','en']) {
    assert.equal(scenarios[lang].length, 3);
    for (const scene of scenarios[lang]) {
      assert.ok(scene.utterance && scene.title && scene.detail && scene.file);
      assert.ok(scene.sections.length >= 3);
      assert.match(scene.file, /示例|example/);
    }
  }
});
