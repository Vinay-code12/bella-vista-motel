// Room categories exactly as published on /accommodation/ (see CONTENT_CHECKLIST.md).
// Images are each room's own source slider photos; the first one shows the room itself.

const motelRoomFeatures = [
  'Tea & Coffee Making Facilities',
  'Toaster & Microwave',
  'Bar Fridge',
  'Hair Dryer & Toiletries',
  'LCD HD TV & DVD Player (on request)',
  'Iron & Ironing Board',
  'Reverse Cycle Air Conditioning',
  'Free WiFi',
];

export const rooms = [
  {
    id: 'standard-double',
    name: 'Standard Double Room',
    occupancy: 'Up to 2 Adults',
    beds: { label: 'Bed Options', value: 'Double or Queen bed' },
    features: motelRoomFeatures,
    preview: 'double-2',
    images: [
      { src: 'double-1', alt: 'Standard Double Room with a made-up double bed, bedside lamps and a small table with chairs' },
      { src: 'double-2', alt: 'Standard Double Room showing the bed, bedside tables and bathroom door' },
      { src: 'pool', alt: 'Outdoor swimming pool with sun loungers, surrounded by trees with water in the distance' },
      { src: 'double-3', alt: 'Double bed with orange cushions and folded towels under a coastal artwork' },
    ],
  },
  {
    id: 'standard-twin-triple',
    name: 'Standard Twin/Triple Room',
    occupancy: 'Up to 3 Adults',
    beds: { label: 'Bed Options', value: 'Double and Single bed' },
    features: motelRoomFeatures,
    preview: 'twin-1',
    images: [
      { src: 'twin-1', alt: 'Twin/Triple room with a double bed and a single bed beside a large window' },
      { src: 'kitchenette', alt: 'In-room kitchenette with microwave, bar fridge and sink' },
      { src: 'bathroom', alt: 'Bathroom with glass shower screen, vanity and towel rail' },
      { src: 'twin-2', alt: 'Double and single beds made up with cushions beneath a city-at-night artwork' },
    ],
  },
  {
    id: 'quadruple',
    name: 'Quadruple Room',
    occupancy: 'Up to 2 Adults & 2 Children',
    beds: { label: 'Bed Options', value: 'Either two Double beds or a Double and Bunk bed, depending on availability.' },
    features: motelRoomFeatures,
    note: 'Rooms are compact and best suited for budget-conscious families.',
    preview: 'quad-1',
    images: [
      { src: 'quad-1', alt: 'Quadruple room with a double bed, a bunk bed and an orange rug' },
      { src: 'bathroom', alt: 'Bathroom with glass shower screen, vanity and towel rail' },
      { src: 'view-water', alt: 'View over the treetops towards the water' },
      { src: 'quad-2', alt: 'Room with a double bed and further beds along the wall' },
    ],
  },
  {
    id: 'two-bedroom-apartment',
    name: 'Two Bedroom Apartment',
    occupancy: 'Up to 2 Adults & 2 Children',
    beds: { label: 'Unit', value: 'Self-Contained Unit with Full Amenities' },
    features: [
      'Full Kitchen',
      'Spacious Dining & Lounge Area',
      'LCD HD TV & DVD Player',
      'Hair Dryer & Toiletries',
      'Towels & Linen Available on Request',
      'Free WiFi',
    ],
    sleeping: [
      { space: 'Room 1', beds: 'Queen Bed' },
      { space: 'Room 2', beds: 'Double & Single Bed' },
      { space: 'Lounge Area', beds: 'Additional Single Bed' },
    ],
    preview: 'apartment-bedroom',
    images: [
      { src: 'apartment-lounge-1', alt: 'Apartment lounge with a cream sofa and arched doorway to the kitchen' },
      { src: 'apartment-lounge-2', alt: 'Apartment lounge with leather sofa, coffee table and television' },
      { src: 'apartment-dining', alt: 'Apartment dining table with six chairs beside the bedroom area' },
      { src: 'apartment-lounge-3', alt: 'Apartment living area with sofa and coffee table by sliding doors' },
      { src: 'double-1', alt: 'Bedroom with a made-up double bed, bedside lamps and a small table with chairs' },
      { src: 'apartment-bathroom-1', alt: 'Apartment bathroom with bathtub, vanity and storage cabinet' },
      { src: 'apartment-bathroom-2', alt: 'Apartment shower recess with tiled walls' },
      { src: 'apartment-bedroom', alt: 'Bedroom with two beds made up with cushions and folded towels' },
    ],
  },
];
