import tilesImg from "@/assets/tiles.jpg";
import sanitarywareImg from "@/assets/sanitaryware.jpg";
import kitchenSinkImg from "@/assets/kitchen-sink.jpg";
import vanityImg from "@/assets/vanity.jpg";
import parkingImg from "@/assets/parking-tiles.jpg";
import marbleImg from "@/assets/marble-granite.jpg";
import { SUB_IMAGES, UPLOADED_IMAGES } from "@/data/sub-images";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  slug: string;
  name: string;
  topics: string[];
};

export type Product = {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryName: string;
  subcategory: string;
  subcategoryName: string;
  image: string;
  imageFile: string;
  brand: string;
  material: string;
  size: string;
  finish: string;
  color: string;
  unit: string;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  popularity: number;
  newness: number;
  specs: { label: string; value: string }[];
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const categories: Category[] = [
  {
    slug: "tiles",
    name: "Tiles",
    tagline: "Floor, wall, bathroom, kitchen, outdoor & elevation tiles",
    image: tilesImg,
    subcategories: [
      {
        slug: "floor-tiles",
        name: "Floor Tiles",
        topics: [
          "Vitrified Floor Tiles",
          "Porcelain Floor Tiles",
          "2x2 Floor Tiles",
          "4x2 Floor Tiles",
          "Marble Look Floor Tiles",
          "Wooden Floor Tiles",
          "Anti-Skid Floor Tiles",
        ],
      },
      {
        slug: "wall-tiles",
        name: "Wall Tiles",
        topics: [
          "Living Room Wall Tiles",
          "Bedroom Wall Tiles",
          "Kitchen Wall Tiles",
          "Bathroom Wall Tiles",
          "Decorative Wall Tiles",
          "3D Wall Tiles",
        ],
      },
      {
        slug: "bathroom-tiles",
        name: "Bathroom Tiles",
        topics: [
          "Bathroom Floor Tiles",
          "Bathroom Wall Tiles",
          "Anti-Skid Bathroom Tiles",
          "Designer Bathroom Tiles",
          "Small Bathroom Tiles",
          "Marble Look Bathroom Tiles",
        ],
      },
      {
        slug: "kitchen-tiles",
        name: "Kitchen Tiles",
        topics: [
          "Kitchen Wall Tiles",
          "Kitchen Backsplash Tiles",
          "Kitchen Floor Tiles",
          "Designer Kitchen Tiles",
          "Easy-Clean Kitchen Tiles",
        ],
      },
      {
        slug: "outdoor-tiles",
        name: "Outdoor Tiles",
        topics: [
          "Outdoor Floor Tiles",
          "Parking Tiles",
          "Anti-Skid Outdoor Tiles",
          "Terrace Tiles",
          "Balcony Tiles",
          "Garden Tiles",
        ],
      },
      {
        slug: "elevation-tiles",
        name: "Elevation Tiles",
        topics: [
          "Exterior Wall Tiles",
          "Building Elevation Tiles",
          "Exterior Elevation Tiles",
          "Stone Look Elevation Tiles",
          "Modern Elevation Tiles",
        ],
      },
    ],
  },
  {
    slug: "sanitaryware",
    name: "Sanitaryware",
    tagline: "WC, wash basins, counter basins & bathroom accessories",
    image: sanitarywareImg,
    subcategories: [
      {
        slug: "bathroom-sanitaryware",
        name: "Bathroom Sanitaryware",
        topics: [
          "Bathroom Sanitaryware Set",
          "Wall Hung WC",
          "One Piece WC",
          "Wash Basin",
          "Counter Basin",
          "Bathroom Accessories",
        ],
      },
      {
        slug: "wall-hung-wc",
        name: "Wall Hung WC",
        topics: [
          "Wall Hung Western Toilet",
          "Rimless Wall Hung WC",
          "Concealed Cistern WC",
          "Modern Wall Hung WC",
        ],
      },
      {
        slug: "one-piece-wc",
        name: "One Piece WC",
        topics: [
          "One Piece Western Toilet",
          "Rimless One Piece WC",
          "Dual Flush One Piece WC",
          "Designer One Piece WC",
        ],
      },
      {
        slug: "wash-basin",
        name: "Wash Basin",
        topics: [
          "Table Top Wash Basin",
          "Wall Mounted Wash Basin",
          "Pedestal Wash Basin",
          "Corner Wash Basin",
          "Designer Wash Basin",
        ],
      },
      {
        slug: "counter-basin",
        name: "Counter Basin",
        topics: [
          "Counter Top Basin",
          "Above Counter Basin",
          "Round Counter Basin",
          "Square Counter Basin",
          "Designer Counter Basin",
        ],
      },
      {
        slug: "bathroom-accessories",
        name: "Bathroom Accessories",
        topics: [
          "Towel Rod",
          "Towel Ring",
          "Soap Dish",
          "Soap Dispenser",
          "Toilet Paper Holder",
          "Bathroom Shelf",
          "Robe Hook",
          "Bathroom Mirror",
        ],
      },
    ],
  },
  {
    slug: "kitchen-sink",
    name: "Kitchen Sink",
    tagline: "Stainless steel, quartz, handmade & workstation sinks",
    image: kitchenSinkImg,
    subcategories: [
      {
        slug: "kitchen-sink",
        name: "Kitchen Sink",
        topics: [
          "Handmade Kitchen Sink",
          "Quartz Kitchen Sink",
          "Granite Kitchen Sink",
          "Undermount Kitchen Sink",
          "Top Mount Kitchen Sink",
          "Workstation Kitchen Sink",
        ],
      },
      {
        slug: "stainless-steel-sink",
        name: "Stainless Steel Sink",
        topics: [
          "SS 304 Kitchen Sink",
          "SS 202 Kitchen Sink",
          "Handmade Stainless Steel Sink",
          "Premium Stainless Steel Sink",
        ],
      },
      {
        slug: "single-bowl-sink",
        name: "Single Bowl Sink",
        topics: [
          "Single Bowl Kitchen Sink",
          "Single Bowl Handmade Sink",
          "Single Bowl Undermount Sink",
        ],
      },
      {
        slug: "double-bowl-sink",
        name: "Double Bowl Sink",
        topics: [
          "Double Bowl Kitchen Sink",
          "Double Bowl Handmade Sink",
          "Double Bowl with Drainboard",
        ],
      },
      {
        slug: "designer-kitchen-sink",
        name: "Designer Kitchen Sink",
        topics: [
          "Designer Stainless Steel Sink",
          "Workstation Sink",
          "Modern Kitchen Sink",
          "Premium Kitchen Sink",
        ],
      },
    ],
  },
  {
    slug: "bathroom-vanity",
    name: "Bathroom Vanity",
    tagline: "Wall mounted, floating & storage vanity units",
    image: vanityImg,
    subcategories: [
      {
        slug: "vanity",
        name: "Vanity",
        topics: [
          "Floor Standing Vanity",
          "Floating Vanity",
          "Vanity Cabinet",
          "Mirror Vanity Unit",
          "Storage Vanity",
        ],
      },
      {
        slug: "bathroom-vanity-unit",
        name: "Bathroom Vanity Unit",
        topics: [
          "Single Door Vanity",
          "Double Door Vanity",
          "Storage Vanity Unit",
          "Modern Vanity Unit",
        ],
      },
      {
        slug: "wall-mounted-vanity",
        name: "Wall Mounted Vanity",
        topics: [
          "Floating Bathroom Vanity",
          "Wall Mounted Vanity Cabinet",
          "Compact Wall Vanity",
        ],
      },
      {
        slug: "designer-bathroom-vanity",
        name: "Designer Bathroom Vanity",
        topics: [
          "Modern Designer Vanity",
          "Luxury Bathroom Vanity",
          "Premium Vanity Unit",
        ],
      },
      {
        slug: "wash-basin-vanity",
        name: "Wash Basin Vanity",
        topics: [
          "Wash Basin Cabinet",
          "Basin Vanity Unit",
          "Basin with Storage",
          "Basin and Vanity Combo",
        ],
      },
    ],
  },
  {
    slug: "parking-tiles",
    name: "Parking Tiles",
    tagline: "Heavy duty, anti-skid & outdoor parking floor tiles",
    image: parkingImg,
    subcategories: [
      {
        slug: "parking-floor-tiles",
        name: "Parking Floor Tiles",
        topics: [
          "Parking Floor Tiles",
          "Driveway Tiles",
          "Garage Floor Tiles",
          "Terrace Parking Tiles",
          "Commercial Parking Tiles",
        ],
      },
      {
        slug: "heavy-duty-parking-tiles",
        name: "Heavy Duty Parking Tiles",
        topics: [
          "Heavy Duty Vitrified Parking Tiles",
          "High Load Parking Tiles",
          "Commercial Heavy Duty Parking Tiles",
        ],
      },
      {
        slug: "outdoor-parking-tiles",
        name: "Outdoor Parking Tiles",
        topics: [
          "Outdoor Floor Parking Tiles",
          "Driveway Parking Tiles",
          "Terrace Outdoor Parking Tiles",
        ],
      },
      {
        slug: "anti-skid-parking-tiles",
        name: "Anti-Skid Parking Tiles",
        topics: [
          "Anti-Skid Parking Tiles",
          "Rough Finish Parking Tiles",
          "Safety Parking Tiles",
        ],
      },
      {
        slug: "car-parking-tiles",
        name: "Car Parking Tiles",
        topics: [
          "Residential Car Parking Tiles",
          "Garage Parking Tiles",
          "Car Driveway Tiles",
        ],
      },
    ],
  },
  {
    slug: "marble-and-granite",
    name: "Marble & Granite",
    tagline: "Italian marble, granite slabs, countertops & staircase stone",
    image: marbleImg,
    subcategories: [
      {
        slug: "marble",
        name: "Marble",
        topics: [
          "White Marble",
          "Italian Marble",
          "Floor Marble",
          "Wall Marble",
          "Indian Marble",
          "Beige Marble",
          "Black Marble",
          "Designer Marble",
          "Marble Slabs",
          "Marble Tiles",
        ],
      },
      {
        slug: "granite",
        name: "Granite",
        topics: [
          "Black Granite",
          "White Granite",
          "Kitchen Granite",
          "Staircase Granite",
          "Countertop Granite",
          "Grey Granite",
          "Brown Granite",
          "Red Granite",
          "Granite Slabs",
          "Granite Tiles",
          "Outdoor Granite",
        ],
      },
      {
        slug: "green-marble",
        name: "Green Marble",
        topics: [
          "Rajnagar Green Marble",
          "Forest Green Marble",
          "Green Marble Slabs",
          "Green Marble Tiles",
        ],
      },
      {
        slug: "grey-marble",
        name: "Grey Marble",
        topics: [
          "Grey Veined Marble",
          "Charcoal Grey Marble",
          "Grey Marble Slabs",
          "Grey Marble Tiles",
        ],
      },
    ],
  },
  {
    slug: "marble-statues",
    name: "Marble Statues",
    tagline: "Hand-carved deity murtis in premium white and coloured marble",
    image: UPLOADED_IMAGES.sitaRama,
    subcategories: [
      {
        slug: "radha-krishna-statue",
        name: "Radha Krishna Statue",
        topics: [
          "Radha Krishna Marble Statue",
          "Painted Radha Krishna Murti",
          "Standing Radha Krishna Statue",
          "Temple Radha Krishna Statue",
        ],
      },
      {
        slug: "sita-rama-statue",
        name: "Sita Rama Statue",
        topics: ["Sita Rama Marble Statue", "Ram Darbar Marble Murti", "Temple Sita Rama Statue"],
      },
      {
        slug: "goddess-lakshmi-statue",
        name: "Goddess Lakshmi Statue",
        topics: ["Lakshmi Marble Statue", "Lotus Lakshmi Murti", "Gold Painted Lakshmi Statue"],
      },
      {
        slug: "maa-kali-statue",
        name: "Maa Kali Statue",
        topics: ["Maa Kali Marble Statue", "Black Marble Kali Murti", "Temple Kali Statue"],
      },
      {
        slug: "sai-baba-statue",
        name: "Sai Baba Statue",
        topics: ["Sai Baba Marble Statue", "Sitting Sai Baba Murti", "Painted Sai Baba Statue"],
      },
    ],
  },
  {
    slug: "marble-home-interiors",
    name: "Marble Home Interiors",
    tagline: "Marble mandirs, carved fireplaces & bespoke interior stonework",
    image: UPLOADED_IMAGES.marbleMandir,
    subcategories: [
      {
        slug: "marble-mandir",
        name: "Marble Mandir",
        topics: [
          "Carved Marble Mandir",
          "Dome Marble Temple",
          "Home Marble Mandir",
          "Designer Marble Temple",
        ],
      },
      {
        slug: "marble-fireplace",
        name: "Marble Fireplace",
        topics: [
          "Carved Marble Fireplace",
          "Classic Marble Mantel",
          "Designer Marble Fireplace",
        ],
      },
    ],
  },
];

/* ---------------- filter option constants ---------------- */

export const BRANDS = [
  "Kajaria",
  "Somany",
  "Nitco",
  "Johnson",
  "Simpolo",
  "Cera",
  "Hindware",
  "Jaquar",
];

export const COLORS = [
  "White",
  "Black",
  "Grey",
  "Beige",
  "Brown",
  "Cream",
  "Blue",
  "Green",
  "Red",
  "Multicolor",
];

export const MATERIALS = [
  "Ceramic",
  "Vitrified",
  "Porcelain",
  "Marble",
  "Granite",
  "Stainless Steel",
  "Quartz",
  "HDHMR",
  "PVC",
  "Other",
];

export const FINISHES = [
  "Matte",
  "Glossy",
  "Polished",
  "Rustic",
  "Wooden",
  "Stone Finish",
  "Sugar",
  "High Gloss",
];

export const SIZES = ["1x1", "2x2", "2x4", "4x2", "Custom Size"];

export const PRICE_RANGES = [
  { id: "0-500", label: "Under ₹500", min: 0, max: 500 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "1000-2500", label: "₹1,000 – ₹2,500", min: 1000, max: 2500 },
  { id: "2500-5000", label: "₹2,500 – ₹5,000", min: 2500, max: 5000 },
  { id: "5000-10000", label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { id: "10000-1000000", label: "₹10,000+", min: 10000, max: 1000000 },
];

export const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "discount", label: "Highest Discount" },
  { id: "rating", label: "Highest Rated" },
];

