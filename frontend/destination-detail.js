// Destination Detail Page JavaScript

// Global variables
let currentImageIndex = 0;
let imageUrls = [];
let destinationData = {};

// Destination data structure
const destinationsData = {
  alpine: {
    id: "alpine",
    title: "Alpine Dreamscapes",
    category: "Mountain",
    location: "Swiss Alps, Switzerland",
    fullAddress: "Grindelwald, Swiss Alps, Switzerland",
    price: 299,
    rating: 4.8,
    reviewCount: 124,
    description:
      "Wake up to snow-capped peaks, crackling fireplaces, and the crisp scent of pine. Your mountain retreat awaits in this stunning alpine lodge nestled in the heart of the Swiss Alps. Experience luxury mountain living with panoramic views, world-class skiing, and authentic Swiss hospitality.",
    images: [
      "assets/images/destinations/alpine-lodge.jpg",
      "assets/images/destinations/alpine-lodge.jpg",
      "assets/images/destinations/alpine-lodge.jpg",
      "assets/images/destinations/alpine-lodge.jpg",
      "assets/images/destinations/alpine-lodge.jpg",
    ],
    highlights: [
      {
        icon: "mountain",
        title: "Panoramic Mountain Views",
        description: "Breathtaking 360° views of the Swiss Alps",
      },
      {
        icon: "skiing",
        title: "World-Class Skiing",
        description: "Direct access to premium ski slopes",
      },
      {
        icon: "flame",
        title: "Cozy Fireplace",
        description: "Traditional stone fireplace in every room",
      },
      {
        icon: "coffee",
        title: "Mountain Breakfast",
        description: "Hearty Swiss breakfast with local specialties",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Free Parking" },
      { icon: "swimming-pool", text: "Heated Pool" },
      { icon: "dumbbell", text: "Fitness Center" },
      { icon: "utensils", text: "Restaurant" },
      { icon: "hot-tub", text: "Spa & Wellness" },
      { icon: "skiing", text: "Ski Storage" },
      { icon: "concierge-bell", text: "Concierge Service" },
    ],
    included: [
      "Daily housekeeping",
      "Welcome bottle of Swiss wine",
      "Access to spa facilities",
      "Complimentary breakfast",
      "Ski equipment rental discount",
      "Mountain guide consultation",
    ],
    host: {
      name: "Sarah Mountain",
      experience: "Hosting since 2019",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Michael Chen",
        rating: 5,
        text: "Absolutely stunning location with incredible views. The fireplace was perfect for cozy evenings after skiing.",
      },
      {
        name: "Emma Rodriguez",
        rating: 5,
        text: "The breakfast was amazing and the staff was so helpful with ski recommendations. Will definitely return!",
      },
    ],
  },
  seaside: {
    id: "seaside",
    title: "Seaside Serenity",
    category: "Beach",
    location: "Malibu, California",
    fullAddress: "Pacific Coast Highway, Malibu, CA 90265",
    price: 450,
    rating: 4.9,
    reviewCount: 89,
    description:
      "Ocean waves as your soundtrack, golden sunsets painting the sky, and endless beaches at your doorstep. This beachfront villa offers the ultimate coastal escape with luxury amenities and unparalleled ocean views.",
    images: [
      "assets/images/destinations/seaside-villa.jpg",
      "assets/images/destinations/seaside-villa.jpg",
      "assets/images/destinations/seaside-villa.jpg",
      "assets/images/destinations/seaside-villa.jpg",
      "assets/images/destinations/seaside-villa.jpg",
    ],
    highlights: [
      {
        icon: "waves",
        title: "Private Beach Access",
        description: "Exclusive access to pristine sandy beach",
      },
      {
        icon: "sunset",
        title: "Stunning Sunsets",
        description: "Unobstructed Pacific Ocean sunset views",
      },
      {
        icon: "sailboat",
        title: "Water Sports",
        description: "Complimentary kayaks and surfboards",
      },
      {
        icon: "chef-hat",
        title: "Ocean-to-Table Dining",
        description: "Fresh seafood and coastal cuisine",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Private Parking" },
      { icon: "swimming-pool", text: "Infinity Pool" },
      { icon: "hot-tub", text: "Beachside Jacuzzi" },
      { icon: "utensils", text: "Private Chef Available" },
      { icon: "volleyball", text: "Beach Volleyball" },
      { icon: "sailboat", text: "Water Sports Equipment" },
      { icon: "umbrella", text: "Beach Service" },
    ],
    included: [
      "Daily housekeeping",
      "Welcome champagne service",
      "Beach equipment and chairs",
      "Continental breakfast",
      "Sunset cocktail hour",
      "Water sports equipment",
    ],
    host: {
      name: "Ocean Breeze Rentals",
      experience: "Hosting since 2017",
      rating: 4.9,
    },
    reviews: [
      {
        name: "David Thompson",
        rating: 5,
        text: "The most incredible beach house experience! Waking up to ocean waves was magical.",
      },
      {
        name: "Lisa Park",
        rating: 5,
        text: "Perfect for our family vacation. The kids loved the beach access and the pool was amazing.",
      },
    ],
  },
  metropolitan: {
    id: "metropolitan",
    title: "Metropolitan Marvel",
    category: "City",
    location: "Manhattan, New York",
    fullAddress: "Upper East Side, Manhattan, NY 10021",
    price: 380,
    rating: 4.7,
    reviewCount: 156,
    description:
      "Experience the pulse of the city that never sleeps in this sophisticated Manhattan loft. Floor-to-ceiling windows showcase the iconic skyline while luxury amenities ensure comfort in the heart of urban excitement.",
    images: [
      "assets/images/destinations/metropolitan-loft.jpg",
      "assets/images/destinations/metropolitan-loft.jpg",
      "assets/images/destinations/metropolitan-loft.jpg",
      "assets/images/destinations/metropolitan-loft.jpg",
      "assets/images/destinations/metropolitan-loft.jpg",
    ],
    highlights: [
      {
        icon: "building",
        title: "Skyline Views",
        description: "Panoramic Manhattan skyline and Central Park views",
      },
      {
        icon: "map-pin",
        title: "Prime Location",
        description: "Walking distance to major attractions",
      },
      {
        icon: "shopping-bag",
        title: "Shopping Paradise",
        description: "Steps from Fifth Avenue shopping",
      },
      {
        icon: "theater",
        title: "Broadway Access",
        description: "Easy access to Times Square and Broadway shows",
      },
    ],
    amenities: [
      { icon: "wifi", text: "High-Speed Wi-Fi" },
      { icon: "car", text: "Valet Parking" },
      { icon: "dumbbell", text: "Building Gym" },
      { icon: "shield", text: "24/7 Security" },
      { icon: "elevator", text: "High-Speed Elevators" },
      { icon: "washing-machine", text: "In-Unit Laundry" },
      { icon: "tv", text: "Smart TV Systems" },
      { icon: "concierge-bell", text: "Concierge Service" },
    ],
    included: [
      "Daily housekeeping available",
      "Welcome New York guidebook",
      "Building amenities access",
      "Local restaurant recommendations",
      "Theater booking assistance",
      "Transportation coordination",
    ],
    host: {
      name: "Manhattan Luxury Stays",
      experience: "Hosting since 2015",
      rating: 4.8,
    },
    reviews: [
      {
        name: "Jennifer Wang",
        rating: 5,
        text: "Perfect location for exploring NYC! The views were incredible and the loft was beautifully designed.",
      },
      {
        name: "Robert Adams",
        rating: 4,
        text: "Great base for our business trip. Walking distance to everything we needed.",
      },
    ],
  },
  desert: {
    id: "desert",
    title: "Desert Oasis",
    category: "Desert",
    location: "Scottsdale, Arizona",
    fullAddress: "North Scottsdale, AZ 85255",
    price: 320,
    rating: 4.6,
    reviewCount: 78,
    description:
      "Find tranquility in the Sonoran Desert at this stunning southwestern retreat. Cacti gardens, mountain vistas, and starlit skies create an otherworldly experience in the heart of Arizona's natural beauty.",
    images: [
      "assets/images/destinations/desert-oasis.jpg",
      "assets/images/destinations/desert-oasis.jpg",
      "assets/images/destinations/desert-oasis.jpg",
      "assets/images/destinations/desert-oasis.jpg",
      "assets/images/destinations/desert-oasis.jpg",
    ],
    highlights: [
      {
        icon: "cactus",
        title: "Desert Landscape",
        description: "Authentic Sonoran Desert experience",
      },
      {
        icon: "star",
        title: "Stargazing Paradise",
        description: "Clear skies perfect for astronomical viewing",
      },
      {
        icon: "sunrise",
        title: "Desert Sunrises",
        description: "Spectacular sunrise views over the mountains",
      },
      {
        icon: "hot-tub",
        title: "Outdoor Spa",
        description: "Relax under the desert stars",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Private Parking" },
      { icon: "swimming-pool", text: "Desert Pool" },
      { icon: "hot-tub", text: "Outdoor Hot Tub" },
      { icon: "fire", text: "Fire Pit Area" },
      { icon: "telescope", text: "Telescope Access" },
      { icon: "hiking", text: "Hiking Trails" },
      { icon: "chef-hat", text: "Outdoor Kitchen" },
    ],
    included: [
      "Welcome desert fruit basket",
      "Stargazing equipment",
      "Desert hiking maps",
      "Outdoor fire pit setup",
      "Native plant garden tour",
      "Sunrise yoga mat",
    ],
    host: {
      name: "Desert Retreats",
      experience: "Hosting since 2018",
      rating: 4.7,
    },
    reviews: [
      {
        name: "Maria Santos",
        rating: 5,
        text: "The most peaceful place I've ever stayed. The stargazing was absolutely incredible!",
      },
      {
        name: "John Miller",
        rating: 4,
        text: "Beautiful property with amazing desert views. The hot tub under the stars was perfect.",
      },
    ],
  },
  forest: {
    id: "forest",
    title: "Forest Haven",
    category: "Nature",
    location: "Olympic National Forest, Washington",
    fullAddress: "Olympic Peninsula, WA 98362",
    price: 180,
    rating: 4.9,
    reviewCount: 92,
    description:
      "Whispering pines, misty trails, and the soothing sounds of nature—your peaceful woodland escape awaits. Immerse yourself in the ancient forests of the Pacific Northwest in this eco-friendly cabin.",
    images: [
      "assets/images/destinations/forest-haven.jpg",
      "assets/images/destinations/forest-haven.jpg",
      "assets/images/destinations/forest-haven.jpg",
      "assets/images/destinations/forest-haven.jpg",
      "assets/images/destinations/forest-haven.jpg",
    ],
    highlights: [
      {
        icon: "tree-pine",
        title: "Ancient Forest",
        description: "Surrounded by old-growth forest",
      },
      {
        icon: "bird",
        title: "Wildlife Watching",
        description: "Spot deer, eagles, and forest creatures",
      },
      {
        icon: "droplets",
        title: "Natural Springs",
        description: "Fresh mountain spring water",
      },
      {
        icon: "leaf",
        title: "Eco-Friendly",
        description: "Sustainable and carbon-neutral cabin",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Satellite Internet" },
      { icon: "fire", text: "Wood-Burning Stove" },
      { icon: "droplets", text: "Natural Spring Water" },
      { icon: "book", text: "Nature Library" },
      { icon: "binoculars", text: "Wildlife Viewing Equipment" },
      { icon: "hiking", text: "Private Hiking Trails" },
      { icon: "meditation", text: "Meditation Deck" },
      { icon: "solar-panel", text: "Solar Power" },
    ],
    included: [
      "Organic welcome basket",
      "Firewood for the stove",
      "Wildlife identification guides",
      "Hiking trail maps",
      "Meditation cushions",
      "Nature photography tips",
    ],
    host: {
      name: "Forest Guardians",
      experience: "Hosting since 2020",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Nature Lover",
        rating: 5,
        text: "The most peaceful retreat imaginable. Fell asleep to the sound of owls and woke up to birdsong.",
      },
      {
        name: "Green Traveler",
        rating: 5,
        text: "Perfect eco-friendly escape. The cabin is beautifully integrated with the forest environment.",
      },
    ],
  },
  coastal: {
    id: "coastal",
    title: "Coastal Charm",
    category: "Coastal",
    location: "Maine Coast",
    fullAddress: "Acadia National Park, ME 04609",
    price: 220,
    rating: 4.8,
    reviewCount: 67,
    description:
      "Charming cottages, salty breezes, and oceanfront views—feel the rhythm of the sea in every moment. This traditional New England coastal cottage offers authentic maritime charm.",
    images: [
      "assets/images/destinations/coastal-charm.jpg",
      "assets/images/destinations/coastal-charm.jpg",
      "assets/images/destinations/coastal-charm.jpg",
      "assets/images/destinations/coastal-charm.jpg",
      "assets/images/destinations/coastal-charm.jpg",
    ],
    highlights: [
      {
        icon: "anchor",
        title: "Maritime Heritage",
        description: "Authentic New England coastal experience",
      },
      {
        icon: "lighthouse",
        title: "Lighthouse Views",
        description: "Historic lighthouse visible from cottage",
      },
      {
        icon: "fish",
        title: "Fresh Lobster",
        description: "Local lobster shack recommendations",
      },
      {
        icon: "sailboat",
        title: "Harbor Views",
        description: "Charming working harbor views",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Free Parking" },
      { icon: "fire", text: "Fireplace" },
      { icon: "utensils", text: "Full Kitchen" },
      { icon: "deck-chair", text: "Ocean-View Deck" },
      { icon: "fishing", text: "Fishing Equipment" },
      { icon: "bike", text: "Bicycle Rentals" },
      { icon: "telescope", text: "Harbor Watching" },
    ],
    included: [
      "Welcome lobster dinner kit",
      "Local seafood guide",
      "Harbor walking maps",
      "Lighthouse tour tickets",
      "Tide charts and guides",
      "Beach chairs and umbrellas",
    ],
    host: {
      name: "Coastal Traditions",
      experience: "Hosting since 2016",
      rating: 4.8,
    },
    reviews: [
      {
        name: "Coastal Explorer",
        rating: 5,
        text: "Perfect coastal getaway! The cottage had so much character and the harbor views were stunning.",
      },
      {
        name: "Seafood Lover",
        rating: 5,
        text: "Loved the fresh lobster recommendations and the authentic New England atmosphere.",
      },
    ],
  },
  countryside: {
    id: "countryside",
    title: "Countryside Bliss",
    category: "Countryside",
    location: "Tuscany, Italy",
    fullAddress: "Val d'Orcia, Tuscany, Italy",
    price: 260,
    rating: 4.9,
    reviewCount: 103,
    description:
      "Rolling hills, blooming meadows, and rustic comfort—unplug and unwind in the heart of the countryside. This authentic Tuscan farmhouse offers wine, wellness, and timeless beauty.",
    images: [
      "assets/images/destinations/countryside-bliss.jpg",
      "assets/images/destinations/countryside-bliss.jpg",
      "assets/images/destinations/countryside-bliss.jpg",
      "assets/images/destinations/countryside-bliss.jpg",
      "assets/images/destinations/countryside-bliss.jpg",
    ],
    highlights: [
      {
        icon: "grape",
        title: "Wine Country",
        description: "Private vineyard and wine tasting",
      },
      {
        icon: "wheat",
        title: "Farm-to-Table",
        description: "Organic produce from the property",
      },
      {
        icon: "rolling-hills",
        title: "Rolling Hills",
        description: "Iconic Tuscan landscape views",
      },
      {
        icon: "cooking",
        title: "Cooking Classes",
        description: "Learn authentic Tuscan cuisine",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Private Parking" },
      { icon: "swimming-pool", text: "Infinity Pool" },
      { icon: "grape", text: "Private Vineyard" },
      { icon: "utensils", text: "Tuscan Kitchen" },
      { icon: "olive", text: "Olive Grove" },
      { icon: "bike", text: "Countryside Bikes" },
      { icon: "spa", text: "Wellness Center" },
    ],
    included: [
      "Welcome wine tasting",
      "Fresh produce basket",
      "Cooking class session",
      "Vineyard tour",
      "Olive oil tasting",
      "Countryside cycling maps",
    ],
    host: {
      name: "Tuscan Traditions",
      experience: "Hosting since 2014",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Wine Enthusiast",
        rating: 5,
        text: "The most authentic Tuscan experience! The wine was incredible and the cooking class was amazing.",
      },
      {
        name: "Peaceful Traveler",
        rating: 5,
        text: "Perfect for a relaxing getaway. The views were breathtaking and the hosts were wonderful.",
      },
    ],
  },
  tropical: {
    id: "tropical",
    title: "Tropical Tranquility",
    category: "Tropical",
    location: "Maui, Hawaii",
    fullAddress: "Wailea, Maui, HI 96753",
    price: 520,
    rating: 4.9,
    reviewCount: 145,
    description:
      "Swaying palms, crystal-clear waters, and sun-kissed sands—your island paradise is calling. This luxury beachfront resort offers the ultimate tropical escape with world-class amenities.",
    images: [
      "assets/images/destinations/tropical-tranquility.jpg",
      "assets/images/destinations/tropical-tranquility.jpg",
      "assets/images/destinations/tropical-tranquility.jpg",
      "assets/images/destinations/tropical-tranquility.jpg",
      "assets/images/destinations/tropical-tranquility.jpg",
    ],
    highlights: [
      {
        icon: "palm-tree",
        title: "Private Beach",
        description: "Exclusive access to pristine white sand beach",
      },
      {
        icon: "diving-mask",
        title: "Snorkeling Paradise",
        description: "World-class snorkeling and diving",
      },
      {
        icon: "tropical-drink",
        title: "Tiki Bar",
        description: "Beachside cocktails and tropical drinks",
      },
      {
        icon: "sunset",
        title: "Maui Sunsets",
        description: "Legendary Hawaiian sunset views",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Valet Parking" },
      { icon: "swimming-pool", text: "Lagoon Pool" },
      { icon: "hot-tub", text: "Beachside Spa" },
      { icon: "utensils", text: "Ocean View Restaurant" },
      { icon: "diving-mask", text: "Water Sports Center" },
      { icon: "dumbbell", text: "Fitness Center" },
      { icon: "golf", text: "Championship Golf" },
    ],
    included: [
      "Welcome lei ceremony",
      "Daily tropical breakfast",
      "Beach equipment and chairs",
      "Snorkeling gear",
      "Sunset sailing trip",
      "Hawaiian cultural activities",
    ],
    host: {
      name: "Maui Luxury Resorts",
      experience: "Hosting since 2012",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Island Lover",
        rating: 5,
        text: "Pure paradise! The beach was incredible and the snorkeling was the best I've ever experienced.",
      },
      {
        name: "Honeymoon Couple",
        rating: 5,
        text: "Perfect for our honeymoon. The sunsets were magical and the service was outstanding.",
      },
    ],
  },
  tuscan: {
    id: "tuscan",
    title: "Tuscan Countryside Estate",
    category: "Countryside",
    location: "Tuscany, Italy",
    fullAddress: "Val d'Orcia, Tuscany, Italy",
    price: 180,
    rating: 4.7,
    reviewCount: 156,
    description:
      "Charming villa surrounded by rolling hills, vineyards, and olive groves in the heart of Tuscany. Experience authentic Italian countryside living with world-class wine, traditional cuisine, and breathtaking landscapes.",
    images: [
      "assets/images/destinations/tuscan-villa.jpg",
      "assets/images/destinations/tuscan-villa.jpg",
      "assets/images/destinations/tuscan-villa.jpg",
      "assets/images/destinations/tuscan-villa.jpg",
      "assets/images/destinations/tuscan-villa.jpg",
    ],
    highlights: [
      {
        icon: "wine",
        title: "Wine Tasting",
        description: "Exclusive access to local vineyards",
      },
      {
        icon: "chef-hat",
        title: "Cooking Classes",
        description: "Learn traditional Tuscan recipes",
      },
      {
        icon: "swimming-pool",
        title: "Infinity Pool",
        description: "Overlooking the rolling hills",
      },
      {
        icon: "garden",
        title: "Olive Grove",
        description: "Ancient olive trees and gardens",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "swimming-pool", text: "Infinity Pool" },
      { icon: "garden", text: "Private Garden" },
      { icon: "fire", text: "Fireplace" },
      { icon: "wine", text: "Wine Cellar" },
      { icon: "chef-hat", text: "Professional Kitchen" },
      { icon: "car", text: "Free Parking" },
      { icon: "bicycle", text: "Bicycle Rental" },
    ],
    included: [
      "Daily housekeeping",
      "Welcome bottle of local wine",
      "Breakfast with local products",
      "Wine tasting experience",
      "Cooking class with chef",
      "Garden and pool access",
    ],
    host: {
      name: "Tuscan Dreams",
      experience: "Hosting since 2016",
      rating: 4.8,
    },
    reviews: [
      {
        name: "Sofia Rossi",
        rating: 5,
        text: "Absolutely magical! The wine tasting was incredible and the views were breathtaking.",
      },
      {
        name: "Marco Bianchi",
        rating: 5,
        text: "Perfect Tuscan experience. The cooking class was the highlight of our trip.",
      },
    ],
  },
  rainforest: {
    id: "rainforest",
    title: "Tropical Rainforest Lodge",
    category: "Nature",
    location: "Costa Rica",
    fullAddress: "Monteverde Cloud Forest, Costa Rica",
    price: 165,
    rating: 4.8,
    reviewCount: 91,
    description:
      "Eco-friendly lodge immersed in lush rainforest with incredible wildlife and sustainable luxury. Experience the magic of the cloud forest with guided tours, zip lining, and authentic Costa Rican hospitality.",
    images: [
      "assets/images/destinations/rainforest-lodge.jpg",
      "assets/images/destinations/rainforest-lodge.jpg",
      "assets/images/destinations/rainforest-lodge.jpg",
      "assets/images/destinations/rainforest-lodge.jpg",
      "assets/images/destinations/rainforest-lodge.jpg",
    ],
    highlights: [
      {
        icon: "tree-pine",
        title: "Cloud Forest",
        description: "Immersed in Monteverde Cloud Forest",
      },
      {
        icon: "zap",
        title: "Zip Lining",
        description: "Adventure through the canopy",
      },
      {
        icon: "leaf",
        title: "Eco-Friendly",
        description: "100% sustainable operations",
      },
      {
        icon: "eye",
        title: "Wildlife Tours",
        description: "Guided wildlife spotting",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Satellite Internet" },
      { icon: "leaf", text: "Organic Restaurant" },
      { icon: "spa", text: "Spa Services" },
      { icon: "hiking", text: "Guided Tours" },
      { icon: "zap", text: "Zip Line Access" },
      { icon: "binoculars", text: "Wildlife Equipment" },
      { icon: "droplets", text: "Natural Springs" },
      { icon: "solar-panel", text: "Solar Power" },
    ],
    included: [
      "Daily guided tours",
      "Organic meals",
      "Zip line adventure",
      "Wildlife equipment",
      "Spa treatment",
      "Transportation to activities",
    ],
    host: {
      name: "Eco Costa Rica",
      experience: "Hosting since 2014",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Eco Traveler",
        rating: 5,
        text: "Incredible eco-friendly experience! The zip lining was thrilling and the wildlife was amazing.",
      },
      {
        name: "Nature Lover",
        rating: 5,
        text: "Perfect blend of adventure and luxury. The cloud forest was magical.",
      },
    ],
  },
  santorini: {
    id: "santorini",
    title: "Cliffside Ocean Resort",
    category: "Beach",
    location: "Santorini, Greece",
    fullAddress: "Oia, Santorini, Greece",
    price: 420,
    rating: 4.9,
    reviewCount: 145,
    description:
      "Dramatic cliffside location with infinity pools, white-washed architecture, and stunning sunset views. Experience the iconic beauty of Santorini with luxury amenities and authentic Greek hospitality.",
    images: [
      "assets/images/destinations/santorini-resort.jpg",
      "assets/images/destinations/santorini-resort.jpg",
      "assets/images/destinations/santorini-resort.jpg",
      "assets/images/destinations/santorini-resort.jpg",
      "assets/images/destinations/santorini-resort.jpg",
    ],
    highlights: [
      {
        icon: "sunset",
        title: "Sunset Views",
        description: "World-famous Santorini sunsets",
      },
      {
        icon: "swimming-pool",
        title: "Infinity Pool",
        description: "Overlooking the Aegean Sea",
      },
      {
        icon: "building",
        title: "White Architecture",
        description: "Traditional Cycladic design",
      },
      {
        icon: "utensils",
        title: "Fine Dining",
        description: "Mediterranean cuisine",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "swimming-pool", text: "Infinity Pool" },
      { icon: "spa", text: "Spa & Wellness" },
      { icon: "utensils", text: "Fine Dining" },
      { icon: "terrace", text: "Private Terrace" },
      { icon: "concierge-bell", text: "Concierge Service" },
      { icon: "car", text: "Airport Transfer" },
      { icon: "wine", text: "Wine Cellar" },
    ],
    included: [
      "Daily breakfast",
      "Welcome cocktail",
      "Spa access",
      "Sunset viewing area",
      "Concierge service",
      "Airport transfer",
    ],
    host: {
      name: "Santorini Luxury",
      experience: "Hosting since 2013",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Romantic Couple",
        rating: 5,
        text: "The most romantic place on earth! The sunsets were absolutely magical.",
      },
      {
        name: "Greek Explorer",
        rating: 5,
        text: "Perfect Santorini experience. The infinity pool was incredible.",
      },
    ],
  },
  tokyo: {
    id: "tokyo",
    title: "Urban Boutique Hotel",
    category: "City",
    location: "Tokyo, Japan",
    fullAddress: "Shibuya, Tokyo, Japan",
    price: 280,
    rating: 4.6,
    reviewCount: 188,
    description:
      "Modern boutique hotel blending traditional Japanese design with contemporary luxury in bustling Tokyo. Experience the perfect harmony of old and new Japan with world-class amenities and authentic cultural experiences.",
    images: [
      "assets/images/destinations/tokyo-hotel.jpg",
      "assets/images/destinations/tokyo-hotel.jpg",
      "assets/images/destinations/tokyo-hotel.jpg",
      "assets/images/destinations/tokyo-hotel.jpg",
      "assets/images/destinations/tokyo-hotel.jpg",
    ],
    highlights: [
      {
        icon: "building",
        title: "Modern Design",
        description: "Contemporary Japanese architecture",
      },
      {
        icon: "tea",
        title: "Tea Ceremony",
        description: "Traditional Japanese tea service",
      },
      {
        icon: "garden",
        title: "Zen Garden",
        description: "Peaceful traditional garden",
      },
      {
        icon: "map-pin",
        title: "Prime Location",
        description: "Heart of Shibuya district",
      },
    ],
    amenities: [
      { icon: "wifi", text: "High-Speed Wi-Fi" },
      { icon: "spa", text: "Spa & Wellness" },
      { icon: "utensils", text: "Restaurant" },
      { icon: "concierge-bell", text: "Concierge Service" },
      { icon: "tea", text: "Tea Ceremony Room" },
      { icon: "garden", text: "Zen Garden" },
      { icon: "tv", text: "Smart TV" },
      { icon: "car", text: "Valet Parking" },
    ],
    included: [
      "Daily breakfast",
      "Tea ceremony experience",
      "Concierge service",
      "Garden access",
      "Local guide recommendations",
      "Transportation assistance",
    ],
    host: {
      name: "Tokyo Traditions",
      experience: "Hosting since 2017",
      rating: 4.7,
    },
    reviews: [
      {
        name: "Japan Explorer",
        rating: 5,
        text: "Perfect blend of modern luxury and traditional Japanese culture. The tea ceremony was beautiful.",
      },
      {
        name: "Business Traveler",
        rating: 4,
        text: "Excellent location and service. The zen garden was a peaceful escape from the city.",
      },
    ],
  },
  castle: {
    id: "castle",
    title: "Highland Castle Experience",
    category: "Historic",
    location: "Scottish Highlands, UK",
    fullAddress: "Inverness-shire, Scottish Highlands",
    price: 195,
    rating: 4.7,
    reviewCount: 112,
    description:
      "Historic castle offering royal treatment with medieval charm, highland views, and luxury accommodations. Experience the romance and grandeur of Scottish history in this authentic castle setting.",
    images: [
      "assets/images/destinations/scottish-castle.jpg",
      "assets/images/destinations/scottish-castle.jpg",
      "assets/images/destinations/scottish-castle.jpg",
      "assets/images/destinations/scottish-castle.jpg",
      "assets/images/destinations/scottish-castle.jpg",
    ],
    highlights: [
      {
        icon: "crown",
        title: "Royal Experience",
        description: "Live like Scottish royalty",
      },
      {
        icon: "mountain",
        title: "Highland Views",
        description: "Breathtaking mountain vistas",
      },
      {
        icon: "book",
        title: "Historic Library",
        description: "Ancient books and manuscripts",
      },
      {
        icon: "utensils",
        title: "Fine Dining",
        description: "Traditional Scottish cuisine",
      },
    ],
    amenities: [
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "utensils", text: "Fine Dining" },
      { icon: "spa", text: "Spa & Wellness" },
      { icon: "book", text: "Historic Library" },
      { icon: "mountain", text: "Highland Views" },
      { icon: "fire", text: "Great Hall Fireplace" },
      { icon: "concierge-bell", text: "Butler Service" },
      { icon: "car", text: "Free Parking" },
    ],
    included: [
      "Daily breakfast",
      "Castle tour",
      "Highland guide service",
      "Library access",
      "Traditional dinner",
      "Whisky tasting",
    ],
    host: {
      name: "Highland Heritage",
      experience: "Hosting since 2015",
      rating: 4.8,
    },
    reviews: [
      {
        name: "History Buff",
        rating: 5,
        text: "Absolutely magical! Sleeping in a real castle was a dream come true.",
      },
      {
        name: "Scotland Lover",
        rating: 5,
        text: "The highland views were incredible and the castle tour was fascinating.",
      },
    ],
  },
  "private-island": {
    id: "private-island",
    title: "Private Island Escape",
    category: "Luxury",
    location: "Seychelles",
    fullAddress: "Private Island, Seychelles",
    price: 1200,
    rating: 5.0,
    reviewCount: 32,
    description:
      "Exclusive private island with pristine beaches, crystal waters, and unmatched privacy and luxury. Experience ultimate seclusion with personalized service and world-class amenities in paradise.",
    images: [
      "assets/images/destinations/private-island.jpg",
      "assets/images/destinations/private-island.jpg",
      "assets/images/destinations/private-island.jpg",
      "assets/images/destinations/private-island.jpg",
      "assets/images/destinations/private-island.jpg",
    ],
    highlights: [
      {
        icon: "island",
        title: "Private Island",
        description: "Exclusive island ownership",
      },
      {
        icon: "concierge-bell",
        title: "Butler Service",
        description: "24/7 personalized service",
      },
      {
        icon: "sailboat",
        title: "Private Yacht",
        description: "Exclusive yacht access",
      },
      {
        icon: "helicopter",
        title: "Helicopter Access",
        description: "Private helicopter transfers",
      },
    ],
    amenities: [
      { icon: "island", text: "Private Island" },
      { icon: "concierge-bell", text: "Butler Service" },
      { icon: "sailboat", text: "Private Yacht" },
      { icon: "spa", text: "Spa & Wellness" },
      { icon: "utensils", text: "Fine Dining" },
      { icon: "helicopter", text: "Helicopter Access" },
      { icon: "swimming-pool", text: "Infinity Pool" },
      { icon: "beach", text: "Private Beach" },
    ],
    included: [
      "Private island access",
      "Butler service",
      "Yacht excursions",
      "Spa treatments",
      "Fine dining",
      "Helicopter transfers",
    ],
    host: {
      name: "Island Paradise",
      experience: "Hosting since 2011",
      rating: 5.0,
    },
    reviews: [
      {
        name: "Luxury Traveler",
        rating: 5,
        text: "The ultimate luxury experience! Having a private island to ourselves was incredible.",
      },
      {
        name: "Honeymoon Couple",
        rating: 5,
        text: "Perfect for our honeymoon. The privacy and service were unmatched.",
      },
    ],
  },
  aspen: {
    id: "aspen",
    title: "Ski Chalet Deluxe",
    category: "Mountain",
    location: "Aspen, Colorado",
    fullAddress: "Aspen Mountain, CO 81611",
    price: 485,
    rating: 4.8,
    reviewCount: 167,
    description:
      "Luxury ski chalet with direct slope access, hot tub, and panoramic mountain views in world-famous Aspen. Experience the ultimate ski-in/ski-out luxury with world-class amenities and stunning Rocky Mountain scenery.",
    images: [
      "assets/images/destinations/aspen-chalet.jpg",
      "assets/images/destinations/aspen-chalet.jpg",
      "assets/images/destinations/aspen-chalet.jpg",
      "assets/images/destinations/aspen-chalet.jpg",
      "assets/images/destinations/aspen-chalet.jpg",
    ],
    highlights: [
      {
        icon: "skiing",
        title: "Ski-in/Ski-out",
        description: "Direct access to Aspen Mountain",
      },
      {
        icon: "hot-tub",
        title: "Hot Tub",
        description: "Mountain view hot tub",
      },
      {
        icon: "fire",
        title: "Fireplace",
        description: "Cozy stone fireplace",
      },
      {
        icon: "mountain",
        title: "Mountain Views",
        description: "Panoramic Rocky Mountain vistas",
      },
    ],
    amenities: [
      { icon: "skiing", text: "Ski-in/Ski-out" },
      { icon: "hot-tub", text: "Hot Tub" },
      { icon: "fire", text: "Fireplace" },
      { icon: "mountain", text: "Mountain Views" },
      { icon: "chef-hat", text: "Chef Service" },
      { icon: "wine", text: "Wine Cellar" },
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Free Parking" },
    ],
    included: [
      "Ski equipment storage",
      "Hot tub access",
      "Chef service",
      "Wine cellar access",
      "Mountain guide service",
      "Transportation to town",
    ],
    host: {
      name: "Aspen Luxury",
      experience: "Hosting since 2014",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Ski Enthusiast",
        rating: 5,
        text: "Perfect ski-in/ski-out location! The hot tub after skiing was amazing.",
      },
      {
        name: "Mountain Lover",
        rating: 5,
        text: "Incredible mountain views and the chalet was beautifully appointed.",
      },
    ],
  },
  amazon: {
    id: "amazon",
    title: "Jungle Canopy Lodge",
    category: "Nature",
    location: "Amazon, Brazil",
    fullAddress: "Manaus, Amazon Rainforest, Brazil",
    price: 145,
    rating: 4.6,
    reviewCount: 78,
    description:
      "Sustainable lodge high in the jungle canopy with incredible biodiversity and authentic Amazon experience. Immerse yourself in the world's largest rainforest with guided tours and eco-friendly luxury.",
    images: [
      "assets/images/destinations/amazon-lodge.jpg",
      "assets/images/destinations/amazon-lodge.jpg",
      "assets/images/destinations/amazon-lodge.jpg",
      "assets/images/destinations/amazon-lodge.jpg",
      "assets/images/destinations/amazon-lodge.jpg",
    ],
    highlights: [
      {
        icon: "tree-pine",
        title: "Canopy Lodge",
        description: "High in the jungle canopy",
      },
      {
        icon: "eye",
        title: "Wildlife Viewing",
        description: "Incredible biodiversity",
      },
      {
        icon: "leaf",
        title: "Sustainable",
        description: "Eco-friendly operations",
      },
      {
        icon: "map",
        title: "Guided Tours",
        description: "Expert local guides",
      },
    ],
    amenities: [
      { icon: "tree-pine", text: "Canopy Lodge" },
      { icon: "eye", text: "Wildlife Viewing" },
      { icon: "map", text: "Guided Tours" },
      { icon: "leaf", text: "Sustainable" },
      { icon: "microscope", text: "Research Center" },
      { icon: "bridge", text: "Canopy Walk" },
      { icon: "utensils", text: "Local Cuisine" },
      { icon: "wifi", text: "Satellite Internet" },
    ],
    included: [
      "Lodge accommodation",
      "Guided tours",
      "Research center access",
      "Canopy walk experience",
      "Local cuisine",
      "Wildlife equipment",
    ],
    host: {
      name: "Amazon Adventures",
      experience: "Hosting since 2016",
      rating: 4.7,
    },
    reviews: [
      {
        name: "Nature Explorer",
        rating: 5,
        text: "Incredible experience in the Amazon! The wildlife was amazing and the lodge was perfect.",
      },
      {
        name: "Eco Traveler",
        rating: 4,
        text: "Great sustainable lodge with excellent guides. The canopy walk was thrilling.",
      },
    ],
  },
  "pacific-northwest": {
    id: "pacific-northwest",
    title: "Whispering Pines Forest Retreat",
    category: "Nature",
    location: "Pacific Northwest, USA",
    fullAddress: "Olympic Peninsula, Washington",
    price: 189,
    rating: 4.8,
    reviewCount: 156,
    description:
      "Immerse yourself in ancient forests with towering pines, misty trails, and the peaceful sounds of nature all around. Experience the magic of the Pacific Northwest in this eco-friendly forest retreat.",
    images: [
      "assets/images/destinations/pacific-northwest.jpg",
      "assets/images/destinations/pacific-northwest.jpg",
      "assets/images/destinations/pacific-northwest.jpg",
      "assets/images/destinations/pacific-northwest.jpg",
      "assets/images/destinations/pacific-northwest.jpg",
    ],
    highlights: [
      {
        icon: "tree-pine",
        title: "Ancient Forest",
        description: "Towering pine trees",
      },
      {
        icon: "eye",
        title: "Wildlife Watching",
        description: "Forest creatures",
      },
      {
        icon: "fire",
        title: "Fireplace",
        description: "Cozy wood fireplace",
      },
      {
        icon: "leaf",
        title: "Nature Sounds",
        description: "Peaceful forest ambiance",
      },
    ],
    amenities: [
      { icon: "hiking", text: "Forest Trails" },
      { icon: "eye", text: "Wildlife Watching" },
      { icon: "fire", text: "Fireplace" },
      { icon: "leaf", text: "Nature Sounds" },
      { icon: "utensils", text: "Organic Meals" },
      { icon: "meditation", text: "Yoga Deck" },
      { icon: "wifi", text: "Satellite Internet" },
      { icon: "car", text: "Free Parking" },
    ],
    included: [
      "Guided trails",
      "Wildlife guide",
      "Organic meals",
      "Forest activities",
      "Yoga deck access",
      "Nature equipment",
    ],
    host: {
      name: "Forest Guardians",
      experience: "Hosting since 2019",
      rating: 4.8,
    },
    reviews: [
      {
        name: "Forest Lover",
        rating: 5,
        text: "Perfect forest retreat! The ancient trees were magnificent and the peace was incredible.",
      },
      {
        name: "Nature Enthusiast",
        rating: 5,
        text: "Amazing wildlife watching and the forest trails were beautiful.",
      },
    ],
  },
  "maine-coast": {
    id: "maine-coast",
    title: "Oceanfront Cottage Collection",
    category: "Coastal",
    location: "Maine Coast, USA",
    fullAddress: "Acadia National Park, Maine",
    price: 235,
    rating: 4.7,
    reviewCount: 298,
    description:
      "Charming seaside cottages with weathered shingles, panoramic ocean views, and the constant melody of waves. Experience authentic New England coastal charm with traditional architecture and modern comfort.",
    images: [
      "assets/images/destinations/maine-coast.jpg",
      "assets/images/destinations/maine-coast.jpg",
      "assets/images/destinations/maine-coast.jpg",
      "assets/images/destinations/maine-coast.jpg",
      "assets/images/destinations/maine-coast.jpg",
    ],
    highlights: [
      {
        icon: "waves",
        title: "Ocean Views",
        description: "Panoramic Atlantic views",
      },
      {
        icon: "beach",
        title: "Private Beach",
        description: "Exclusive beach access",
      },
      {
        icon: "fire",
        title: "Fireplace",
        description: "Cozy stone fireplace",
      },
      {
        icon: "sailboat",
        title: "Kayaks",
        description: "Complimentary kayaks",
      },
    ],
    amenities: [
      { icon: "waves", text: "Ocean Views" },
      { icon: "beach", text: "Private Beach" },
      { icon: "fire", text: "Fireplace" },
      { icon: "deck", text: "Deck" },
      { icon: "sailboat", text: "Kayaks" },
      { icon: "utensils", text: "Lobster Dinner" },
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Free Parking" },
    ],
    included: [
      "Beach access",
      "Kayak rental",
      "Lobster dinner",
      "Beach activities",
      "Local guide service",
      "Transportation assistance",
    ],
    host: {
      name: "Maine Coastal",
      experience: "Hosting since 2015",
      rating: 4.8,
    },
    reviews: [
      {
        name: "Coastal Lover",
        rating: 5,
        text: "Perfect New England coastal experience! The lobster dinner was amazing.",
      },
      {
        name: "Nature Enthusiast",
        rating: 5,
        text: "Beautiful ocean views and the kayaking was incredible.",
      },
    ],
  },
  cotswolds: {
    id: "cotswolds",
    title: "Rolling Hills Farm Stay",
    category: "Countryside",
    location: "Cotswolds, England",
    fullAddress: "Cotswolds, Gloucestershire, UK",
    price: 165,
    rating: 4.9,
    reviewCount: 203,
    description:
      "Experience authentic countryside life with rolling green hills, blooming meadows, and rustic stone cottages. Immerse yourself in the quintessential English countryside with traditional farming and modern luxury.",
    images: [
      "assets/images/destinations/cotswolds-farm.jpg",
      "assets/images/destinations/cotswolds-farm.jpg",
      "assets/images/destinations/cotswolds-farm.jpg",
      "assets/images/destinations/cotswolds-farm.jpg",
      "assets/images/destinations/cotswolds-farm.jpg",
    ],
    highlights: [
      {
        icon: "tractor",
        title: "Farm Tours",
        description: "Authentic farming experience",
      },
      {
        icon: "horse",
        title: "Horseback Riding",
        description: "Scenic countryside rides",
      },
      {
        icon: "garden",
        title: "Organic Garden",
        description: "Fresh farm produce",
      },
      {
        icon: "building",
        title: "Stone Cottage",
        description: "Traditional architecture",
      },
    ],
    amenities: [
      { icon: "tractor", text: "Farm Tours" },
      { icon: "horse", text: "Horseback Riding" },
      { icon: "garden", text: "Organic Garden" },
      { icon: "building", text: "Stone Cottage" },
      { icon: "hiking", text: "Country Walks" },
      { icon: "utensils", text: "Farm Breakfast" },
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Free Parking" },
    ],
    included: [
      "Farm tours",
      "Organic meals",
      "Country activities",
      "Garden access",
      "Local guide service",
      "Transportation assistance",
    ],
    host: {
      name: "Cotswolds Farm",
      experience: "Hosting since 2017",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Countryside Lover",
        rating: 5,
        text: "Perfect English countryside experience! The farm tours were fascinating.",
      },
      {
        name: "Nature Enthusiast",
        rating: 5,
        text: "Beautiful rolling hills and the horseback riding was incredible.",
      },
    ],
  },
  "bora-bora": {
    id: "bora-bora",
    title: "Paradise Island Resort",
    category: "Tropical",
    location: "Bora Bora, French Polynesia",
    fullAddress: "Bora Bora, French Polynesia",
    price: 485,
    rating: 4.9,
    reviewCount: 127,
    description:
      "Overwater bungalows surrounded by swaying palms, crystal-clear lagoons, and pristine white sand beaches. Experience the ultimate tropical paradise with luxury overwater accommodations and authentic Polynesian culture.",
    images: [
      "assets/images/destinations/bora-bora.jpg",
      "assets/images/destinations/bora-bora.jpg",
      "assets/images/destinations/bora-bora.jpg",
      "assets/images/destinations/bora-bora.jpg",
      "assets/images/destinations/bora-bora.jpg",
    ],
    highlights: [
      {
        icon: "house",
        title: "Overwater Bungalow",
        description: "Luxury overwater accommodation",
      },
      {
        icon: "waves",
        title: "Private Lagoon",
        description: "Crystal-clear lagoon access",
      },
      {
        icon: "fish",
        title: "Snorkeling",
        description: "World-class snorkeling",
      },
      {
        icon: "spa",
        title: "Spa",
        description: "Tropical spa treatments",
      },
    ],
    amenities: [
      { icon: "house", text: "Overwater Bungalow" },
      { icon: "waves", text: "Private Lagoon" },
      { icon: "fish", text: "Snorkeling" },
      { icon: "spa", text: "Spa" },
      { icon: "sunset", text: "Sunset Dinners" },
      { icon: "sailboat", text: "Water Sports" },
      { icon: "wifi", text: "Free Wi-Fi" },
      { icon: "car", text: "Airport Transfer" },
    ],
    included: [
      "Bungalow accommodation",
      "Meals included",
      "Water activities",
      "Spa access",
      "Sunset dinners",
      "Airport transfer",
    ],
    host: {
      name: "Bora Bora Paradise",
      experience: "Hosting since 2013",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Tropical Lover",
        rating: 5,
        text: "Absolute paradise! The overwater bungalow was incredible.",
      },
      {
        name: "Island Explorer",
        rating: 5,
        text: "Perfect tropical escape. The snorkeling was amazing.",
      },
    ],
  },
};

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Get destination ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const destinationId = urlParams.get("destination");

  if (destinationId && destinationsData[destinationId]) {
    destinationData = destinationsData[destinationId];
    populateDestinationDetails();
    initializeDateInputs();
    calculatePricing();
  } else {
    showError("Destination not found");
  }

  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
});

