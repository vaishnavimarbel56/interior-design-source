// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      subcategories: {
        Row: Subcategory;
        Insert: Omit<Subcategory, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Subcategory, 'id' | 'created_at' | 'updated_at'>>;
      };
      brands: {
        Row: Brand;
        Insert: Omit<Brand, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Brand, 'id' | 'created_at' | 'updated_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
      product_images: {
        Row: ProductImage;
        Insert: Omit<ProductImage, 'id' | 'created_at'>;
        Update: Partial<Omit<ProductImage, 'id' | 'created_at'>>;
      };
      product_specifications: {
        Row: ProductSpecification;
        Insert: Omit<ProductSpecification, 'id' | 'created_at'>;
        Update: Partial<Omit<ProductSpecification, 'id' | 'created_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id' | 'created_at'>;
        Update: Partial<Omit<OrderItem, 'id' | 'created_at'>>;
      };
      enquiries: {
        Row: Enquiry;
        Insert: Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

// Table Types
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'user' | 'admin';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  subcategory_id: string | null;
  brand_id: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  product_code: string | null;
  material: string | null;
  size: string | null;
  thickness: string | null;
  finish: string | null;
  color: string | null;
  design: string | null;
  type: string | null;
  dimensions: string | null;
  installation_type: string | null;
  stock_status: 'in_stock' | 'out_of_stock' | 'limited';
  stock_quantity: number;
  price: number;
  mrp: number | null;
  discount_percentage: number;
  unit: string;
  coverage_per_box: string | null;
  pieces_per_box: string | null;
  warranty: string | null;
  origin: string | null;
  application: string | null;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  specification_name: string;
  specification_value: string;
  display_order: number;
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  product_id: string | null;
  quantity: string | null;
  project_type: string | null;
  location: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: 'text' | 'number' | 'boolean' | 'json';
  created_at: string;
  updated_at: string;
}

// Cart Item Type
export interface CartItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  image_url: string | null;
}

// Filter Types
export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  colors?: string[];
  materials?: string[];
  finishes?: string[];
  sizes?: string[];
  priceRange?: [number, number];
  stockStatus?: 'in_stock' | 'out_of_stock';
  rating?: number;
}

// Sort Types
export type SortOption = 'recommended' | 'newest' | 'popular' | 'price_low' | 'price_high' | 'discount' | 'rating';
