export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  badge?: string;
}

export interface CategorySection {
  id: string;
  tileTitle: string;
  tileImage: string;
  tileImage2?: string;
  tileImage3?: string;
  products: Product[];
  viewMoreLabel: string;
}

export const IMG = "/images";

/* ---------------------------------- NEW ARRIVAL GRID ---------------------------------- */
export interface CategoryCard {
  name: string;
  image: string;
}

export const newArrivalCards: CategoryCard[] = [
  { name: "Half-Sleeve T-shirt", image: `${IMG}/tee-navy.png` },
  { name: "Designer Short Sleeve", image: `${IMG}/tee-designer.png` },
  { name: "Sports T-shirt", image: `${IMG}/jersey-red.png` },
  { name: "Polo", image: `${IMG}/polo-navy.png` },
  { name: "Cut & Stitch Polo", image: `${IMG}/polo-maroon.png` },
  { name: "Half Sleeve Raglan", image: `${IMG}/raglan-grey.png` },
  { name: "Half Sleeve Blanks", image: `${IMG}/tee-black.png` },
  { name: "Designer Full Sleeve", image: `${IMG}/tee-designer.png` },
  { name: "Full Sleeve Raglan", image: `${IMG}/raglan-grey.png` },
  { name: "Full Sleeve Blanks", image: `${IMG}/tee-navy.png` },
  { name: "Football Jerseys", image: `${IMG}/jersey-white.png` },
  { name: "Hoodie", image: `${IMG}/hoodie-black.png` },
  { name: "Jacket", image: `${IMG}/jacket-olive.png` },
  { name: "Mens Shorts", image: `${IMG}/shorts-navy.png` },
  { name: "Mens Trousers", image: `${IMG}/trousers-beige.png` },
  { name: "Track Pants", image: `${IMG}/trousers-beige.png` },
  { name: "Mens Undergarments", image: `${IMG}/socks-black.png` },
  { name: "Womens T-shirt", image: `${IMG}/women-tee-rose.png` },
  { name: "Womens Trendy Pajamas", image: `${IMG}/kurti-teal.png` },
  { name: "Kids Polo", image: `${IMG}/kids-polo-blue.png` },
  { name: "Kids Half Sleeve T-shirt", image: `${IMG}/kids-tee-yellow.png` },
  { name: "Kids Full Sleeve T-shirt", image: `${IMG}/kids-tee-yellow.png` },
  { name: "Kids Trousers", image: `${IMG}/shorts-navy.png` },
  { name: "Kids Shorts", image: `${IMG}/shorts-navy.png` },
  { name: "Premium Cloth Masks", image: `${IMG}/mask-pack.png` },
  { name: "Designer Edition Masks", image: `${IMG}/mask-pack.png` },
  { name: "Kids Edition Masks", image: `${IMG}/mask-pack.png` },
  { name: "Premium Antibacterial Socks", image: `${IMG}/socks-colorful.png` },
];

/* ------------------------------ MEDIUM CATEGORY TILES ------------------------------ */
export const mediumTiles: { name: string; image: string }[] = [
  { name: "Printed Short Sleeve", image: `${IMG}/tee-designer.png` },
  { name: "Designer Edition", image: `${IMG}/polo-white.png` },
  { name: "Short Sleeve Blanks", image: `${IMG}/tee-black.png` },
  { name: "Drop Shoulder", image: `${IMG}/tee-navy.png` },
  { name: "Full Sleeve", image: `${IMG}/raglan-grey.png` },
  { name: "Women's T-shirt", image: `${IMG}/women-tee-mint.png` },
];

/* ------------------------------ BIG BANNER TILES ------------------------------ */
export const bigTiles: { name: string; image: string }[] = [
  { name: "Printed Short Sleeve", image: `${IMG}/tee-designer.png` },
  { name: "Designer Edition", image: `${IMG}/polo-maroon.png` },
  { name: "Short Sleeve Blanks", image: `${IMG}/tee-black.png` },
  { name: "Drop Shoulder", image: `${IMG}/tee-navy.png` },
  { name: "Full Sleeve", image: `${IMG}/raglan-grey.png` },
  { name: "Women's T-shirt", image: `${IMG}/kurti-pink.png` },
];