function populateDestinationDetails() {
  const loadingState = document.getElementById("loading-state");
  const mainContent = document.getElementById("main-content");

  // Hide loading and show content
  loadingState.style.display = "none";
  mainContent.style.display = "block";

  // Update page title
  document.title = `${destinationData.title} - Travel Booking`;

  // Populate basic information
  document.getElementById("destination-title").textContent =
    destinationData.title;
  document.getElementById("breadcrumb-title").textContent =
    destinationData.title;
  document.getElementById("destination-location").innerHTML = `
    <i data-lucide="map-pin"></i>
    ${destinationData.location}
  `;
  document.getElementById("full-address").innerHTML = `
    <i data-lucide="map-pin"></i>
    <span>${destinationData.fullAddress}</span>
  `;
  document.getElementById("destination-description").innerHTML =
    `<p>${destinationData.description}</p>`;

  // Update category tag
  document.getElementById("category-tag").textContent =
    destinationData.category;

  // Update pricing
  document.getElementById("destination-price").textContent =
    `$${destinationData.price}`;
  document.getElementById("sidebar-price").textContent =
    `$${destinationData.price}`;

  // Update ratings
  updateRatings();

  // Populate images
  setupImageGallery();

  // Populate highlights
  populateHighlights();

  // Populate amenities
  populateAmenities();

  // Populate included items
  populateIncluded();

  // Populate reviews
  populateReviews();

  // Populate host information
  populateHostInfo();

  // Populate similar destinations
  populateSimilarDestinations();

  // Reinitialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function updateRatings() {
  const rating = destinationData.rating;
  const reviewCount = destinationData.reviewCount;

  // Update rating displays
  document.getElementById("rating-text").textContent =
    `${rating} (${reviewCount} reviews)`;
  document.getElementById("sidebar-rating").textContent =
    `${rating} (${reviewCount})`;
  document.getElementById("overall-rating").textContent = rating;
  document.getElementById("total-reviews-count").textContent =
    `${reviewCount} reviews`;

  // Update star displays
  const starContainers = ["rating-stars", "sidebar-stars", "overview-stars"];
  starContainers.forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = generateStars(rating);
    }
  });
}

function generateStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i data-lucide="star" class="star"></i>';
  }

  if (hasHalfStar) {
    starsHTML += '<i data-lucide="star-half" class="star"></i>';
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i data-lucide="star" class="star empty"></i>';
  }

  return starsHTML;
}

function setupImageGallery() {
  imageUrls = destinationData.images;
  currentImageIndex = 0;

  // Set main image
  const mainImage = document.getElementById("main-image");
  mainImage.src = imageUrls[0];
  mainImage.alt = destinationData.title;

  // Update image counter
  document.getElementById("current-image").textContent = "1";
  document.getElementById("total-images").textContent = imageUrls.length;

  // Generate thumbnails
  const thumbnailsContainer = document.getElementById("thumbnails-container");
  thumbnailsContainer.innerHTML = "";

  imageUrls.forEach((url, index) => {
    const thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";
    if (index === 0) thumbnail.classList.add("active");

    thumbnail.innerHTML = `
      <img src="${url}" alt="${destinationData.title} - Image ${index + 1}">
      <div class="thumbnail-overlay">
        ${index < 4 ? "" : `+${imageUrls.length - 4} more`}
      </div>
    `;

    thumbnail.addEventListener("click", () => goToImage(index));
    thumbnailsContainer.appendChild(thumbnail);

    // Only show first 4 thumbnails on desktop
    if (index >= 4) {
      thumbnail.style.display = "none";
    }
  });
}

