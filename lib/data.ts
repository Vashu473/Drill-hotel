export const restaurant = {
  name: "Deli Grill",
  tagline: "New York's Finest Deli Experience",
  rating: 5.0,
  reviewCount: 3,
  address: "284 West 4th Street, New York, NY 10014",
  phone: "(212) 555-0198",
  email: "hello@deligrill.com",
  hours: [
    { day: "Mon – Thu", time: "11:00 AM – 10:00 PM" },
    { day: "Friday", time: "11:00 AM – 11:00 PM" },
    { day: "Saturday", time: "10:00 AM – 11:00 PM" },
    { day: "Sunday", time: "10:00 AM – 9:00 PM" },
  ],
};

export const menuCategories = ["All", "Signature", "Grills", "Sandwiches", "Sides"];

export const menuItems = [
  {
    id: "1",
    name: "Classic Reuben",
    price: 18.95,
    category: "Signature",
    popular: true,
    description: "House-cured pastrami, Swiss, sauerkraut, Russian dressing on rye",
    image: "https://images.unsplash.com/photo-1553906059-4d7a48ef7e9a?w=600&q=80",
  },
  {
    id: "2",
    name: "Prime Ribeye Grill",
    price: 42.0,
    category: "Grills",
    popular: true,
    description: "12oz USDA Prime, herb butter, roasted garlic, seasonal vegetables",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80",
  },
  {
    id: "3",
    name: "Smoked Brisket Plate",
    price: 24.5,
    category: "Grills",
    popular: true,
    description: "14-hour smoked brisket, house BBQ glaze, coleslaw, pickles",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80",
  },
  {
    id: "4",
    name: "Manhattan Club",
    price: 16.5,
    category: "Sandwiches",
    popular: false,
    description: "Roasted turkey, bacon, avocado, tomato, aioli on sourdough",
    image: "https://images.unsplash.com/photo-1528735602781-9032a9598752?w=600&q=80",
  },
  {
    id: "5",
    name: "Truffle Fries",
    price: 12.0,
    category: "Sides",
    popular: false,
    description: "Hand-cut fries, truffle oil, parmesan, fresh herbs",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
  },
  {
    id: "6",
    name: "NY Cheesecake",
    price: 10.5,
    category: "Sides",
    popular: false,
    description: "Classic New York style with berry compote",
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=600&q=80",
  },
];

export const galleryImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    alt: "Restaurant interior",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    alt: "Fine dining table",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    alt: "Chef preparing food",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    alt: "Grilled steak",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
    alt: "Cocktail bar",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    alt: "Outdoor seating",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Food Critic, NYC Eats",
    quote:
      "Deli Grill redefines what a New York deli can be. The Reuben alone is worth the trip to West Village.",
    rating: 5,
  },
  {
    id: "2",
    name: "James Chen",
    role: "Regular Guest",
    quote:
      "Every visit feels special. The atmosphere, the service, the food — it's the kind of place you bring people to impress them.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Local Resident",
    quote:
      "Our go-to spot for date night. The prime ribeye is absolutely phenomenal. Five stars, every time.",
    rating: 5,
  },
];
