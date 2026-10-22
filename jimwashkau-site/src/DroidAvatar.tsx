import type { DroidId } from './DroidProfiles';
import { BB9EBody, BB9EHead } from './BB9EModel';

// One approved model for solo nursery moments and shared playdates.
export function DroidAvatar({ resident, activity = 'up', pastime, mood = 'up' }: { resident: DroidId; activity?: string; pastime?: {id: string} | null; mood?: string }) {
  return <>
        <g className="bb8-body">{resident === 'bb9e' ? <g transform="translate(158 6)"><BB9EBody/></g> : <> <circle cx="478" cy="340" r="94" fill="url(#bb8-ball)" stroke="#909993" strokeWidth="2"/>
          <circle cx="478" cy="340" r="67" fill="#d68a45"/><circle cx="478" cy="340" r="49" fill="#ddddce" stroke="#b86d31" strokeWidth="4"/>
          <circle cx="478" cy="340" r="31" fill="#8d9793"/><circle cx="478" cy="340" r="21" fill="#bfc6bd"/>
          <path d="M471 276v20m14-20v20m-72 37h20m-20 14h20m87-14h20m-20 14h20m-69 39v20m14-20v20" stroke="#b6b8a9" strokeWidth="6"/>
          <path d="M400 302q-10 39 0 72m155-72q10 39 0 72" stroke="#d68943" strokeWidth="15" fill="none"/>
          <path d="M446 252q30-10 58 0m-58 176q30 10 58 0" stroke="#aeb6ac" strokeWidth="3" fill="none"/>
          <circle cx="461" cy="328" r="3" fill="#59665f"/><circle cx="494" cy="353" r="3" fill="#59665f"/>
 </>}</g>
        <g className="bb8-head">{resident === 'bb9e' ? <g transform="translate(158 6)"><BB9EHead sleeping={activity === 'sleeping'} waking={pastime?.id === 'waking'} dozing={pastime?.id === 'dozing'} hello={mood === 'hello'}/></g> : <> <path className="bb8-antenna" d="M453 225v-72" stroke="#b7bfb3" strokeWidth="4"/><path d="M450 154h6" stroke="#454d49" strokeWidth="6"/><path d="M468 219v-48" stroke="#b7bfb3" strokeWidth="3"/>
          <path d="M413 261a65 65 0 0 1 130 0z" fill="url(#bb8-ball)" stroke="#a0a69d" strokeWidth="2"/>
          <path d="M417 239h120" stroke="#d88b45" strokeWidth="10"/><path d="M426 216h101" stroke="#919d99" strokeWidth="5"/>
          <path d="M413 258h130v12q-65 19-130 0z" fill="#a5aca2"/><path d="M416 263h124" stroke="#cf823f" strokeWidth="4"/>
          <circle cx="476" cy="235" r="24" fill="#d5d5c7"/><circle cx="476" cy="235" r="19" fill="#2c393a"/><circle cx="476" cy="235" r="13" fill="#111e23"/><ellipse cx="471" cy="228" rx="6" ry="4" fill="#6e8b94"/>
          {activity === 'sleeping' && pastime?.id !== 'waking' && <><circle cx="476" cy="235" r="15" fill="#586660"/><path d="M463 235q13 7 26 0" fill="none" stroke="#263831" strokeWidth="3" strokeLinecap="round"/></>}
          {pastime?.id === 'waking' && <path className="bb8-half-lens" d="M461 235a15 15 0 0 1 30 0z" fill="#586660"/>}
          {pastime?.id === 'dozing' && <g className="bb8-doze-lens"><circle cx="476" cy="235" r="15" fill="#586660"/><path d="M463 235q13 7 26 0" fill="none" stroke="#263831" strokeWidth="3" strokeLinecap="round"/></g>}
          <circle cx="518" cy="249" r="8" fill="#344341"/><circle cx="519" cy="247" r="3" fill="#90b1b3"/>
          <circle className="bb8-led" cx="443" cy="249" r="3" fill="#f58b55"/>
 </>}</g>
  </>;
}
