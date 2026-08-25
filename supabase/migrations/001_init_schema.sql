-- ============================================
-- VAISHNAVI MARBLE E-COMMERCE DATABASE SCHEMA
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_is_active ON public.categories(is_active);
CREATE INDEX idx_categories_display_order ON public.categories(display_order);

-- ============================================
-- 3. SUBCATEGORIES TABLE
-- ============================================
CREATE TABLE public.subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES public.categories ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

CREATE INDEX idx_subcategories_category_id ON public.subcategories(category_id);
CREATE INDEX idx_subcategories_slug ON public.subcategories(slug);
CREATE INDEX idx_subcategories_is_active ON public.subcategories(is_active);

-- ============================================
-- 4. BRANDS TABLE
-- ============================================
CREATE TABLE public.brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brands_slug ON public.brands(slug);
CREATE INDEX idx_brands_is_active ON public.brands(is_active);

-- ============================================
-- 5. PRODUCTS TABLE
-- ============================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES public.categories ON DELETE CASCADE,
  subcategory_id UUID REFERENCES public.subcategories ON DELETE SET NULL,
  brand_id UUID REFERENCES public.brands ON DELETE SET NULL,
  
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  product_code TEXT UNIQUE,
  
  material TEXT,
  size TEXT,
  thickness TEXT,
  finish TEXT,
  color TEXT,
  design TEXT,
  type TEXT,
  dimensions TEXT,
  installation_type TEXT,
  
  stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'limited')),
  stock_quantity INTEGER DEFAULT 0,
  
  price DECIMAL(10, 2) NOT NULL,
  mrp DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  
  unit TEXT DEFAULT 'box',
  coverage_per_box TEXT,
  pieces_per_box TEXT,
  warranty TEXT,
  origin TEXT,
  application TEXT,
  
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_subcategory_id ON public.products(subcategory_id);
CREATE INDEX idx_products_brand_id ON public.products(brand_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_stock_status ON public.products(stock_status);
CREATE INDEX idx_products_is_active ON public.products(is_active);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);
CREATE INDEX idx_products_created_at ON public.products(created_at DESC);
CREATE INDEX idx_products_rating ON public.products(rating DESC);

-- ============================================
-- 6. PRODUCT IMAGES TABLE
-- ============================================
CREATE TABLE public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX idx_product_images_is_primary ON public.product_images(is_primary);

-- ============================================
-- 7. PRODUCT SPECIFICATIONS TABLE
-- ============================================
CREATE TABLE public.product_specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products ON DELETE CASCADE,
  specification_name TEXT NOT NULL,
  specification_value TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_product_specifications_product_id ON public.product_specifications(product_id);

-- ============================================
-- 8. ORDERS TABLE
-- ============================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  
  total_amount DECIMAL(12, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'ready', 'delivered', 'cancelled')),
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- ============================================
-- 9. ORDER ITEMS TABLE
-- ============================================
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders ON DELETE CASCADE,
  product_id UUID REFERENCES public.products ON DELETE SET NULL,
  
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

-- ============================================
-- 10. ENQUIRIES TABLE
-- ============================================
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  
  product_id UUID REFERENCES public.products ON DELETE SET NULL,
  quantity TEXT,
  project_type TEXT,
  location TEXT,
  message TEXT,
  
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'closed')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_enquiries_status ON public.enquiries(status);
CREATE INDEX idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX idx_enquiries_product_id ON public.enquiries(product_id);

-- ============================================
-- 11. SITE SETTINGS TABLE
-- ============================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text' CHECK (setting_type IN ('text', 'number', 'boolean', 'json')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 12. AUDIT LOG TABLE
-- ============================================
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES auth.users ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_admin_id ON public.audit_logs(admin_id);
CREATE INDEX idx_audit_logs_table_name ON public.audit_logs(table_name);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read their own profile
CREATE POLICY "users_read_own_profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "admins_read_all_profiles" ON public.profiles
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- CATEGORIES: Public can read active categories
CREATE POLICY "public_read_active_categories" ON public.categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "admins_manage_categories" ON public.categories
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- SUBCATEGORIES: Public can read active subcategories
CREATE POLICY "public_read_active_subcategories" ON public.subcategories
  FOR SELECT USING (is_active = true);

CREATE POLICY "admins_manage_subcategories" ON public.subcategories
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- BRANDS: Public can read active brands
CREATE POLICY "public_read_active_brands" ON public.brands
  FOR SELECT USING (is_active = true);

CREATE POLICY "admins_manage_brands" ON public.brands
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- PRODUCTS: Public can read active products
CREATE POLICY "public_read_active_products" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "admins_manage_products" ON public.products
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- PRODUCT_IMAGES: Public can read product images
CREATE POLICY "public_read_product_images" ON public.product_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE products.id = product_images.product_id AND products.is_active = true
    )
  );

CREATE POLICY "admins_manage_product_images" ON public.product_images
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- PRODUCT_SPECIFICATIONS: Public can read product specifications
CREATE POLICY "public_read_product_specifications" ON public.product_specifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE products.id = product_specifications.product_id AND products.is_active = true
    )
  );

CREATE POLICY "admins_manage_product_specifications" ON public.product_specifications
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ORDERS: Users can create orders, admins can read/update
CREATE POLICY "users_create_orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admins_read_all_orders" ON public.orders
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "admins_update_orders" ON public.orders
  FOR UPDATE USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ORDER_ITEMS: Follow order access
CREATE POLICY "admins_read_order_items" ON public.order_items
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ENQUIRIES: Users can create enquiries, admins can manage
CREATE POLICY "users_create_enquiries" ON public.enquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admins_manage_enquiries" ON public.enquiries
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- SITE_SETTINGS: Only admins can manage
CREATE POLICY "admins_manage_site_settings" ON public.site_settings
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- AUDIT_LOGS: Only admins can read
CREATE POLICY "admins_read_audit_logs" ON public.audit_logs
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- ============================================
-- TRIGGERS FOR TIMESTAMPS
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_subcategories_updated_at BEFORE UPDATE ON public.subcategories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON public.brands
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- DEFAULT SITE SETTINGS
-- ============================================

INSERT INTO public.site_settings (setting_key, setting_value, setting_type) VALUES
  ('business_name', 'Vaishnavi Marble', 'text'),
  ('phone_1', '+91 93303 00408', 'text'),
  ('phone_2', '+91 98363 44786', 'text'),
  ('whatsapp', '+91 70039 48297', 'text'),
  ('email', 'marblevaishnavi@gmail.com', 'text'),
  ('address', 'Krishnapur Taruliya Main Road, near Chanchal Kumari Girls High School, Sonartari Apartment, P.S. New Town, Kolkata – 700102', 'text'),
  ('google_maps_url', 'https://maps.google.com/?q=Vaishnavi+Marble+Kolkata', 'text'),
  ('youtube_url', '', 'text'),
  ('facebook_url', '', 'text'),
  ('whatsapp_business', '+91 70039 48297', 'text'),
  ('hero_title', 'Premium Marble, Tiles & Home Interior Solutions', 'text'),
  ('hero_subtitle', 'Transform your home or commercial space with premium-quality marble, granite, tiles, sanitaryware, kitchen sinks, bathroom vanities and more.', 'text'),
  ('footer_description', 'Premium Marble, Tiles, Sanitaryware, Kitchen Sinks, Bathroom Vanities, Parking Tiles, Marble Statues, Marble & Granite and Home Interior Solutions in Kolkata.', 'text')
ON CONFLICT (setting_key) DO NOTHING;