/* ---------------- deterministic product generation ---------------- */

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}
const pick = <T,>(arr: T[], seed: number, offset = 0): T =>
  arr[(seed + offset * 7919) % arr.length] as T;

const materialFor = (cat: string, topic: string) => {
  const t = topic.toLowerCase();
  if (cat === "marble-and-granite") return t.includes("granite") ? "Granite" : "Marble";
  if (cat === "kitchen-sink") {
    if (t.includes("quartz")) return "Quartz";
    if (t.includes("granite")) return "Granite";
    return "Stainless Steel";
  }
  if (cat === "bathroom-vanity") return t.includes("pvc") ? "PVC" : "HDHMR";
  if (cat === "sanitaryware") return "Ceramic";
  if (t.includes("porcelain")) return "Porcelain";
  if (t.includes("ceramic") || t.includes("wall")) return "Ceramic";
  return "Vitrified";
};

const unitFor = (cat: string) => {
  if (cat === "marble-and-granite") return "Per Sq.Ft.";
  if (cat === "tiles" || cat === "parking-tiles") return "Per Box";
  return "Per Piece";
};

const basePriceFor = (cat: string, seed: number) => {
  switch (cat) {
    case "tiles":
      return 420 + (seed % 1800);
    case "parking-tiles":
      return 480 + (seed % 1400);
    case "sanitaryware":
      return 900 + (seed % 9000);
    case "kitchen-sink":
      return 2400 + (seed % 12000);
    case "bathroom-vanity":
      return 4500 + (seed % 18000);
    default:
      return 85 + (seed % 900);
  }
};

