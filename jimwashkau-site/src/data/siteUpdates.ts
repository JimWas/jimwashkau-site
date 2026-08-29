export type SiteUpdate = {
  date: string;
  title: string;
  category: string;
  summary: string;
  href?: string;
  items: string[];
};

export const siteUpdates: SiteUpdate[] = [
  {
    date: '2026-08-29',
    title: 'WoWPolitics landing page',
    category: 'Game Server',
    summary: "Added a public landing page for the AzerothCore 3.3.5a WoWPolitics realm inside Goldshire's Lion's Pride Inn.",
    href: '/wow-politics',
    items: [
      'Built a screenshot driven page for the AI playerbot political debate server.',
      'Added WotLK 3.3.5a client setup instructions with the WoWPolitics realmlist.',
      'Linked the GitHub source and TheraWoW client download page for players.',
    ],
  },
  {
    date: '2026-08-20',
    title: 'TravelVid Recorder spotlight',
    category: 'Product',
    summary: 'Upgraded the TravelVid Recorder landing page and added a top homepage spotlight for the strongest iPhone app.',
    href: '/travelvid',
    items: [
      'Refreshed the TravelVid page with current App Store positioning, version 3.4 details, and stronger product copy.',
      'Added a homepage hero near the top for Cover Mode, segmented recording, GPS routes, readiness checks, and recovery tools.',
      'Updated the iOS Apps portfolio card to route through the local TravelVid page.',
    ],
  },
  {
    date: '2026-08-20',
    title: 'Swift PDF Editor landing page',
    category: 'Product',
    summary: 'Added a dedicated landing page and homepage promo for the Swift PDF Editor iOS app.',
    href: '/SwiftPDFEditor',
    items: [
      'Built a polished product page for editing, signing, scanning, compressing, converting, and protecting PDFs.',
      'Added a homepage promo hero below the existing app spotlights so it does not sit above the fold.',
      'Updated the iOS Apps portfolio with a Swift PDF Editor card and route.',
    ],
  },
  {
    date: '2026-08-01',
    title: 'Lingo Echo landing page',
    category: 'Product',
    summary: 'Added a dedicated App Store landing page for the Lingo Echo iOS travel phrase soundboard.',
    href: '/LingoEcho',
    items: [
      'Built a custom product page with an interactive style iPhone phrasebook mockup.',
      'Added a homepage promo hero beneath the JimWas Recorder jailbreak tweak feature.',
      'Highlighted voice recording, quick phrases, pronunciation help, offline friendly phrase data, and language packs.',
      'Updated the iOS Apps portfolio card to route to the new Lingo Echo page.',
    ],
  },
  {
    date: '2026-07-30',
    title: 'JW iOS MCP research page',
    category: 'Research',
    summary: 'Added a technical research page for an autonomous iOS MCP AI Agent server architecture.',
    href: '/jw-ios-mcp',
    items: [
      'Mapped the daemon, SpringBoard bridge, and Unix socket responsibilities.',
      'Documented the Streamable HTTP, JSON RPC, and tool catalog design.',
      'Captured perception, gesture, filesystem, lifecycle, and hardening notes.',
    ],
  },
  {
    date: '2026-07-30',
    title: "What's New tracker",
    category: 'Site System',
    summary: 'Added a dedicated changelog page plus a homepage highlight section for new pages, features, and deployments.',
    href: '/whats-new',
    items: [
      'Created a central update feed for site changes.',
      'Added a homepage preview above Mission Logs.',
      'Made recent feature launches easier to discover.',
    ],
  },
  {
    date: '2026-07-29',
    title: 'iPhone jailbreak get started map',
    category: 'Guide',
    summary: 'Added an iPhone model selector based on the MIT licensed iOS Guide and AppleDB compatibility data.',
    href: '/iphone-jailbreak-wizard',
    items: [
      'Extracted iPhone model groups, iOS version ranges, and recommendation links.',
      'Added model search and source attribution.',
      'Linked users back to the upstream guide for current instructions.',
    ],
  },
  {
    date: '2026-07-29',
    title: 'JimWas Recorder feature page',
    category: 'Product',
    summary: 'Added a product page and homepage hero for the iOS 16 Dopamine background recorder project.',
    href: '/jimwas-recorder',
    items: [
      'Featured video, audio, and photo capture modes.',
      'Highlighted watchdog recovery, haptics, and crash safe segments.',
      'Added a direct install/contact path.',
    ],
  },
  {
    date: '2026-05-13',
    title: 'Space drinks explainer',
    category: 'Article',
    summary: 'Added a standalone page explaining what astronauts drink in space and how microgravity changes the rules.',
    href: '/space-drinks',
    items: [
      'Covered recycled water, drink pouches, coffee, tea, juice, and carbonation limits.',
      'Matched the site mission control visual language.',
      'Added a direct route from the homepage navigation.',
    ],
  },
  {
    date: '2026-05-07',
    title: 'Love Signal moved to its own page',
    category: 'Interactive',
    summary: 'Moved the Mars Matrix ASMR widget off the homepage and onto a dedicated Love Signal route.',
    href: '/love-signal',
    items: [
      'Preserved the matrix rain canvas experience.',
      'Kept the homepage lighter and easier to scan.',
      'Updated the Transmit link to route back to contact.',
    ],
  },
  {
    date: '2026-05-07',
    title: 'Mission recorder stop fix',
    category: 'Tooling',
    summary: 'Updated the local voice to log recorder so pressing Return stops recording reliably.',
    items: [
      'Replaced blocking input with direct terminal key handling.',
      'Restored terminal settings after recording.',
      'Kept Ctrl+C interruption behavior intact.',
    ],
  },
  {
    date: '2026-05-07',
    title: 'Live app ads.txt verified',
    category: 'Monetization',
    summary: 'Confirmed the AdMob app ads.txt file is present locally and served from the live root website.',
    href: '/app-ads.txt',
    items: [
      'Verified the Google publisher line.',
      'Confirmed the live www route returns 200 OK.',
      'Checked the non www redirect path.',
    ],
  },
];
