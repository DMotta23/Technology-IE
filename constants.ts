import type { Farm, Product } from './types';

export const MOCK_FARMS: Farm[] = [
  {
    id: 1,
    name: "Golden Valley Acres",
    location: "California, USA",
    story: "Family-owned sustainable farm providing the freshest seasonal produce since 1985. We believe in regenerative agriculture and treating the land with respect.",
    certifications: ["Organic", "Non-GMO"],
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop",
    coverImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Toscana Fields",
    location: "Tuscany, Italy",
    story: "Bringing the authentic taste of Italy to your table. Our heritage grains and heirloom vegetables are grown using methods passed down through generations.",
    certifications: ["DOP", "Organic"],
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000&auto=format&fit=crop", 
    coverImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Serra do Mar Coffee",
    location: "Minas Gerais, Brazil",
    story: "High-altitude coffee beans grown with passion. We prioritize fair trade practices and support our local community of harvesters.",
    certifications: ["Fair Trade", "Rainforest Alliance"],
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
    coverImageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=2070&auto=format&fit=crop"
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    name: "Heirloom Tomatoes",
    description: "Juicy, colorful, and bursting with flavor. These tomatoes are vine-ripened and perfect for salads.",
    price: 4.99,
    unit: "lb",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000",
    stock: 50
  },
  {
    id: 106,
    name: "Sweet Potatoes",
    description: "Rich, orange-fleshed sweet potatoes. A comforting staple for any meal.",
    price: 1.49,
    unit: "lb",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000",
    stock: 75
  },
  {
    id: 103,
    name: "Organic Strawberries",
    description: "Sweet, sun-ripened strawberries picked at the peak of freshness.",
    price: 6.99,
    unit: "lb",
    farmId: 1,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=1000",
    stock: 40
  },
  {
    id: 202,
    name: "Artisanal Sourdough",
    description: "Crusty on the outside, soft and tangy on the inside. Naturally leavened.",
    price: 8.00,
    unit: "loaf",
    farmId: 2,
    category: "Bakery",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1000",
    stock: 15
  },
  {
    id: 209,
    name: "Butter Croissants",
    description: "Flaky, buttery pastries baked fresh every morning.",
    price: 3.00,
    unit: "each",
    farmId: 2,
    category: "Bakery",
    imageUrl: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=1000",
    stock: 50
  },
  {
    id: 203,
    name: "Pasture-Raised Eggs",
    description: "Golden yolks from happy hens that roam free on the pasture.",
    price: 7.50,
    unit: "dozen",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=1000",
    stock: 60
  },
  {
    id: 301,
    name: "Wildflower Honey",
    description: "Pure, raw honey gathered from diverse wildflowers. Unfiltered.",
    price: 15.00,
    unit: "jar",
    farmId: 3,
    category: "Artisanal",
    imageUrl: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=1000",
    stock: 25
  },
  {
    id: 102,
    name: "Rainbow Carrots",
    description: "Crunchy and sweet carrots in a variety of vibrant colors. High in beta-carotene.",
    price: 3.49,
    unit: "bunch",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1000&auto=format&fit=crop",
    stock: 30
  },
  {
    id: 104,
    name: "Organic Spinach",
    description: "Tender, dark green leaves packed with iron and vitamins. Perfect for salads.",
    price: 3.99,
    unit: "bag",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000&auto=format&fit=crop",
    stock: 40
  },
  {
    id: 302,
    name: "Gala Apples",
    description: "Crisp and sweet with a mild flavor. Great for snacking or baking.",
    price: 2.99,
    unit: "lb",
    farmId: 3,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1000&auto=format&fit=crop",
    stock: 100
  },
  {
    id: 108,
    name: "Fresh Blueberries",
    description: "Plump and juicy blueberries, full of antioxidants.",
    price: 5.99,
    unit: "pint",
    farmId: 1,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1000&auto=format&fit=crop",
    stock: 55
  },
  {
    id: 201,
    name: "Artisanal Cheddar",
    description: "Aged for 18 months, this sharp cheddar is rich, nutty, and sharp.",
    price: 12.50,
    unit: "block",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1000&auto=format&fit=crop",
    stock: 20
  },
  {
    id: 211,
    name: "Extra Virgin Olive Oil",
    description: "Cold-pressed from hand-picked Tuscan olives.",
    price: 24.99,
    unit: "bottle",
    farmId: 2,
    category: "Artisanal",
    imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1000&auto=format&fit=crop",
    stock: 40
  }
];