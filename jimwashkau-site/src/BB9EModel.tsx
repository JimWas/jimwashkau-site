// Shared by the approved model preview, nursery, and default photo portraits.
export function BB9EDefs() { return <>
            <radialGradient id="nine-shell" cx=".28" cy=".2" r=".85"><stop stopColor="#748078"/><stop offset=".4" stopColor="#3e4b43"/><stop offset="1" stopColor="#1b2923"/></radialGradient>
            <linearGradient id="nine-cap" x2="0" y2="1"><stop stopColor="#526258"/><stop offset="1" stopColor="#22342a"/></linearGradient>
            <radialGradient id="nine-lens"><stop stopColor="#e0a38c"/><stop offset=".5" stopColor="#b8796e"/><stop offset="1" stopColor="#654840"/></radialGradient>
  </>; }
export function BB9EBody() { return <>
      <circle cx="320" cy="334" r="102" fill="url(#nine-shell)" stroke="#76817a" strokeWidth="2.5"/>
      <path d="M254 259q-25 15-32 51m195 30q-4 43-35 69" fill="none" stroke="#b8c0b6" strokeWidth="5" opacity=".35"/>
      <circle cx="320" cy="334" r="72" fill="#a7afa4" stroke="#53615a" strokeWidth="5"/>
      <path d="m293 273 54 0 35 35v52l-35 35h-54l-35-35v-52z" fill="#2d3833" stroke="#d0d4c5" strokeWidth="4"/>
      <circle cx="320" cy="334" r="37" fill="#4c5c52" stroke="#88998a" strokeWidth="3"/>
      <circle cx="320" cy="334" r="23" fill="#26332e" stroke="#626f61" strokeWidth="2"/>
      <circle cx="320" cy="334" r="8" fill="#9aab98"/>
      <path d="M283 279l13 13m48-13-13 13m-52 82 13-13m57 13-13-13" stroke="#d2d5c7" strokeWidth="8"/>
      <path d="M315 239v17m12-17v17m-101 72h17m-17 12h17m154-12h17m-17 12h17m-99 73v17m12-17v17" stroke="#929f92" strokeWidth="5"/>
      <path d="M234 286q-12 22-12 49m184 45q-11 24-29 38" fill="none" stroke="#22312a" strokeWidth="11"/>
      <circle cx="280" cy="326" r="3" fill="#b4c0ac"/><circle cx="360" cy="342" r="3" fill="#b4c0ac"/>
  </>; }
export function BB9EHead({ sleeping = false, waking = false, dozing = false, hello = false }: { sleeping?: boolean; waking?: boolean; dozing?: boolean; hello?: boolean }) { return <>
      <path className="nine-antenna" d="M343 177v-49" stroke="#aab7a6" strokeWidth="4"/><path d="M340 128h6" stroke="#46574b" strokeWidth="6"/>
      <path d="M250 205 269 176h99l22 29v48q-70 20-140 0z" fill="url(#nine-cap)" stroke="#8d9b8d" strokeWidth="2.5"/>
      <path d="m250 205 20-29h98l22 29z" fill="#aab3a5"/>
      <path d="m269 176 12-8h74l13 8" fill="#c4c9b9" stroke="#8e9c8b" strokeWidth="2"/>
      <path d="M254 207h132m-132 43q65 16 132 0" stroke="#b5bdac" strokeWidth="5" fill="none"/>
      <path d="M265 211v32m104-32v32" stroke="#5e7060" strokeWidth="3"/>
      <circle cx="306" cy="229" r="29" fill="#a7b19f"/>
      <circle cx="306" cy="229" r="24" fill="#1d2724" stroke="#536559" strokeWidth="3"/>
      <circle className="nine-eye-glow" cx="306" cy="229" r="17" fill="url(#nine-lens)"/>
      {sleeping && !waking ? <><circle cx="306" cy="229" r="18" fill="#46554a"/><path d="M291 231q15 9 30 0" fill="none" stroke="#c38b7e" strokeWidth="3" strokeLinecap="round"/></> : <><circle cx="306" cy="229" r="9" fill="#e6a294"/><ellipse cx="301" cy="222" rx="5" ry="3" fill="#f9d6bd" opacity=".9"/></>}
      <circle cx="355" cy="235" r="9" fill="#15251e" stroke="#9caa96" strokeWidth="2"/><circle cx="356" cy="233" r="3" fill="#a6c4b0"/>
      <path d="M269 251h7m64 4h10" stroke="#c4cbbb" strokeWidth="3"/>
      {hello && <><ellipse cx="270" cy="239" rx="6" ry="3" fill="#c18f7b" opacity=".6"/><path className="nine-heart" d="M394 196q-27-20-17-29q10-6 17 7q7-13 17-7q10 9-17 29" fill="#cea78e"/></>}
      {waking && <path d="M289 229a17 17 0 0 1 34 0z" fill="#46554a" className="bb8-half-lens"/>}
      {dozing && <g className="bb8-doze-lens"><circle cx="306" cy="229" r="18" fill="#46554a"/><path d="M291 231q15 9 30 0" fill="none" stroke="#c38b7e" strokeWidth="3" strokeLinecap="round"/></g>}
  </>; }