function goToImage(index) {
  currentImageIndex = index;

  // Update main image
  const mainImage = document.getElementById("main-image");
  mainImage.src = imageUrls[index];

  // Update counter
  document.getElementById("current-image").textContent = index + 1;

  // Update active thumbnail
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

function nextImage() {
  const nextIndex = (currentImageIndex + 1) % imageUrls.length;
  goToImage(nextIndex);
}

function previousImage() {
  const prevIndex =
    (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
  goToImage(prevIndex);
}

function populateHighlights() {
  const container = document.getElementById("highlights-container");
  container.innerHTML = "";

  destinationData.highlights.forEach((highlight) => {
    const highlightElement = document.createElement("div");
    highlightElement.className = "highlight-item";
    highlightElement.innerHTML = `
      <div class="highlight-icon">
        <i data-lucide="${highlight.icon}"></i>
      </div>
      <div class="highlight-text">
        <h4>${highlight.title}</h4>
        <p>${highlight.description}</p>
      </div>
    `;
    container.appendChild(highlightElement);
  });
}

function populateAmenities() {
  const container = document.getElementById("amenities-container");
  container.innerHTML = "";

  destinationData.amenities.forEach((amenity) => {
    const amenityElement = document.createElement("div");
    amenityElement.className = "amenity-item";
    amenityElement.innerHTML = `
      <i data-lucide="${amenity.icon}" class="amenity-icon"></i>
      <span>${amenity.text}</span>
    `;
    container.appendChild(amenityElement);
  });
}

function populateIncluded() {
  const container = document.getElementById("included-container");
  container.innerHTML = "";

  destinationData.included.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "included-item";
    itemElement.innerHTML = `
      <i data-lucide="check" class="included-icon"></i>
      <span>${item}</span>
    `;
    container.appendChild(itemElement);
  });
}