function buildSpecs(
  cat: string,
  p: {
    brand: string;
    material: string;
    size: string;
    finish: string;
    color: string;
    topic: string;
    seed: number;
  },
): { label: string; value: string }[] {
  const { brand, material, size, finish, color, topic, seed } = p;
  const common = [
    { label: "Brand", value: brand },
    { label: "Material", value: material },
    { label: "Finish", value: finish },
    { label: "Color", value: color },
  ];
  if (cat === "tiles" || cat === "parking-tiles") {
    return [
      ...common,
      { label: "Size", value: `${size} ft` },
      { label: "Thickness", value: `${8 + (seed % 4)} mm` },
      { label: "Design", value: topic.replace(/ Tiles$/, "") },
      { label: "Coverage per Box", value: `${10 + (seed % 12)}.5 Sq.Ft./Box` },
      { label: "Pieces per Box", value: `${2 + (seed % 6)} Pieces/Box` },
      ...(cat === "parking-tiles"
        ? [
            { label: "Surface Type", value: seed % 2 ? "Rough" : "Textured" },
            { label: "Load Capacity", value: "Heavy Duty" },
            { label: "Anti-Skid", value: "Yes" },
            { label: "Outdoor Suitable", value: "Yes" },
          ]
        : [
            {
              label: "Suitable For",
              value: pick(
                ["Living Room, Bedroom", "Kitchen, Bathroom", "Balcony, Terrace", "Hallway, Office"],
                seed,
                3,
              ),
            },
            { label: "Installation", value: topic.toLowerCase().includes("wall") ? "Wall" : "Floor" },
          ]),
    ];
  }
  if (cat === "sanitaryware") {
    return [
      ...common,
      { label: "Type", value: topic },
      { label: "Dimensions", value: `${480 + (seed % 120)} x ${340 + (seed % 80)} x ${330 + (seed % 90)} mm` },
      { label: "Installation Type", value: pick(["Wall Mounted", "Floor Mounted", "Counter Top"], seed, 2) },
      { label: "Flush Type", value: pick(["Dual Flush", "Single Flush", "Rimless Flush"], seed, 4) },
      { label: "Water Consumption", value: `${3 + (seed % 3)}/6 Litre` },
      { label: "Warranty", value: `${2 + (seed % 8)} Years` },
    ];
  }
  if (cat === "kitchen-sink") {
    const bowls = topic.toLowerCase().includes("double") ? "2" : "1";
    return [
      ...common,
      { label: "Grade", value: material === "Stainless Steel" ? "SS 304" : "Premium" },
      { label: "Sink Type", value: topic },
      { label: "Number of Bowls", value: bowls },
      { label: "Size", value: `${18 + (seed % 20)} x ${16 + (seed % 8)} inch` },
      { label: "Depth", value: `${8 + (seed % 4)} inch` },
      { label: "Thickness", value: `${1 + (seed % 3)}.2 mm` },
      { label: "Installation Type", value: pick(["Undermount", "Top Mount", "Workstation"], seed, 5) },
      { label: "Drain Position", value: seed % 2 ? "Center" : "Rear" },
      { label: "Accessories Included", value: "Waste Coupling, Drain Pipe" },
      { label: "Warranty", value: `${5 + (seed % 10)} Years` },
    ];
  }
  if (cat === "bathroom-vanity") {
    return [
      ...common,
      { label: "Width", value: `${600 + (seed % 600)} mm` },
      { label: "Height", value: `${450 + (seed % 300)} mm` },
      { label: "Depth", value: `${400 + (seed % 150)} mm` },
      { label: "Storage Type", value: pick(["Drawer", "Cabinet", "Drawer + Cabinet"], seed, 6) },
      { label: "Number of Drawers", value: String(seed % 4) },
      { label: "Number of Cabinets", value: String(1 + (seed % 3)) },
      { label: "Wash Basin Included", value: seed % 2 ? "Yes" : "No" },
      { label: "Mirror Included", value: seed % 3 ? "Yes" : "No" },
      { label: "Installation Type", value: topic.toLowerCase().includes("floor") ? "Floor Standing" : "Wall Mounted" },
      { label: "Warranty", value: `${1 + (seed % 5)} Years` },
    ];
  }
  return [
    { label: material === "Granite" ? "Granite Type" : "Marble Type", value: topic },
    { label: "Origin", value: pick(["Italy", "Rajasthan, India", "Andhra Pradesh, India", "Turkey"], seed, 1) },
    { label: "Color", value: color },
    { label: "Pattern", value: pick(["Veined", "Speckled", "Plain", "Bookmatch"], seed, 2) },
    { label: "Finish", value: finish },
    { label: "Thickness", value: `${16 + (seed % 4)} mm` },
    { label: "Slab Size", value: `${7 + (seed % 3)} x ${4 + (seed % 2)} ft` },
    { label: "Application", value: pick(["Flooring", "Wall Cladding", "Countertop", "Staircase"], seed, 3) },
  ];
}