/* ------------------------------ CATEGORY SECTIONS ------------------------------ */
export const categorySections: CategorySection[] = [
  {
    id: "polo",
    tileTitle: "Designer Polo",
    tileImage: `${IMG}/polo-white.png`,
    tileImage2: `${IMG}/polo-navy.png`,
    tileImage3: `${IMG}/polo-maroon.png`,
    viewMoreLabel: "Premium Limited Edition Polo - Verdant",
    products: [
      { id: "p1", name: "Mens Premium Limited Edition Polo - Azure", price: 1260, oldPrice: 1600, image: `${IMG}/polo-navy.png` },
      { id: "p2", name: "Mens Premium Limited Edition Polo - Cascade", price: 1290, oldPrice: 1700, image: `${IMG}/polo-maroon.png` },
      { id: "p3", name: "Mens Premium Luxe Polo - Meridian", price: 1090, oldPrice: 1490, image: `${IMG}/polo-white.png` },
      { id: "p4", name: "Mens Premium Elegant Polo - Harbor", price: 1262, oldPrice: 1600, image: `${IMG}/polo-navy.png` },
      { id: "p5", name: "Mens Premium Limited Edition Polo - Trueblue", price: 1260, oldPrice: 1400, image: `${IMG}/polo-maroon.png` },
      { id: "p6", name: "Mens Premium Limited Edition Polo - Slate", price: 1260, oldPrice: 1400, image: `${IMG}/polo-white.png` },
      { id: "p7", name: "Mens Premium Limited Edition Polo - Sand", price: 1390, oldPrice: 1600, image: `${IMG}/polo-navy.png` },
    ],
  },
  {
    id: "kurti",
    tileTitle: "Kurti, Tunic & Tops",
    tileImage: `${IMG}/kurti-pink.png`,
    tileImage2: `${IMG}/kurti-teal.png`,
    viewMoreLabel: "Women Premium Co-ords - Liana",
    products: [
      { id: "k1", name: "Womens Premium Kurti - Petra", price: 900, oldPrice: 1800, image: `${IMG}/kurti-pink.png` },
      { id: "k2", name: "Womens Premium Kurti - Elarna", price: 900, oldPrice: 1800, image: `${IMG}/kurti-teal.png` },
      { id: "k3", name: "Teens Premium Co-Ords - Lush", price: 1300, oldPrice: 2600, image: `${IMG}/kurti-teal.png` },
      { id: "k4", name: "Women's Premium Co-Ords Set - Fiora", price: 1250, oldPrice: 2500, image: `${IMG}/kurti-pink.png` },
      { id: "k5", name: "Teens Premium Tops - Ziya", price: 800, oldPrice: 1600, image: `${IMG}/women-tee-rose.png` },
      { id: "k6", name: "Teens Premium Tops - Liora", price: 900, oldPrice: 1800, image: `${IMG}/women-tee-mint.png` },
      { id: "k7", name: "Women's Premium Kurti - Blossom Pink", price: 1200, oldPrice: 2400, image: `${IMG}/kurti-pink.png` },
    ],
  },
  {
    id: "panjabi",
    tileTitle: "Panjabi",
    tileImage: `${IMG}/panjabi-maroon.png`,
    tileImage2: `${IMG}/panjabi-cream.png`,
    viewMoreLabel: "Mens Premium Panjabi - Warda",
    products: [
      { id: "pn1", name: "Mens Premium Panjabi - Eshan", price: 3550, oldPrice: 4800, image: `${IMG}/panjabi-maroon.png` },
      { id: "pn2", name: "Mens Premium Panjabi - Daroon", price: 4590, oldPrice: 5500, image: `${IMG}/panjabi-cream.png` },
      { id: "pn3", name: "Mens Premium Kabli Set - Zarif", price: 4490, oldPrice: 5500, image: `${IMG}/panjabi-maroon.png` },
      { id: "pn4", name: "Mens Premium Panjabi - Yara", price: 2850, oldPrice: 3600, image: `${IMG}/panjabi-cream.png` },
      { id: "pn5", name: "Mens Premium Kabli Set - Irfan", price: 4490, oldPrice: 5500, image: `${IMG}/panjabi-maroon.png` },
      { id: "pn6", name: "Mens Premium Kabli Set - Nawaz", price: 4990, oldPrice: 6000, image: `${IMG}/panjabi-cream.png` },
      { id: "pn7", name: "Mens Premium Panjabi - Zayn", price: 4590, oldPrice: 5800, image: `${IMG}/panjabi-maroon.png` },
    ],
  },
  {
    id: "denim",
    tileTitle: "Denim Jeans",
    tileImage: `${IMG}/jeans-blue.png`,
    tileImage2: `${IMG}/jeans-dark.png`,
    viewMoreLabel: "Mens Denim Cargo Pant - Nightstone",
    products: [
      { id: "d1", name: "Mens Denim Jeans - Skyline", price: 1690, oldPrice: 2200, image: `${IMG}/jeans-blue.png` },
      { id: "d2", name: "Mens Denim Jeans - Pioneer [Light]", price: 1950, oldPrice: 2500, image: `${IMG}/jeans-dark.png` },
      { id: "d3", name: "Mens Premium Denim Shorts - Craftsman", price: 1490, oldPrice: 1800, image: `${IMG}/jeans-blue.png` },
      { id: "d4", name: "Mens Denim Jeans - Apex [Dark]", price: 2350, oldPrice: 2900, image: `${IMG}/jeans-dark.png` },
      { id: "d5", name: "Mens Denim Jeans - Skythread", price: 1960, oldPrice: 2500, image: `${IMG}/jeans-blue.png` },
      { id: "d6", name: "Mens Denim Jeans - Heritage Blue", price: 1960, oldPrice: 2500, image: `${IMG}/jeans-dark.png` },
      { id: "d7", name: "Mens Denim Jeans - Bluefade", price: 1960, oldPrice: 2500, image: `${IMG}/jeans-blue.png` },
    ],
  },
  {
    id: "shorts",
    tileTitle: "Activewear Shorts",
    tileImage: `${IMG}/shorts-navy.png`,
    viewMoreLabel: "Mens Premium Activewear Shorts - Victor",
    products: [
      { id: "s1", name: "Mens Premium Activewear Shorts - Charisma", price: 630, oldPrice: 890, image: `${IMG}/shorts-navy.png` },
      { id: "s2", name: "Mens Premium Activewear Shorts - Score", price: 630, oldPrice: 890, image: `${IMG}/shorts-navy.png` },
      { id: "s3", name: "Mens Premium Activewear Shorts - Prodigious", price: 630, oldPrice: 890, image: `${IMG}/shorts-navy.png` },
      { id: "s4", name: "Mens Premium Activewear Shorts - Legion", price: 630, oldPrice: 890, image: `${IMG}/shorts-navy.png` },
    ],
  },
  {
    id: "kids",
    tileTitle: "Little Ones Tees",
    tileImage: `${IMG}/kids-tee-yellow.png`,
    tileImage2: `${IMG}/kids-polo-blue.png`,
    tileImage3: `${IMG}/kids-frock.png`,
    viewMoreLabel: "Kids Premium Polo T-Shirt - Playground",
    products: [
      { id: "kd1", name: "Kid's Premium T-shirt - Whisker", price: 470, oldPrice: 620, image: `${IMG}/kids-tee-yellow.png` },
      { id: "kd2", name: "Kids Premium T-Shirt - Dinoride", price: 470, oldPrice: 620, image: `${IMG}/kids-tee-yellow.png` },
      { id: "kd3", name: "Kids Premium T-Shirt - Witty", price: 470, oldPrice: 620, image: `${IMG}/kids-polo-blue.png` },
      { id: "kd4", name: "Kids Premium Polo T-Shirt - Duckling", price: 690, oldPrice: 1200, image: `${IMG}/kids-polo-blue.png` },
      { id: "kd5", name: "Kids Premium T-Shirt - Croco", price: 470, oldPrice: 620, image: `${IMG}/kids-tee-yellow.png` },
      { id: "kd6", name: "Kids Premium Polo T-Shirt - Wild Friends", price: 690, oldPrice: 1200, image: `${IMG}/kids-polo-blue.png` },
      { id: "kd7", name: "Kids Premium Frock - Meadow", price: 890, oldPrice: 1400, image: `${IMG}/kids-frock.png` },
    ],
  },
  {
    id: "women",
    tileTitle: "Womens Designer T-shirts",
    tileImage: `${IMG}/women-tee-rose.png`,
    tileImage2: `${IMG}/women-tee-mint.png`,
    viewMoreLabel: "Women Premium Tee - Sunset",
    products: [
      { id: "w1", name: "Women Premium Tee - Garden", price: 475, oldPrice: 950, image: `${IMG}/women-tee-rose.png` },
      { id: "w2", name: "Women Premium Tee - Mauvette", price: 490, oldPrice: 980, image: `${IMG}/women-tee-mint.png` },
      { id: "w3", name: "Women Premium Tee - Kitty", price: 440, oldPrice: 880, image: `${IMG}/women-tee-rose.png` },
      { id: "w4", name: "Women Premium Tee - Neith", price: 440, oldPrice: 880, image: `${IMG}/women-tee-mint.png` },
      { id: "w5", name: "Women Premium Tee - Sarin", price: 440, oldPrice: 880, image: `${IMG}/women-tee-rose.png` },
      { id: "w6", name: "Women Premium Tee - Sun Shine", price: 440, oldPrice: 880, image: `${IMG}/women-tee-mint.png` },
      { id: "w7", name: "Women Premium Tee - Mirrage", price: 380, oldPrice: 760, image: `${IMG}/women-tee-rose.png` },
    ],
  },
  {
    id: "jersey",
    tileTitle: "Sports T-shirt",
    tileImage: `${IMG}/jersey-red.png`,
    tileImage2: `${IMG}/jersey-white.png`,
    viewMoreLabel: "National Team Home Jersey - Fan Edition",
    products: [
      { id: "j1", name: "United FC 26/27 Home Jersey - Player Edition", price: 1290, oldPrice: 1600, image: `${IMG}/jersey-red.png` },
      { id: "j2", name: "City FC 26/27 Third Jersey - Player Edition", price: 1290, oldPrice: 1600, image: `${IMG}/jersey-white.png` },
      { id: "j3", name: "Rovers FC 26/27 Home Jersey - Player Edition", price: 1290, oldPrice: 1600, image: `${IMG}/jersey-red.png` },
      { id: "j4", name: "Athletic Club 26/27 Home Jersey - Player Edition", price: 1290, oldPrice: 1600, image: `${IMG}/jersey-white.png` },
      { id: "j5", name: "Bavaria 26/27 Home Jersey - Player Edition", price: 1290, oldPrice: 1600, image: `${IMG}/jersey-red.png` },
      { id: "j6", name: "Merseyside 26/27 Home Jersey - Player Edition", price: 1290, oldPrice: 1600, image: `${IMG}/jersey-white.png` },
      { id: "j7", name: "Red Devils 26/27 Away Jersey - Player Edition", price: 1290, oldPrice: 1600, image: `${IMG}/jersey-red.png` },
    ],
  },
  {
    id: "mask",
    tileTitle: "Certified Face Masks",
    tileImage: `${IMG}/mask-pack.png`,
    viewMoreLabel: "Premium Cotton Face Mask (Purple)",
    products: [
      { id: "m1", name: "Pack of 4 Premium 7 Layer Cotton Mask - (Red, Pink, Rose, White)", price: 695, oldPrice: 1400, image: `${IMG}/mask-pack.png` },
      { id: "m2", name: "Pack of 2 Premium 7 Layer Cotton Mask - (White, Rose Pink)", price: 380, oldPrice: 700, image: `${IMG}/mask-pack.png` },
      { id: "m3", name: "Pack of 2 Premium 7 Layer Cotton Mask - (Red, Pink)", price: 380, oldPrice: 700, image: `${IMG}/mask-pack.png` },
      { id: "m4", name: "Premium Cotton Face Mask (Light Pink)", price: 195, oldPrice: 350, image: `${IMG}/mask-pack.png` },
    ],
  },
];

