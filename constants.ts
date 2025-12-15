
import type { Farm, Product } from './types';

export const MOCK_FARMS: Farm[] = [
  {
    id: 1,
    name: "Golden Valley Acres",
    location: "California, USA",
    story: "Family-owned sustainable farm providing the freshest seasonal produce since 1985. We believe in regenerative agriculture and treating the land with respect.",
    certifications: ["Organic", "Non-GMO"],
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1470&auto=format&fit=crop",
    coverImageUrl: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Toscana Fields",
    location: "Tuscany, Italy",
    story: "Bringing the authentic taste of Italy to your table. Our heritage grains and heirloom vegetables are grown using methods passed down through generations.",
    certifications: ["DOP", "Organic"],
    imageUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=1470&auto=format&fit=crop",
    coverImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Serra do Mar Coffee",
    location: "Minas Gerais, Brazil",
    story: "High-altitude coffee beans grown with passion. We prioritize fair trade practices and support our local community of harvesters.",
    certifications: ["Fair Trade", "Rainforest Alliance"],
    imageUrl: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=1470&auto=format&fit=crop",
    coverImageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1922&auto=format&fit=crop"
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // --- Vegetables ---
  {
    id: 101,
    name: "Heirloom Tomatoes",
    description: "Juicy, colorful, and bursting with flavor. These tomatoes are vine-ripened and perfect for salads, sandwiches, or just eating with a little sea salt.",
    price: 4.99,
    unit: "lb",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
    stock: 50
  },
  {
    id: 102,
    name: "Rainbow Carrots",
    description: "Crunchy and sweet carrots in a variety of vibrant colors. High in beta-carotene and antioxidants.",
    price: 3.49,
    unit: "bunch",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1447175008436-812394212f22?q=80&w=1000&auto=format&fit=crop",
    stock: 30
  },
  {
    id: 104,
    name: "Organic Spinach",
    description: "Tender, dark green leaves packed with iron and vitamins. Perfect for salads or sautéing.",
    price: 3.99,
    unit: "bag",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000&auto=format&fit=crop",
    stock: 40
  },
  {
    id: 105,
    name: "Red Bell Peppers",
    description: "Sweet and crisp red peppers, excellent for roasting or eating raw.",
    price: 1.99,
    unit: "each",
    farmId: 1,
    category: "Vegetable",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdf5bcd374?q=80&w=1000&auto=format&fit=crop",
    stock: 60
  },
  {
     id: 106,
     name: "Sweet Potatoes",
     description: "Rich, orange-fleshed sweet potatoes. A comforting staple for any meal.",
     price: 1.49,
     unit: "lb",
     farmId: 1,
     category: "Vegetable",
     imageUrl: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?q=80&w=1000&auto=format&fit=crop",
     stock: 75
  },
  {
     id: 107,
     name: "English Cucumbers",
     description: "Crisp, thin-skinned cucumbers. Refreshing and seedless.",
     price: 2.49,
     unit: "each",
     farmId: 1,
     category: "Vegetable",
     imageUrl: "https://images.unsplash.com/photo-1604543506240-422204c4418f?q=80&w=1000&auto=format&fit=crop",
     stock: 45
  },

  // --- Fruit ---
  {
    id: 103,
    name: "Organic Strawberries",
    description: "Sweet, sun-ripened strawberries picked at the peak of freshness. No synthetic pesticides or fertilizers.",
    price: 6.99,
    unit: "lb",
    farmId: 1,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4b0be?q=80&w=1000&auto=format&fit=crop",
    stock: 40
  },
  {
    id: 302,
    name: "Gala Apples",
    description: "Crisp and sweet with a mild flavor. Great for snacking, baking, or salads.",
    price: 2.99,
    unit: "lb",
    farmId: 3,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop",
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
    id: 109,
    name: "Juicy Peaches",
    description: "Fragrant and soft peaches with a honey-like sweetness.",
    price: 3.49,
    unit: "lb",
    farmId: 1,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1595123550441-d377e017de6a?q=80&w=1000&auto=format&fit=crop",
    stock: 35
  },
  {
    id: 110,
    name: "Hass Avocados",
    description: "Creamy and rich avocados, perfect for guacamole or toast.",
    price: 1.99,
    unit: "each",
    farmId: 1,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=1000&auto=format&fit=crop",
    stock: 65
  },
  {
    id: 111,
    name: "Organic Lemons",
    description: "Bright and zesty lemons to add a pop of acid to your dishes.",
    price: 0.99,
    unit: "each",
    farmId: 1,
    category: "Fruit",
    imageUrl: "https://images.unsplash.com/photo-1595855709915-39317bd63b84?q=80&w=1000&auto=format&fit=crop",
    stock: 80
  },
  {
      id: 112,
      name: "Watermelon",
      description: "Sweet and refreshing summer treat.",
      price: 6.00,
      unit: "each",
      farmId: 3,
      category: "Fruit",
      imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop",
      stock: 20
  },

  // --- Dairy ---
  {
    id: 201,
    name: "Artisanal Cheddar Cheese",
    description: "Aged for 18 months, this sharp cheddar is rich, nutty, and has a delightful crystalline texture.",
    price: 12.50,
    unit: "block",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=1000&auto=format&fit=crop",
    stock: 20
  },
  {
    id: 203,
    name: "Pasture-Raised Eggs",
    description: "Golden yolks from happy hens that roam free on the pasture. Rich in Omega-3s.",
    price: 7.50,
    unit: "dozen",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=1000&auto=format&fit=crop",
    stock: 60
  },
  {
    id: 204,
    name: "Fresh Goat Cheese",
    description: "Tangy and creamy goat cheese, rolled in fresh herbs.",
    price: 8.99,
    unit: "log",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=1000&auto=format&fit=crop",
    stock: 25
  },
  {
    id: 205,
    name: "Whole Milk",
    description: "Creamy, non-homogenized milk from grass-fed cows.",
    price: 5.49,
    unit: "gallon",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1000&auto=format&fit=crop",
    stock: 40
  },
  {
    id: 206,
    name: "Greek Yogurt",
    description: "Thick and protein-rich yogurt made with traditional methods.",
    price: 6.49,
    unit: "jar",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop",
    stock: 35
  },
   {
    id: 207,
    name: "Salted Butter",
    description: "Hand-churned butter with a sprinkle of sea salt.",
    price: 8.00,
    unit: "block",
    farmId: 2,
    category: "Dairy",
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=1000",
    stock: 30
  },

  // --- Bakery ---
  {
    id: 202,
    name: "Artisanal Sourdough",
    description: "Crusty on the outside, soft and tangy on the inside. Made with natural leaven and organic flour.",
    price: 8.00,
    unit: "loaf",
    farmId: 2,
    category: "Bakery",
    imageUrl: "https://images.unsplash.com/photo-1585476992467-32ea55406c35?q=80&w=1000&auto=format&fit=crop",
    stock: 15
  },
  {
    id: 208,
    name: "French Baguette",
    description: "Traditional long loaf with a crisp crust and airy crumb.",
    price: 3.50,
    unit: "loaf",
    farmId: 2,
    category: "Bakery",
    imageUrl: "https://images.unsplash.com/photo-1597079910443-60c43fc4f718?q=80&w=1000&auto=format&fit=crop",
    stock: 40
  },
  {
    id: 209,
    name: "Butter Croissants",
    description: "Flaky, buttery pastries baked fresh every morning.",
    price: 3.00,
    unit: "each",
    farmId: 2,
    category: "Bakery",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f40388085?q=80&w=1000",
    stock: 50
  },
  {
    id: 210,
    name: "Chocolate Chip Cookies",
    description: "Chewy cookies loaded with dark chocolate chunks.",
    price: 2.00,
    unit: "each",
    farmId: 2,
    category: "Bakery",
    imageUrl: "https://images.unsplash.com/photo-1499636138143-bd630f5cf388?q=80&w=1000&auto=format&fit=crop",
    stock: 60
  },

  // --- Artisanal ---
  {
    id: 301,
    name: "Wildflower Honey",
    description: "Pure, raw honey gathered from diverse wildflowers. Unfiltered and full of natural enzymes.",
    price: 15.00,
    unit: "jar",
    farmId: 3,
    category: "Artisanal",
    imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1000",
    stock: 25
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
  },
  {
    id: 113,
    name: "Strawberry Jam",
    description: "Homemade jam with chunks of organic strawberries.",
    price: 8.50,
    unit: "jar",
    farmId: 1,
    category: "Artisanal",
    imageUrl: "https://images.unsplash.com/photo-1600180489670-4966779427b0?q=80&w=1000&auto=format&fit=crop",
    stock: 35
  },
  {
    id: 303,
    name: "Maple Granola",
    description: "Crunchy baked oats with maple syrup and nuts.",
    price: 9.99,
    unit: "bag",
    farmId: 3,
    category: "Artisanal",
    imageUrl: "https://images.unsplash.com/photo-1517093710776-80db61b29a28?q=80&w=1000&auto=format&fit=crop",
    stock: 30
  }
];
