export const worldStorageKey = 'little-droid-world-v1';
export const keepsakeNames = { drawing: 'A wobbly heart drawing', flower: 'A folded paper flower', rocket: 'Their first paper spacecraft', treasure: 'One very special shiny bolt', ship: 'Their cardboard spaceship' } as const;
export type KeepsakeId = keyof typeof keepsakeNames;
export type NurseryWorld = { nickname: string; projectStage: number; keepsakes: {id: KeepsakeId; createdAt: number}[] };
export const projectStages = ['Ready to build the hull', 'Hull finished · windows next', 'Windows fitted · flag next', 'A spaceship built together!'];
export function cleanNickname(value: string) { return Array.from(value.trim().replace(/\s+/g, ' ')).slice(0,24).join(''); }
export function parseNurseryWorld(raw: string | null): NurseryWorld {
  try { const value = JSON.parse(raw || '{}');
    return {nickname: typeof value?.nickname === 'string' ? cleanNickname(value.nickname) : '', projectStage: Number.isInteger(value?.projectStage) ? Math.max(0, Math.min(3,value.projectStage)) : 0,
      keepsakes: Array.isArray(value?.keepsakes) ? value.keepsakes.filter((item: {id?: string; createdAt?: number}, index: number, all: {id?: string}[]) => item && typeof item.id === 'string' && Object.hasOwn(keepsakeNames,item.id) && typeof item.createdAt === 'number' && Number.isFinite(item.createdAt) && item.createdAt > 0 && all.findIndex(other => other?.id === item.id) === index).slice(0,5) : []};
  } catch { return {nickname:'',projectStage:0,keepsakes:[]}; }
}
export function readNurseryWorld(): NurseryWorld { try { return parseNurseryWorld(localStorage.getItem(worldStorageKey)); } catch { return parseNurseryWorld(null); } }
export function saveNurseryWorld(world: NurseryWorld) { try {localStorage.setItem(worldStorageKey,JSON.stringify(world));} catch { /* Keepsakes still last for this visit. */ } }
export function completeWorldMoment(world: NurseryWorld, activity: string, now: number, projectEligible: boolean): {world: NurseryWorld; note?: string; projectAdvanced: boolean} {
  let next = world; let note: string | undefined; let projectAdvanced = false;
  if (activity === 'playdate-project' && projectEligible && world.projectStage < 3) {
    next = {...world,projectStage:world.projectStage+1}; projectAdvanced = true;
    note = ['','They finished their cardboard hull. Next playdate: windows!','They fitted two little windows. Next playdate: a flag!','Their cardboard spaceship is finished, crooked flag and all. A new keepsake for their shelf.'][next.projectStage];
  }
  const craftMap: Record<string,KeepsakeId> = {'painting':'drawing','crayons':'drawing','gift-drawing':'drawing','gift-flower':'flower','paper':'rocket','rocket-lab':'rocket','gift-treasure':'treasure'};
  const artifact = next.projectStage === 3 && activity === 'playdate-project' ? 'ship' : craftMap[activity];
  if (artifact && !next.keepsakes.some(item=>item.id===artifact)) {
    next = {...next,keepsakes:[...next.keepsakes,{id:artifact,createdAt:now}]};
    note ||= `${keepsakeNames[artifact]} joined their memory shelf${next.nickname ? ` — a little memory for ${next.nickname}` : ''}.`;
  }
  return {world:next,note,projectAdvanced};
}
