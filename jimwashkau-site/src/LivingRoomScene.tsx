import type { CSSProperties, RefObject } from 'react';
import { DroidAvatar } from './DroidAvatar';
import { BB9EDefs } from './BB9EModel';
import { SolarWindowBody } from './BB8SolarWindow';
import type { SolarWindowId } from './BB8SolarSystem';
import { livingRoomBpm } from './LivingRoomMusic';
import './LivingRoomSessions.css';

export function LivingRoomScene({sceneRef,windowBody,night,doubleNod}: {sceneRef:RefObject<SVGSVGElement|null>;windowBody:SolarWindowId;night:boolean;doubleNod:boolean}) {
  return <svg ref={sceneRef} className={`bb8-scene dad-living-room ${doubleNod?'is-double-nod':''} ${night?'is-night':''}`} style={{'--dad-beat':`${60/livingRoomBpm}s`} as CSSProperties} viewBox="0 0 960 650" role="img" aria-label="BB-8 and BB-9E gently dance together in a cozy living room" xmlns="http://www.w3.org/2000/svg">
    <defs><BB9EDefs/>
      <linearGradient id="dad-wall" x2="0" y2="1"><stop stopColor="#3d4a49"/><stop offset="1" stopColor="#747164"/></linearGradient>
      <radialGradient id="dad-warm-light"><stop stopColor="#edc791" stopOpacity=".2"/><stop offset="1" stopColor="#edc791" stopOpacity="0"/></radialGradient>
      <radialGradient id="bb8-ball" cx=".34" cy=".24" r=".75"><stop stopColor="#fff7e4"/><stop offset=".65" stopColor="#dedfcf"/><stop offset="1" stopColor="#939e96"/></radialGradient>
      <linearGradient id="dad-sky" x2="0" y2="1"><stop stopColor="#182932"/><stop offset="1" stopColor="#394b50"/></linearGradient>
      <clipPath id="bb8-rain-window"><rect x="607" y="73" width="240" height="208" rx="98"/></clipPath>
    </defs>
    <rect width="960" height="650" fill="url(#dad-wall)"/>
    <path d="M0 435h960v215H0Z" fill="#59605a"/><path d="M0 521h960M0 602h960" stroke="#c2bd9f" strokeWidth="2" opacity=".1"/>
    <rect x="592" y="58" width="270" height="238" rx="108" fill="#26383d" stroke="#aaa38e" strokeWidth="13"/><rect x="607" y="73" width="240" height="208" rx="98" fill="url(#dad-sky)"/>
    {[[641,131],[687,97],[783,116],[822,167],[679,216],[771,245],[658,179]].map(([x,y])=><circle key={x} cx={x} cy={y} r="1.5" fill="#e4dec0" opacity=".65"/>)}<SolarWindowBody body={windowBody}/>
    <g className="dad-star-projector" fill="#e3d3a8" opacity=".23">{[[400,126],[484,210],[554,92],[353,174],[875,330]].map(([x,y])=><path key={x} transform={`translate(${x} ${y})`} d="m0-7 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/>)}</g>
    <circle cx="242" cy="328" r="330" fill="url(#dad-warm-light)"/>
    <ellipse cx="540" cy="547" rx="322" ry="62" fill="#9da99a"/><ellipse cx="540" cy="547" rx="294" ry="47" fill="none" stroke="#c3cbb0" strokeWidth="3" opacity=".6"/>
    <path d="M119 386v-50q0-34 37-34h248q34 0 34 34v100H119Z" fill="#9aab97" stroke="#718875" strokeWidth="5"/>
    <path d="M103 365q26-13 40 4v62h280v-62q20-22 41-1v99H103Z" fill="#849b88" stroke="#698571" strokeWidth="4"/><path d="M124 464v27m318-27v27" stroke="#b1a18a" strokeWidth="10" strokeLinecap="round"/>
    <path d="M104 141v314m-27 0h55M65 177q38-90 78 0Z" fill="#cbb38b" stroke="#bfa780" strokeWidth="4"/><circle cx="105" cy="178" r="105" fill="url(#dad-warm-light)"/>
    <g transform="translate(440 512) scale(.86)"><g className="dad-droid-dance dad-little-bb8"><g transform="translate(-478 -434)"><DroidAvatar resident="bb8"/></g></g></g>
    <g transform="translate(655 512) scale(.86)"><g className="dad-droid-dance dad-little-bb9e"><g transform="translate(-478 -434)"><DroidAvatar resident="bb9e"/></g></g></g>
    <path d="M300 515q38-20 76 0v23q-38 13-76 0Z" fill="#c8b393" stroke="#e0cfac" strokeWidth="3"/>
    <g aria-label="A little speaker playing mellow house"><rect x="80" y="522" width="59" height="73" rx="10" fill="#425a53" stroke="#9eaf9b" strokeWidth="3"/><circle cx="110" cy="563" r="16" fill="#789184" stroke="#b2bfa7" strokeWidth="2"/><circle cx="110" cy="563" r="6" fill="#425a53"/><circle cx="110" cy="537" r="4" fill="#ddc18b"/></g>
    <g transform="translate(260 344)" aria-label="A stuffed bear enjoying the little dance session"><ellipse cy="36" rx="19" ry="25" fill="#c8ac81"/><circle cx="-12" cy="-7" r="8" fill="#b49570"/><circle cx="12" cy="-7" r="8" fill="#b49570"/><circle cy="7" r="20" fill="#d5b98d"/><circle cx="-6" cy="4" r="2" fill="#556b53"/><circle cx="6" cy="4" r="2" fill="#556b53"/><path d="M-4 13q4 5 8 0" stroke="#8b7555" strokeWidth="2" fill="none"/></g>
    <rect width="960" height="650" fill="#162e29" opacity={night ? .28 : 0} pointerEvents="none"/>
  </svg>;
}
export function LivingRoomControls({enabled,volume,playing,onToggle,onVolume,onResume}: {enabled:boolean;volume:number;playing:boolean;onToggle:()=>void;onVolume:(value:number)=>void;onResume:()=>void}) {
  return <section className={`dad-session-controls ${enabled?'is-on':''}`} aria-label="Living Room Sessions"><div className="dad-session-heading"><div><h3>Dad &amp; Droids: Living Room Sessions</h3><p>A soft house groove. Tiny wobbles. A little time together.</p></div><button type="button" role="switch" aria-checked={enabled} aria-label="Dad & Droids: Living Room Sessions" onClick={onToggle}><span className="dad-toggle-track" aria-hidden="true"><i/></span>{enabled?'On':'Off'}</button></div>{enabled && <><label className="dad-session-volume">Session volume <input aria-label="Living Room Sessions volume" type="range" min="0" max="100" value={volume} onChange={event=>onVolume(Number(event.target.value))}/><span>{volume}%</span></label><p role="status">{playing?volume===0?'Music muted. Still sharing a little sway.':'Mellow house playing · nursery adventures are taking a little pause.':'The room is ready. Tap to start the music.'}</p>{!playing && <button className="dad-resume-music" onClick={onResume}>Start session music</button>}</>}</section>;
}
