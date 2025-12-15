
export interface Farm {
  id: number;
  name: string;
  location: string;
  story: string;
  certifications: string[];
  imageUrl: string;
  coverImageUrl: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  farmId: number;
  category: 'Vegetable' | 'Fruit' | 'Dairy' | 'Bakery' | 'Artisanal';
  imageUrl: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type View =
  | { name: 'home' }
  | { name: 'browse' }
  | { name: 'farms' }
  | { name: 'farm'; payload: number }
  | { name: 'product'; payload: number }
  | { name: 'checkout' };

export interface Recipe {
    recipeName: string;
    description: string;
    ingredients: string[];
    instructions: string[];
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'info' | 'error';
}
