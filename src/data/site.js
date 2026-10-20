// Business details migrated from bellavistamotel.com.au (see CONTENT_CHECKLIST.md).

export const site = {
  name: 'Bella Vista Motel',
  address: {
    street: '5 Central Coast Highway',
    locality: 'Kariong',
    region: 'NSW',
    postcode: '2250',
    full: '5 Central Coast Highway Kariong NSW 2250',
  },
  // `footer: true` mirrors the two numbers the source footer lists; the
  // Contact page lists all three.
  phones: [
    { display: '+61 2 4340 1108', tel: '+61243401108', footer: true },
    { display: '+61 2 4340 1173', tel: '+61243401173', footer: true },
    { display: '+61 2 4340 2250', tel: '+61243402250', footer: false },
  ],
  email: 'bellavistamotel@bigpond.com',
  hours: [
    { days: 'Monday – Friday', time: '8.00 am to 9.30 pm' },
    { days: 'Saturday', time: '8.00 am to 6 pm' },
    { days: 'Sunday', time: '8.00 am to 7 pm' },
  ],
  map: {
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.549902518707!2d151.29493437505056!3d-33.43497709671873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b0d4a93fed5641b%3A0x1b75972309d2cca!2s5%20Central%20Coast%20Hwy%2C%20Kariong%20NSW%202250%2C%20Australia!5e0!3m2!1sen!2sin!4v1741843925825!5m2!1sen!2sin',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=5+Central+Coast+Hwy%2C+Kariong+NSW+2250%2C+Australia',
    view: 'https://www.google.com/maps/search/?api=1&query=5+Central+Coast+Hwy%2C+Kariong+NSW+2250%2C+Australia',
  },
  // ElevenLabs Conversational AI agent shown on the Home page (public widget).
  aiAgentId: 'agent_2001m44shag5efc9hrm3bdb4mddn',
  // Site-wide popup on the source (Divi popup "pool-renovation", 6 Oct 2026).
  notice: {
    id: 'pool-renovation-2026-10',
    text: 'Swimming pool is under renovation',
  },
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/accommodation/', label: 'Accommodation' },
  { to: '/attractions/', label: 'Attractions' },
  { to: '/gallery/', label: 'Gallery' },
  { to: '/contact-us/', label: 'Contact Us' },
];

// Home page intro facts — quantities exactly as published.
export const highlights = [
  { value: '25', label: 'rooms of various configurations, including 1 two bedroom apartment' },
  { value: '7 km', label: 'from Gosford CBD' },
  { value: '≈ 1 hr', label: 'drive to Sydney and Newcastle' },
  { value: '3', label: 'EV chargers for the general public' },
];

// Facilities named on the Home page and in the Motel Policy.
export const facilities = [
  { name: 'Outdoor swimming pool', detail: 'Seasonal', image: 'pool', notice: true },
  { name: 'BBQ facilities', image: 'garden-bbq' },
  { name: 'Free Wi‑Fi' },
  { name: 'EV chargers', detail: '3 EV chargers for the general public' },
  { name: 'Guest laundry', detail: 'Charges apply' },
];

// "In every room" icons from the Home page.
export const inRoomAmenities = [
  { icon: 'fridge', label: 'Bar Fridge' },
  { icon: 'toiletries', label: 'Toiletries' },
  { icon: 'wifi', label: 'Free Wifi' },
  { icon: 'microwave', label: 'Microwave' },
  { icon: 'dvd', label: 'DVD Players' },
  { icon: 'iron', label: 'Iron / Ironing Board' },
  { icon: 'toaster', label: 'Toaster' },
  { icon: 'tv', label: 'LCD HD TV' },
];

export const testimonial = {
  quote:
    'The staff were friendly and the experience has been very pleasing. It has been a real pleasure working with you. Keep up the good work 🙂!',
  author: 'Adam Lyttle',
};

export const groupDining = {
  text: 'Restaurant open for group bookings and we can provide all meals.',
  seating: 60,
};

// Motel Policy, grouped for scanning; wording kept from the source.
export const policies = [
  {
    title: 'Reservations & payment',
    items: [
      'We require a credit card at time of reservation for a deposit.',
      'The remaining payment is to be made at check-in.',
      'A security bond may be requested at check-in and returned at check-out provided that there are no damages to the room.',
    ],
  },
  {
    title: 'Cancellation',
    items: [
      'We have a 72 hours cancellation policy and an admin fee will be charged.',
      'If cancellation is made within 72 hours, the first night will be charged.',
    ],
  },
  {
    title: 'Smoking',
    items: [
      'All our rooms are non-smoking and additional charges will apply if smoking in the room.',
      'Smoking is allowed only in designated smoking area.',
    ],
  },
  {
    title: 'Arrival & departure',
    items: [
      'Check-in time: from 1 pm.',
      'Check-out time: 10 am. Charges apply for late checkout.',
      'After hours check-in available — please contact us to make arrangements.',
    ],
  },
  {
    title: 'Facilities',
    items: ['3 EV charger stations for the general public.', 'Guest laundry facilities available (charges apply).'],
  },
];

export const stayTimes = { checkIn: 'from 1 pm', checkOut: '10 am' };
