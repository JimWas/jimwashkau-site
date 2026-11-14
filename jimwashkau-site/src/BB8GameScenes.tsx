import type { ReactNode } from 'react';
import './BB8GameScenes.css';

function Board({ children, label }: { children: ReactNode; label: string }) {
  return <g transform="translate(513 304)" aria-label={label}><path d="M-6-5h120v122H-6Z" fill="#c2a880" stroke="#eadcbd" strokeWidth="3"/><rect width="108" height="108" rx="3" fill="#ede0bd"/>{children}<path d="M12 118v9m82-9v9" stroke="#ad987a" strokeWidth="5"/></g>;
}
function Arcade({ children, label }: { children: ReactNode; label: string }) {
  return <g transform="translate(501 285)" aria-label={label}><path d="M-5-5h124l9 117-12 19H-10l-7-19Z" fill="#99b4a6" stroke="#e2d6b5" strokeWidth="3"/><rect x="1" y="1" width="112" height="101" rx="9" fill="#294940" stroke="#6e8e7c" strokeWidth="4"/>
    <svg x="7" y="6" width="100" height="90" viewBox="0 0 100 90" overflow="hidden">{children}</svg>
    <path d="M-7 108h125" stroke="#d0c9aa" strokeWidth="3"/><ellipse cx="27" cy="121" rx="13" ry="4" fill="#6a8b76"/><g className="bb8-game-joystick"><path d="M27 120v-13" stroke="#c3b69b" strokeWidth="4"/><circle cx="27" cy="104" r="6" fill="#d4ab88"/></g><circle className="bb8-game-button" cx="88" cy="118" r="6" fill="#d8ba86"/><circle cx="105" cy="118" r="5" fill="#c3a2a6"/>
    <path className="bb8-game-controller-arm" d="M-22 103-7 112 17 111" stroke="#a4b8a5" strokeWidth="6" fill="none"/>
  </g>;
}
function ChessPiece({ kind, dark = false }: { kind: string; dark?: boolean }) {
  return <g fill={dark ? '#476257' : '#f4e8c9'} stroke={dark ? '#c0ccad' : '#7c8f77'} strokeWidth=".7" strokeLinejoin="round">
    {kind === 'pawn' ? <><circle cy="-3" r="2"/><path d="m-1-1-2 5h6L1-1Z"/></> : kind === 'rook' ? <path d="M-3-5v3h1v5h-1v1h6V3H2v-5h1v-3H1v1h-2v-1Z"/> : kind === 'knight' ? <path d="m-3 4 1-4-1-1 3-4 3 2v7ZM0-2h1"/> : kind === 'bishop' ? <><path d="m0-6-3 4 2 2-2 4h6L1 0l2-2Z"/><path d="m0-4 1 2" fill="none"/></> : kind === 'king' ? <><path d="M-3 4-2-2h4l1 6ZM0-6v4m-2-2h4"/></> : <><path d="M-3 4-2-1-3-4l3 2 3-2-1 3 1 5Z"/><circle cy="-5" r="1"/></>}
    <path d="M-3 5h6" fill="none"/>
  </g>;
}
function Alien({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} fill="#bbceb0"><path d="M-5-4h2v-2h2v2h2v-2h2v2h2v2h2v6H5V2H3v2h-6V2h-2v2h-2v-6h2Z"/><path d="M-3-1h2v2h-2Zm4 0h2v2H1Z" fill="#294940"/></g>;
}
const colors = ['#d1a18b','#a3bba7','#dcca91','#a6b8cb'];
export function GameSceneProps({ id }: { id: string }) {
  return <g className="bb8-game-props">
    {id === 'game-chess' && <Board label="BB-8 practices both sides of a chess opening, moving the e pawns two squares">
      {Array.from({ length: 64 }, (_, i) => <rect key={i} x={6+i%8*12} y={6+Math.floor(i/8)*12} width="12" height="12" fill={(i+Math.floor(i/8))%2 ? '#8da58e' : '#eadab3'}/>)}
      {[false,true].map(dark => <g key={String(dark)}>{['rook','knight','bishop','queen','king','bishop','knight','rook'].map((kind,col) => <g key={col} transform={`translate(${12+col*12} ${dark?12:96})`}><ChessPiece kind={kind} dark={dark}/></g>)}{Array.from({length:8},(_,col) => <g key={col} transform={`translate(${12+col*12} ${dark?24:84})`}><g className={col===4 ? dark?'bb8-chess-black-move':'bb8-chess-white-move':undefined}><ChessPiece kind="pawn" dark={dark}/></g></g>)}</g>)}
      <path className="bb8-game-thinking-arm" d="M-13 15 8 3" stroke="#a6b7a2" strokeWidth="5"/>
    </Board>}
    {id === 'game-checkers' && <Board label="A little checker slides diagonally forward on a wooden board">
      {Array.from({length:64},(_,i) => <rect key={i} x={6+i%8*12} y={6+Math.floor(i/8)*12} width="12" height="12" fill={(i+Math.floor(i/8))%2?'#839b88':'#e6d7b2'}/>)}
      {[0,1,2,5,6,7].flatMap(row => Array.from({length:8},(_,col)=>({row,col}))).filter(({row,col})=>(row+col)%2===1).map(({row,col})=><g key={`${row}-${col}`} transform={`translate(${12+col*12} ${12+row*12})`}><g className={row===5&&col===0?'bb8-checker-slide':undefined}><circle r="4.5" fill={row<3?'#d6b58c':'#5d7b6d'} stroke="#eee0bf" strokeWidth="1"/><circle r="2.5" fill="none" stroke="#d3d4b2" strokeWidth=".6"/></g></g>)}
    </Board>}
    {id === 'game-tetris' && <Arcade label="BB-8 fits a falling square into a gap and clears two neat rows">
      <g transform="translate(12 0)" stroke="#8aa58f" strokeWidth=".3">{Array.from({length:10},(_,col)=>[10,11].map(row=>col===3||col===4?null:<rect className="bb8-tetris-clear" key={`${row}-${col}`} x={col*7.5} y={row*7.5} width="7" height="7" fill={colors[(row+col)%4]}/>))}
        <g className="bb8-tetris-drop">{[0,1,2,3].map(i=><rect key={i} x={22.5+i%2*7.5} y={Math.floor(i/2)*7.5} width="7" height="7" fill="#dfc589"/>)}</g>
      </g><path d="M10 0v89h79V0" fill="none" stroke="#6f947d"/>
    </Arcade>}
    {id === 'game-space-invaders' && <Arcade label="A toy spaceship plays a gentle Space Invaders game with little pixel aliens">
      <g className="bb8-invader-drift">{Array.from({length:15},(_,i)=><g key={i} className={i===12?'bb8-invader-boop':undefined}><Alien x={18+i%5*16} y={13+Math.floor(i/5)*15}/></g>)}</g>
      <path className="bb8-invader-shot" d="M50 70v-7" stroke="#e6cd96" strokeWidth="2"/>
      <path d="m50 72 6 7h7v6H37v-6h7Z" fill="#d9bd92"/><path d="M8 88h84" stroke="#6d907a"/>
    </Arcade>}
    {id === 'game-connect-four' && <Board label="BB-8 drops a red counter into a little four-in-a-row board">
      <rect x="8" y="9" width="92" height="86" rx="6" fill="#8eaeb2" stroke="#617f79" strokeWidth="2"/>
      {Array.from({length:42},(_,i)=><circle key={i} cx={15+i%7*13} cy={17+Math.floor(i/7)*14} r="4.6" fill={i===35||i===37||i===30?'#d9be82':i===36||i===38?'#cc9584':'#e9dbb9'}/>)}
      <circle className="bb8-four-counter" cx="54" cy="17" r="4.6" fill="#cc9584"/><path d="M10 96v12m88-12v12M2 108h18m70 0h18" stroke="#8aa5a0" strokeWidth="5"/>
    </Board>}
    {id === 'game-dominoes' && <Board label="Matching the spots on tiny wooden dominoes">
      {[[20,25,1,2],[53,25,2,3],[86,25,3,4],[94,50,4,1]].map(([x,y,a,b],index)=><g key={index} transform={`translate(${x} ${y}) rotate(${index<3?-90:0})`}><g className={index===3?'bb8-domino-match':undefined}><rect x="-9" y="-16" width="18" height="33" rx="3" fill="#f0e4c6" stroke="#9e8d70" strokeWidth="1.5"/><path d="M-7 0H7" stroke="#ac9e7d"/>{[a,b].map((count,half)=>Array.from({length:count},(_,i)=><circle key={`${half}-${i}`} cx={count===1?0:i%2?4:-4} cy={(half?8:-8)+(count>2?(Math.floor(i/2)*6-3):0)} r="1.5" fill="#607d68"/>))}</g></g>)}
    </Board>}
    {id === 'game-memory' && <Board label="Finding two matching star cards and carefully turning them over">
      {Array.from({length:8},(_,i)=><g key={i} transform={`translate(${8+i%4*25} ${13+Math.floor(i/4)*43})`}><rect width="20" height="32" rx="3" fill="#aab9a3" stroke="#f0e2be" strokeWidth="1.5"/><g className={i===1||i===6?'bb8-memory-reveal':'bb8-memory-back'}><rect width="20" height="32" rx="3" fill="#ecdbb7"/><path d="m10 7 2 6 6 1-5 4 2 6-5-3-5 3 2-6-5-4 6-1Z" fill="#c39777"/></g>{i!==1&&i!==6&&<circle cx="10" cy="16" r="4" fill="none" stroke="#d9dfbd"/>}</g>)}
    </Board>}
    {id === 'game-tic-tac-toe' && <Board label="BB-8 practices taking turns with noughts and crosses">
      <path d="M38 9v90m31-90v90M9 38h90M9 69h90" stroke="#9baa8a" strokeWidth="3"/>
      {[[24,24],[84,24],[24,84]].map(([x,y])=><path key={`${x}-${y}`} d={`m${x-7} ${y-7} 14 14m-14 0 14-14`} stroke="#bd9279" strokeWidth="3"/>)}
      <circle cx="54" cy="54" r="9" fill="none" stroke="#789e99" strokeWidth="3"/><circle cx="54" cy="84" r="9" fill="none" stroke="#789e99" strokeWidth="3"/>
      <circle className="bb8-nought-turn" cx="84" cy="54" r="9" fill="none" stroke="#789e99" strokeWidth="3"/>
    </Board>}
    {id === 'game-snakes-ladders' && <Board label="A little counter climbs a ladder on a colorful board">
      {Array.from({length:25},(_,i)=><rect key={i} x={4+i%5*20} y={4+Math.floor(i/5)*20} width="20" height="20" fill={colors[(i+Math.floor(i/5))%4]} stroke="#eadfbd" strokeWidth="1"/>)}
      <path d="m25 93 40-61m-33 65 40-61m-39 42 7 4m1-16 7 4m1-16 7 4m1-16 7 4" stroke="#f2e3bf" strokeWidth="3" fill="none"/>
      <path d="M85 21q-28 4-7 24t-5 21" stroke="#8fa681" strokeWidth="6" fill="none"/><circle cx="86" cy="21" r="4" fill="#8fa681"/>
      <g className="bb8-ladder-token"><circle cx="28" cy="92" r="6" fill="#f0d69b" stroke="#7c957b" strokeWidth="2"/></g>
    </Board>}
    {id === 'game-maze' && <Board label="Following a toy maze slowly toward a little star">
      <path d="M8 9h92v91H8V24m18-15v18h32V9M8 45h32v19H25v18h53V70h-15M59 45h22V27h19M8 82h17m34 0v18" fill="none" stroke="#8ca28b" strokeWidth="4"/>
      <path d="m88 77 2 5 6 1-4 4 1 6-5-3-5 3 1-6-4-4 6-1Z" fill="#cfab79"/>
      <circle className="bb8-maze-token" cx="16" cy="17" r="4" fill="#bc9279"/>
    </Board>}
    {id === 'game-pong' && <Arcade label="A little ball bounces between two paddles in a friendly practice rally">
      <path d="M50 3v84" stroke="#718c76" strokeWidth="1" strokeDasharray="3 5"/>
      <rect className="bb8-pong-left" x="4" y="29" width="4" height="24" rx="2" fill="#bbceb2"/><rect className="bb8-pong-right" x="92" y="29" width="4" height="24" rx="2" fill="#dfc697"/><circle className="bb8-pong-ball" cx="10" cy="41" r="3" fill="#eee1bf"/>
    </Arcade>}
    {id === 'game-breakout' && <Arcade label="BB-8 guides a paddle to bounce a ball toward pastel toy bricks">
      {Array.from({length:18},(_,i)=><rect key={i} className={i===16?'bb8-breakout-brick':i===13?'bb8-breakout-second':undefined} x={4+i%6*16} y={7+Math.floor(i/6)*9} width="13" height="6" rx="1" fill={colors[Math.floor(i/6)]}/>)}
      <rect className="bb8-breakout-paddle" x="32" y="83" width="27" height="4" rx="2" fill="#b6cab1"/><circle className="bb8-breakout-ball" cx="45" cy="79" r="2.5" fill="#f0e3be"/>
    </Arcade>}
  </g>;
}
