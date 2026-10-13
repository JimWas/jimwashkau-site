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
] as const;
export type LittleActivity = typeof littleActivities[number];

export function pickLittleActivity(previous: LittleActivity | null, random = Math.random): LittleActivity {
  const choices = littleActivities.filter(item => item.id !== previous?.id);
  return choices[Math.floor(random() * choices.length)];
}