/* ------------------------------ SOCKS SECTION ------------------------------ */
export const socksProducts: Product[] = [
  { id: "sk1", name: "Premium Antibacterial Socks - Marathon (Black)", price: 220, oldPrice: 290, image: `${IMG}/socks-black.png` },
  { id: "sk2", name: "Premium Antibacterial Socks - Blaze", price: 160, oldPrice: 290, image: `${IMG}/socks-colorful.png` },
  { id: "sk3", name: "Premium Antibacterial Socks - Zenith", price: 160, oldPrice: 290, image: `${IMG}/socks-colorful.png` },
  { id: "sk4", name: "Premium Antibacterial Socks - Evoke", price: 220, oldPrice: 290, image: `${IMG}/socks-black.png` },
  { id: "sk5", name: "Premium Antibacterial Socks - Falcon (Black)", price: 220, oldPrice: 290, image: `${IMG}/socks-black.png` },
  { id: "sk6", name: "Premium Antibacterial Socks - Serene", price: 190, oldPrice: 250, image: `${IMG}/socks-colorful.png` },
  { id: "sk7", name: "Premium Antibacterial Socks - Thurst", price: 220, oldPrice: 290, image: `${IMG}/socks-black.png` },
];

/* ------------------------------ SMALL CATEGORY TILES ------------------------------ */
export const smallTiles: { name: string; image: string }[] = [
  { name: "Designer Polo", image: `${IMG}/polo-white.png` },
  { name: "Classic Polo", image: `${IMG}/polo-navy.png` },
  { name: "Kids Polo", image: `${IMG}/kids-polo-blue.png` },
  { name: "Panjabi", image: `${IMG}/panjabi-cream.png` },
  { name: "Pajamas", image: `${IMG}/trousers-beige.png` },
  { name: "Sports Trousers", image: `${IMG}/shorts-navy.png` },
  { name: "Comfy Trousers", image: `${IMG}/trousers-beige.png` },
  { name: "Chino Shorts", image: `${IMG}/shorts-navy.png` },
  { name: "Cargo Pants", image: `${IMG}/trousers-beige.png` },
  { name: "Chino Pants", image: `${IMG}/trousers-beige.png` },
  { name: "Denim Jeans", image: `${IMG}/jeans-blue.png` },
  { name: "Cap", image: `${IMG}/cap-navy.png` },
  { name: "Belt", image: `${IMG}/belt-brown.png` },
  { name: "Wallet", image: `${IMG}/wallet-brown.png` },
  { name: "Little Ones Tees", image: `${IMG}/kids-tee-yellow.png` },
  { name: "Frock", image: `${IMG}/kids-frock.png` },
  { name: "T-shirts and Shorts", image: `${IMG}/kids-tee-yellow.png` },
  { name: "Pants", image: `${IMG}/trousers-beige.png` },
];

/* ------------------------------ PARTNERS ------------------------------ */
export const partners = [
  "TechNova",
  "GreenLeaf",
  "Skyline Air",
  "UrbanBites",
  "MediCare+",
  "EduPro",
  "FinServe",
  "StyleHub",
  "CloudNine",
  "Vertex Labs",
];

export const formatBDT = (n: number) =>
  `৳ ${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
