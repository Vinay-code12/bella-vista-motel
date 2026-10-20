// Every item from /attractions/, in the source list order. `url` is only set
// where the source had a real destination; items whose "More Info" pointed
// nowhere are shown without a button. Titles are the source text.

export const attractions = [
  { id: 'water-fall-cafe', title: 'Water Fall Cafe', image: 'attr-waterfall-cafe', url: 'https://waterfallcafe.com.au/' },
  {
    id: 'australian-reptile-park',
    title: 'Closest motel to The Australian Reptile Park',
    image: 'attr-reptile-park',
    url: 'https://www.reptilepark.com.au/',
  },
  { id: 'gosford-cbd', title: '7KM from Gosford CBD', image: 'attr-gosford-cbd' },
  { id: 'somersby-falls', title: 'Somersby Falls', image: 'attr-somersby-falls' },
  { id: 'beaches', title: 'Central Coast’s Pristine Beaches', image: 'attr-beaches' },
  { id: 'central-coast-stadium', title: 'Central Coast Stadium', image: 'attr-stadium' },
  {
    id: 'glenworth-valley',
    title: 'Glenworth Valley (15 minutes drive)',
    image: 'attr-glenworth-valley',
    url: 'https://glenworth.com.au/',
  },
  {
    id: 'mount-penang',
    title: 'Mount Penang Parklands & Gardens',
    image: 'attr-mount-penang',
    url: 'https://www.hccdc.nsw.gov.au/projects/mount-penang-parklands',
  },
  { id: 'golf', title: 'A number of Golf ranges', image: 'attr-golf' },
  { id: 'tree-top-adventure-park', title: 'Tree Top Adventure Park', image: 'attr-tree-tops', url: 'https://treetopsadventure.com.au/' },
  { id: 'brisbane-water-cruises', title: 'Brisbane Water Cruises', image: 'attr-brisbane-water-cruises' },
  { id: 'ferry-to-palm-beach', title: 'Ferry to Palm Beach', image: 'attr-palm-beach-ferry' },
  { id: 'bushwalking', title: 'Bushwalking', image: 'attr-bushwalking' },
  { id: 'gosford-race-club', title: 'Gosford Race Club', image: 'attr-gosford-race-club' },
  { id: 'henry-kendall-cottage', title: 'Henry Kendall Cottage', image: 'attr-henry-kendall-cottage' },
  { id: 'art-galleries', title: 'Art Galleries', image: 'attr-art-galleries' },
  { id: 'somersby-gardens', title: 'Somersby Gardens', image: 'attr-somersby-gardens', url: 'https://somersbygardens.com.au/' },
  { id: 'japanese-gardens', title: 'The Japanese Gardens', image: 'attr-japanese-gardens' },
  { id: 'linton-gardens', title: 'Linton Gardens', image: 'attr-linton-gardens', url: 'https://www.lintongardens.com.au/' },
  {
    id: 'central-coast-tourism',
    title: 'Central Coast Tourism',
    image: 'attr-central-coast-tourism',
    url: 'https://www.visitcentralcoast.com.au/',
  },
  // The source reused The Japanese Gardens photo here; shown as text only.
  { id: 'gosford-exit-m1', title: 'First motel after taking Gosford exit off M1' },
];

// Image alt text describes the photograph, not a claim about the venue.
export const attractionAlt = {
  'attr-waterfall-cafe': 'Chef garnishing a plated dish',
  'attr-reptile-park': 'Crocodile lunging from the water as a keeper presents to a crowd',
  'attr-gosford-cbd': 'Aerial view of Gosford’s city centre',
  'attr-somersby-falls': 'Visitors at the base of Somersby Falls',
  'attr-beaches': 'Long curving beach with surf and a wooded headland',
  'attr-stadium': 'Aerial view of Central Coast Stadium beside the water',
  'attr-glenworth-valley': 'Horse riders crossing a rocky creek in Glenworth Valley',
  'attr-mount-penang': 'Lawn and pond in front of a long stone wall at Mount Penang Parklands',
  'attr-golf': 'Tree-lined golf fairway',
  'attr-tree-tops': 'Rope course suspended between tall gum trees',
  'attr-brisbane-water-cruises': 'White cruise boat on the water',
  'attr-palm-beach-ferry': 'Passengers walking along a wharf towards a ferry',
  'attr-bushwalking': 'Hiker leaping across a creek through long grass',
  'attr-gosford-race-club': '“Race to Gosford” signage at the racecourse',
  'attr-henry-kendall-cottage': 'Sandstone Henry Kendall Cottage among jacaranda trees',
  'attr-art-galleries': 'Gallery room with artworks and bench seating',
  'attr-somersby-gardens': 'Aerial view of a homestead and gardens surrounded by bushland',
  'attr-japanese-gardens': 'Pond with a red bridge and pavilion in landscaped gardens',
  'attr-linton-gardens': 'Outdoor ceremony with guests seated beneath a leafy canopy',
  'attr-central-coast-tourism': 'Aerial view of a beachside town and bay',
};

// Distances stated on the source Home page, for the Home local-area preview.
export const nearby = [
  { id: 'australian-reptile-park', label: 'The Australian Reptile Park', distance: 'About 5 minutes’ drive' },
  { id: 'somersby-falls', label: 'Somersby Falls', distance: 'About 5 minutes’ drive' },
  { id: 'mount-penang', label: 'Mount Penang Parklands', distance: '2 minutes’ walk' },
  { id: 'glenworth-valley', label: 'Glenworth Valley', distance: '15 minutes drive' },
];
