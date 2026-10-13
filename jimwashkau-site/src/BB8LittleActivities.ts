export const littleActivities = [
  { id: 'violin', label: 'Violin practice', title: 'A tiny violin virtuoso', detail: 'Practicing three little notes. Every squeak deserves an encore.' },
  { id: 'cooking', label: 'Cooking', title: 'Little chef at work', detail: 'Stirring pretend moon soup. The secret ingredient is love.' },
  { id: 'sippy', label: 'Sippy cup', title: 'A little sip break', detail: 'Two handles, one determined droid. Hydrating his imaginary circuits.' },
  { id: 'reading', label: 'Reading', title: 'Just one more page', detail: 'Reading about a brave little droid who finds his way home.' },
  { id: 'stars', label: 'Stargazing', title: 'Counting distant stars', detail: 'Looking for a constellation shaped like his favorite person.' },
  { id: 'singing', label: 'Singing', title: 'A song from his circuits', detail: 'Making up a tiny beep lullaby. This verse is just for you.' },
  { id: 'painting', label: 'Painting', title: 'An artist in the making', detail: 'Painting a wobbly little heart. Proudly calling it a masterpiece.' },
  { id: 'blocks', label: 'Building blocks', title: 'Building a tiny galaxy', detail: 'Stacking soft star blocks. The tower is almost taller than his antenna.' },
  { id: 'bubbles', label: 'Bubbles', title: 'Bubble patrol', detail: 'Watching little bubbles float by. Each one gets a curious boop.' },
  { id: 'gardening', label: 'Gardening', title: 'Caring for a little sprout', detail: 'Giving his nursery plant a pretend sprinkle and a pep talk.' },
  { id: 'hide', label: 'Hide-and-seek', title: 'Where did that droid go?', detail: 'Hiding behind his blanket. His antenna is giving the game away.' },
  { id: 'tea', label: 'Teddy tea party', title: 'Tea for the cuddle crew', detail: 'Pouring pretend tea for his friends. Everyone gets the fancy cup.' },
  { id: 'rolling', label: 'Learning to roll', title: 'One brave little wobble', detail: 'Practicing his rolls around soft cones. Celebrating every tiny victory.' },
  { id: 'paper', label: 'Paper spaceships', title: 'Cleared for tiny takeoff', detail: 'Launching a paper spaceship. Oops! His head is the landing pad.' },
  { id: 'conducting', label: 'Conducting his mobile', title: 'Maestro of the planets', detail: 'Conducting the hanging planets. The moon keeps missing its cue.' },
  { id: 'repairs', label: 'Tiny repairs', title: 'Little mechanic on duty', detail: 'Fixing a toy spaceship with his chunky wrench. Checking twice for spare hugs.' },
  { id: 'dancing', label: 'Dancing', title: 'A little disco droid', detail: 'Wiggling to his favorite tune. Those happy circuits have rhythm.' },
  { id: 'peekaboo', label: 'Peekaboo', title: 'Peek-a-boop!', detail: 'Hiding his eye, then popping out with a happy little beep. There he is!' },
  { id: 'crayons', label: 'Crayon portraits', title: 'Drawing his best friends', detail: 'Drawing a cuddly friend with chunky crayons. Adding extra-big ears for love.' },
  { id: 'fireflies', label: 'Watching fireflies', title: 'Little lights, big wonder', detail: 'Following pretend fireflies around the nursery. A galaxy he can almost touch.' },
  { id: 'hiccups', label: 'Little hiccups', title: 'Hic! Beep! Hic!', detail: 'A surprised beep and a tiny hop. His circuits have the hiccups.' },
  { id: 'tucking', label: 'Tucking in his toys', title: 'Goodnight, little friends', detail: 'Tucking his cuddle crew under little blankets. Sweet dreams for everyone.' },
  { id: 'lightsaber', label: 'Lightsaber practice', title: 'A very small Jedi lesson', detail: 'Practicing gentle swings with his little training saber. The Force is strong with this wobble.' },
  { id: 'soldiering', label: 'Little soldier drills', title: 'Reporting for cuddle duty', detail: 'Practicing a tiny salute and a brave little march. His mission: protect the stuffed friends.' },
  { id: 'lego', label: 'Playing LEGOs', title: 'One brick closer to the stars', detail: 'Building a LEGO spaceship, one colorful brick at a time. Saving a seat for you.' },
] as const;
export type LittleActivity = typeof littleActivities[number];

export function pickLittleActivity(previous: LittleActivity | null, random = Math.random): LittleActivity {
  const choices = littleActivities.filter(item => item.id !== previous?.id);
  return choices[Math.floor(random() * choices.length)];
}

