import { useId } from 'react';

import { solarWindowBodies, type SolarWindowId } from './BB8SolarSystem';

// A softly colored storybook view, clipped to the existing nursery porthole.
export function SolarWindowBody({body='moon'}: {body?:SolarWindowId}) {
  const uid=useId().replace(/:/g,'');
  const globe=`solar-globe-${uid}`;
  const shade=`solar-shade-${uid}`;
  const object=solarWindowBodies.find(item=>item.id===body)!;
  const r=body==='sun'?43:body==='jupiter'?45:body==='saturn'?34:body==='mercury'?26:body==='moon'?35:38;
  return <g className="bb8-solar-object" clipPath="url(#bb8-rain-window)" aria-label={`${object.name} outside the nursery window`}>
    <title>{object.name} — {object.fact}</title>
    <defs>
      <clipPath id={globe}><circle cx="747" cy="169" r={r}/></clipPath>
      <radialGradient id={shade} cx=".3" cy=".26" r=".8"><stop stopColor="#fff5d8" stopOpacity=".25"/><stop offset=".6" stopColor="#12212b" stopOpacity="0"/><stop offset="1" stopColor="#12212b" stopOpacity=".35"/></radialGradient>
    </defs>
    {body==='sun' && <g fill="none" stroke="#dcb078"><circle cx="747" cy="169" r="53" strokeWidth="8" opacity=".1"/><circle cx="747" cy="169" r="62" strokeWidth="5" opacity=".06"/>{Array.from({length:12},(_,i)=><path key={i} transform={`rotate(${i*30} 747 169)`} d="M747 108v-8" strokeWidth="3" strokeLinecap="round" opacity=".45"/>)}</g>}
    {body==='saturn' && <ellipse cx="747" cy="169" rx="66" ry="20" transform="rotate(-23 747 169)" fill="none" stroke="#b9ab8b" strokeWidth="13"/>}
    {body==='uranus' && <ellipse cx="747" cy="169" rx="13" ry="54" transform="rotate(22 747 169)" fill="none" stroke="#c5d9cb" strokeWidth="2" opacity=".45"/>}
    <circle cx="747" cy="169" r={r} fill={object.color}/>
    <g clipPath={`url(#${globe})`}>
      {(body==='moon'||body==='mercury') && [[-11,-11,7],[13,15,10],[-18,16,4],[15,-18,4]].map(([x,y,size])=><g key={x}><circle cx={747+x} cy={169+y} r={size} fill="#6e756d" opacity=".23"/><path d={`M${747+x-size*.6} ${169+y}q0 ${-size*.9} ${size} ${-size*.5}`} fill="none" stroke="#e2dbc0" strokeWidth="1" opacity=".5"/></g>)}
      {body==='venus' && <g fill="none" stroke="#f0d6a2" strokeWidth="8" opacity=".65"><path d="M700 148q25-14 49 2t44-3M698 172q28-15 53 1t45-2M710 196q21-11 43 0t35-3"/></g>}
      {body==='earth' && <><path d="m715 144 15-12 12 4-5 13-10 6 2 10-9 6-11-9m36 0 16-12 20 9-7 17-11 4-5 18-12-4-6-16z" fill="#a9b895"/><path d="M718 143q18-11 32-3m-28 41q16 7 29 1m9-29 17 5" stroke="#e9e7d1" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".8"/><path d="M729 133q18-9 33 1m-28 68q14 9 27-2" stroke="#ecebd6" strokeWidth="6" fill="none"/></>}
      {body==='mars' && <><path d="M710 153q22-16 34 3t30 5l13 15-28 5-20-13-22 3z" fill="#9f6b59" opacity=".55"/><path d="m731 186 15-7 19 6-7 14-20 0z" fill="#b27860"/><ellipse cx="745" cy="134" rx="14" ry="5" fill="#e5d6bd"/></>}
      {(body==='jupiter'||body==='saturn') && <g fill="none" strokeWidth={body==='jupiter'?8:5} opacity=".6"><path d="M693 139q54 13 108 0m-108 25q54 12 108 0m-108 27q54 8 108 0" stroke="#aa886c"/><path d="M694 151q53 12 106 0m-106 26q53 10 106 0m-106 27q53 7 106 0" stroke="#ebd6ae"/>{body==='jupiter' && <ellipse cx="765" cy="182" rx="12" ry="7" fill="#b87e65" stroke="#d6b58d" strokeWidth="2"/>}</g>}
      {body==='uranus' && <path d="M727 128q-12 39 0 80m16-80q-9 39 0 80" fill="none" stroke="#c2ded5" strokeWidth="7" opacity=".3"/>}
      {body==='neptune' && <><path d="M705 150q38-14 79 3m-79 30q40 11 79-1" stroke="#a3bdcc" strokeWidth="5" opacity=".5" fill="none"/><ellipse cx="762" cy="172" rx="10" ry="5" fill="#506c9d"/></>}
      {body==='sun' && <g fill="#efc887" opacity=".65"><path d="M719 146q19-14 33-7t24 11q-14-2-22 4t-35-8"/><path d="M719 183q16-11 32-2t22 6l-10 9-25-2z"/><circle cx="768" cy="165" r="6"/></g>}
      <circle cx="747" cy="169" r={r} fill={`url(#${shade})`}/>
    </g>
    {body==='saturn' && <g transform="rotate(-23 747 169)"><path d="M681 169a66 20 0 0 0 132 0" fill="none" stroke="#ddcba7" strokeWidth="11"/><path d="M680 172a67 20 0 0 0 134 0" fill="none" stroke="#9a927e" strokeWidth="2"/></g>}
    {body==='uranus' && <path d="M746 117q-39 90-15 102" fill="none" stroke="#c5d9cb" strokeWidth="2" opacity=".6"/>}
  </g>;
}
