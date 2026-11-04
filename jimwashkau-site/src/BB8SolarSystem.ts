export const solarWindowBodies = [
  {id:'sun',name:'Sun',color:'#dba35d',fact:'The Sun is our nearest star. Its light warms the planets in our solar system.'},
  {id:'mercury',name:'Mercury',color:'#aaa496',fact:'Mercury is the smallest planet and the closest planet to the Sun.'},
  {id:'venus',name:'Venus',color:'#d6b784',fact:'Venus has thick clouds and is the hottest planet in our solar system.'},
  {id:'earth',name:'Earth',color:'#669cae',fact:'Earth is our home, with oceans, clouds, and life. A little blue world to care for.'},
  {id:'moon',name:'Moon',color:'#cbc6aa',fact:'The Moon is Earth’s natural satellite. Its surface is covered in craters.'},
  {id:'mars',name:'Mars',color:'#c58b6e',fact:'Mars is the red planet. Percy, Oppy, and Ginny’s real-life inspirations explored Mars.'},
  {id:'jupiter',name:'Jupiter',color:'#c9ae8e',fact:'Jupiter is the largest planet. Its Great Red Spot is a giant storm.'},
  {id:'saturn',name:'Saturn',color:'#d4c396',fact:'Saturn’s beautiful rings are made mostly of pieces of ice, with rock and dust.'},
  {id:'uranus',name:'Uranus',color:'#a0c7c5',fact:'Uranus is an ice giant that rotates on its side. It has faint rings, too.'},
  {id:'neptune',name:'Neptune',color:'#718fbc',fact:'Neptune is the farthest planet from the Sun. Its blue atmosphere has powerful winds.'},
] as const;
export type SolarWindowId = typeof solarWindowBodies[number]['id'];
