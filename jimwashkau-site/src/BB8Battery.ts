export type BatteryActivity = 'sleeping' | 'idle' | 'busy' | 'up';
export type BatteryState = { level: number; updatedAt: number; activity: BatteryActivity };
const storageKey = 'bb8-battery';
const drainPerHour = { idle: 3, up: 7, busy: 12 };

// Sleeping charges quickly to 80%, then gently tops up like a real battery.
export function advanceBattery(state: BatteryState, now: number): BatteryState {
  const hours = Math.max(0, now - state.updatedAt) / 3_600_000;
  let level = state.level;
  if (state.activity === 'sleeping') {
    const fastHours = Math.min(hours, Math.max(0, 80 - level) / 30);
    level += fastHours * 30 + (hours - fastHours) * 10;
  } else {
    level -= hours * drainPerHour[state.activity];
  }
  return { ...state, level: Math.max(0, Math.min(100, level)), updatedAt: now };
}

export function readBattery(): BatteryState {
  const now = Date.now();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved && Number.isFinite(saved.level) && saved.level >= 0 && saved.level <= 100 && Number.isFinite(saved.updatedAt) && ['sleeping', 'idle', 'busy', 'up'].includes(saved.activity)) {
      const state = advanceBattery(saved, now);
      // An unattended droid settles onto his charger before running flat.
      if (state.activity !== 'sleeping' && state.level <= 15) {
        const untilLow = Math.max(0, saved.level - 15) / drainPerHour[state.activity as keyof typeof drainPerHour] * 3_600_000;
        return advanceBattery({ level: Math.min(saved.level, 15), activity: 'sleeping', updatedAt: saved.updatedAt + untilLow }, now);
      }
      return state;
    }
  } catch { /* The simulation also works without browser storage. */ }
  return { level: 98, updatedAt: now, activity: 'up' };
}

export function saveBattery(state: BatteryState) {
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Keep running in memory. */ }
}
