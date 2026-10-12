import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import ts from 'typescript';

const filename = new URL('../src/data/radioSchedule.ts', import.meta.url);
const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const exports = {};
vm.runInNewContext(source, { exports, require: createRequire(filename) });
const { getRadioPosition, radioTracks, radioEpoch, radioLoopDuration } = exports;

test('playlist has valid durations and unique audio files', () => {
  assert.equal(radioTracks.length, 88);
  assert.equal(new Set(radioTracks.map(track => track.file)).size, radioTracks.length);
  for (const track of radioTracks) assert.ok(track.duration > 0 && Number.isFinite(track.duration));
});

test('station starts at the epoch and advances at each boundary', () => {
  assert.equal(getRadioPosition(radioEpoch).index, 0);
  assert.equal(getRadioPosition(radioEpoch).offset, 0);
  let elapsed = 0;
  for (let index = 0; index < radioTracks.length; index += 1) {
    assert.equal(getRadioPosition(radioEpoch + elapsed * 1000 + 10).index, index);
    elapsed += radioTracks[index].duration;
  }
});

test('station loops and listeners joining later share the same position', () => {
  const now = radioEpoch + 123456;
  const first = getRadioPosition(now);
  const nextLoop = getRadioPosition(now + radioLoopDuration * 1000);
  assert.equal(first.index, nextLoop.index);
  assert.ok(Math.abs(first.offset - nextLoop.offset) < 0.001);
  const later = getRadioPosition(now + 1000);
  assert.equal(first.index, later.index);
  assert.ok(Math.abs(later.offset - first.offset - 1) < 0.001);
});

test('clock times before the epoch still produce a valid position', () => {
  const position = getRadioPosition(radioEpoch - 1000);
  assert.equal(position.index, radioTracks.length - 1);
  assert.ok(Math.abs(position.offset - (radioTracks.at(-1).duration - 1)) < 0.001);
});