function makeProduct(cat: Category, sub: Subcategory, topic: string, index: number): Product {
  const seed = hash(`${cat.slug}-${sub.slug}-${topic}`);
  const material = materialFor(cat.slug, topic);
  const brand = pick(BRANDS, seed, 1);
  const color = pick(COLORS, seed, 2);
  const finish = pick(FINISHES, seed, 3);
  const size = pick(SIZES, seed, 4);
  const price = basePriceFor(cat.slug, seed);
  const discount = 5 + (seed % 40);
  const mrp = Math.round(price / (1 - discount / 100));
  const imageFile = `${slugify(topic)}.jpg`;

  return {
    slug: `${slugify(topic)}-${sub.slug}-${index}`,
    name: topic,
    description: `Premium quality ${topic.toLowerCase()} from ${brand}, crafted in ${material.toLowerCase()} with a ${finish.toLowerCase()} finish for modern residential and commercial spaces.`,
    category: cat.slug,
    categoryName: cat.name,
    subcategory: sub.slug,
    subcategoryName: sub.name,
    image: SUB_IMAGES[sub.slug] ?? cat.image,
    imageFile,
    brand,
    material,
    size,
    finish,
    color,
    unit: unitFor(cat.slug),
    price,
    mrp,
    discount,
    rating: Math.round((3 + (seed % 21) / 10) * 10) / 10,
    reviews: 12 + (seed % 480),
    inStock: seed % 11 !== 0,
    popularity: seed % 1000,
    newness: (seed * 31) % 1000,
    specs: buildSpecs(cat.slug, { brand, material, size, finish, color, topic, seed }),
  };
}

export const products: Product[] = categories.flatMap((cat) =>
  cat.subcategories.flatMap((sub) =>
    sub.topics.map((topic, i) => makeProduct(cat, sub, topic, i + 1)),
  ),
);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