function populateReviews() {
  const container = document.getElementById("recent-reviews");
  container.innerHTML = "";

  destinationData.reviews.forEach((review) => {
    const reviewElement = document.createElement("div");
    reviewElement.className = "review-item";
    reviewElement.innerHTML = `
      <div class="review-header">
        <span class="reviewer-name">${review.name}</span>
        <div class="stars small">${generateStars(review.rating)}</div>
      </div>
      <p class="review-text">${review.text}</p>
    `;
    container.appendChild(reviewElement);
  });
}

function populateHostInfo() {
  document.getElementById("host-name").textContent = destinationData.host.name;
  document.getElementById("host-experience").textContent =
    destinationData.host.experience;
}

function populateSimilarDestinations() {
  const container = document.getElementById("similar-destinations");
  container.innerHTML = "";

  // Get 3 random destinations excluding current one
  const otherDestinations = Object.values(destinationsData)
    .filter((dest) => dest.id !== destinationData.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  otherDestinations.forEach((dest) => {
    const card = document.createElement("div");
    card.className = "similar-card";
    card.onclick = () => navigateToDestination(dest.id);

    card.innerHTML = `
      <div class="similar-card-image">
        <img src="${dest.images[0]}" alt="${dest.title}">
      </div>
      <div class="similar-card-content">
        <h4>${dest.title}</h4>
        <p>${dest.description.substring(0, 100)}...</p>
        <div class="similar-card-footer">
          <span class="similar-card-price">$${dest.price}/night</span>
          <div class="similar-card-rating">
            ${generateStars(dest.rating)}
            <span>${dest.rating}</span>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function initializeDateInputs() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const checkinInput = document.getElementById("checkin-date");
  const checkoutInput = document.getElementById("checkout-date");

  // Set minimum dates
  checkinInput.min = today.toISOString().split("T")[0];
  checkoutInput.min = tomorrow.toISOString().split("T")[0];

  // Set default values
  checkinInput.value = today.toISOString().split("T")[0];
  checkoutInput.value = tomorrow.toISOString().split("T")[0];

  // Add event listeners for price calculation
  checkinInput.addEventListener("change", calculatePricing);
  checkoutInput.addEventListener("change", calculatePricing);
  document
    .getElementById("guest-count")
    .addEventListener("change", calculatePricing);
}

function calculatePricing() {
  const checkinDate = new Date(document.getElementById("checkin-date").value);
  const checkoutDate = new Date(document.getElementById("checkout-date").value);

  // Calculate nights
  const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
  const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (nights > 0) {
    const basePrice = destinationData.price;
    const subtotal = basePrice * nights;
    const serviceFee = Math.round(subtotal * 0.1); // 10% service fee
    const taxes = Math.round(subtotal * 0.08); // 8% taxes
    const total = subtotal + serviceFee + taxes;

    // Update price breakdown
    document.getElementById("nights-count").textContent = nights;
    document.getElementById("subtotal").textContent = `$${subtotal}`;
    document.getElementById("service-fee").textContent = `$${serviceFee}`;
    document.getElementById("taxes").textContent = `$${taxes}`;
    document.getElementById("total-price").textContent = `$${total}`;
  }
}

function proceedToBooking() {
  // Prepare booking data
  const bookingData = {
    destination: destinationData,
    checkin: document.getElementById("checkin-date").value,
    checkout: document.getElementById("checkout-date").value,
    guests: document.getElementById("guest-count").value,
    totalPrice: document.getElementById("total-price").textContent,
  };

  // Store in localStorage
  localStorage.setItem("bookingData", JSON.stringify(bookingData));

  // Navigate to booking page
  window.location.href = "booking.html";
}

function shareDestination() {
  if (navigator.share) {
    navigator.share({
      title: destinationData.title,
      text: destinationData.description,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    });
  }
}

function saveDestination() {
  // Get saved destinations from localStorage
  let savedDestinations =
    JSON.parse(localStorage.getItem("savedDestinations")) || [];

  // Check if already saved
  const isAlreadySaved = savedDestinations.some(
    (dest) => dest.id === destinationData.id,
  );

  if (!isAlreadySaved) {
    savedDestinations.push(destinationData);
    localStorage.setItem(
      "savedDestinations",
      JSON.stringify(savedDestinations),
    );
    alert("Destination saved to your favorites!");
  } else {
    alert("This destination is already in your favorites!");
  }
}

function navigateToDestination(destinationId) {
  window.location.href = `destination-detail.html?destination=${destinationId}`;
}

function showError(message) {
  const loadingState = document.getElementById("loading-state");
  loadingState.innerHTML = `
    <div style="text-align: center; color: #dc3545;">
      <i data-lucide="alert-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
      <h2>Oops! ${message}</h2>
      <p>The destination you're looking for couldn't be found.</p>
      <a href="explore.html" class="btn btn-primary" style="margin-top: 1rem;">Browse Destinations</a>
    </div>
  `;

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

