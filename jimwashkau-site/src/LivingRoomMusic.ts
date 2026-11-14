export const livingRoomBpm = 110;
const chords = [[57,60,64,67],[53,57,60,64],[48,55,59,64],[55,59,62,64]];
const roots = [45,41,36,43];
const frequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const safeVolume = (value:number) => Number.isFinite(value) ? Math.max(0,Math.min(100,value)) / 100 : 0;

// Original, locally synthesized mellow house. No streams, samples, or network requests.
export function startLivingRoomMusic(context: AudioContext, volume: number) {
  const bus=context.createGain();
  const compressor=context.createDynamicsCompressor();
  compressor.threshold.value=-20; compressor.knee.value=18; compressor.ratio.value=3;
  compressor.attack.value=.02; compressor.release.value=.3;
  bus.gain.setValueAtTime(0,context.currentTime);
  bus.gain.linearRampToValueAtTime(safeVolume(volume)*.65,context.currentTime+.8);
  bus.connect(compressor); compressor.connect(context.destination);
  const sources=new Set<AudioScheduledSourceNode>();
  const noise=context.createBuffer(1,Math.ceil(context.sampleRate*.09),context.sampleRate);
  const data=noise.getChannelData(0);
  for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length);
  let stopped=false;
  let step=0;
  let next=context.currentTime+.08;
  const eighth=60/livingRoomBpm/2;
  function voice(hz:number,time:number,duration:number,level:number,type:OscillatorType='sine',cutoff=1200) {
    const oscillator=context.createOscillator(), gain=context.createGain(), filter=context.createBiquadFilter();
    oscillator.type=type;oscillator.frequency.setValueAtTime(hz,time);
    filter.type='lowpass';filter.frequency.value=cutoff;
    gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(level,time+Math.min(.18,duration*.2));gain.gain.exponentialRampToValueAtTime(.0001,time+duration);
    oscillator.connect(filter);filter.connect(gain);gain.connect(bus);sources.add(oscillator);
    oscillator.onended=()=>{sources.delete(oscillator);oscillator.disconnect();filter.disconnect();gain.disconnect();};
    oscillator.start(time);oscillator.stop(time+duration+.02);
  }
  function kick(time:number) {
    const oscillator=context.createOscillator(), gain=context.createGain();
    oscillator.frequency.setValueAtTime(95,time);oscillator.frequency.exponentialRampToValueAtTime(43,time+.18);
    gain.gain.setValueAtTime(.0001,time);gain.gain.linearRampToValueAtTime(.13,time+.012);gain.gain.exponentialRampToValueAtTime(.0001,time+.28);
    oscillator.connect(gain);gain.connect(bus);sources.add(oscillator);
    oscillator.onended=()=>{sources.delete(oscillator);oscillator.disconnect();gain.disconnect();};oscillator.start(time);oscillator.stop(time+.3);
  }
  function hat(time:number,level:number) {
    const source=context.createBufferSource(), filter=context.createBiquadFilter(), gain=context.createGain();
    source.buffer=noise;filter.type='highpass';filter.frequency.value=5700;
    gain.gain.setValueAtTime(level,time);gain.gain.exponentialRampToValueAtTime(.0001,time+.07);
    source.connect(filter);filter.connect(gain);gain.connect(bus);sources.add(source);
    source.onended=()=>{sources.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};source.start(time);source.stop(time+.09);
  }
  function schedule() {
    if(stopped||context.state!=='running')return;
    // A delayed background timer resumes gently instead of playing missed beats in a burst.
    if(next<context.currentTime-.3)next=context.currentTime+.05;
    while(next<context.currentTime+.18) {
      const chord=Math.floor(step/32)%chords.length;
      const quietBreak=Math.floor(step/128)%4===3;
      if(step%32===0) chords[chord].forEach((note,i)=>voice(frequency(note),next+i*.035,eighth*31,.019,'triangle',850));
      if(step%2===0&&!quietBreak)kick(next);
      if(step%2===1)hat(next,quietBreak?.006:.012);
      if([0,3,6].includes(step%8)&&!quietBreak)voice(frequency(roots[chord]),next,.35,.075,'sine',400);
      if(step%16===10)voice(frequency(chords[chord][(Math.floor(step/16)+1)%4]+12),next,1.1,.023,'sine',1600);
      next+=eighth;step++;
    }
  }
  schedule();
  const timer=setInterval(schedule,30);
  return {
    setVolume(value:number) {if(!stopped&&context.state!=='closed')bus.gain.setTargetAtTime(safeVolume(value)*.65,context.currentTime,.12);},
    stop() {
      if(stopped)return;stopped=true;clearInterval(timer);
      if(context.state!=='closed') {
        bus.gain.cancelScheduledValues(context.currentTime);bus.gain.setTargetAtTime(.0001,context.currentTime,.18);
        for(const source of sources) {try{source.stop(context.currentTime+.9);}catch{/* Already ended. */}}
      }
      setTimeout(()=>{bus.disconnect();compressor.disconnect();sources.clear();},1000);
    },
  };
}
