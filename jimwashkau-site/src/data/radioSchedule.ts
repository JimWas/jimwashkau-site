import playlist from './radioPlaylist.json';

export const radioTracks = playlist.tracks;
export const radioEpoch = Date.parse(playlist.epoch);
export const radioLoopDuration = radioTracks.reduce((sum, track) => sum + track.duration, 0);
export const radioAudioBase = 'https://raw.githubusercontent.com/JimWas/JimWashkauRadio/60ed7cf/tracks/';

export function getRadioPosition(now: number) {
  let offset = (((now - radioEpoch) / 1000) % radioLoopDuration + radioLoopDuration) % radioLoopDuration;
  for (let index = 0; index < radioTracks.length; index += 1) {
    if (offset < radioTracks[index].duration) return { index, offset };
    offset -= radioTracks[index].duration;
  }
  return { index: 0, offset: 0 };
}
