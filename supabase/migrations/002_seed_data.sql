-- ============================================
-- VAISHNAVI MARBLE SEED DATA
-- ============================================

-- Insert Brands
INSERT INTO public.brands (name, slug, is_active) VALUES
  ('Kajaria', 'kajaria', true),
  ('Somany', 'somany', true),
  ('Nitco', 'nitco', true),
  ('Johnson', 'johnson', true),
  ('Simpolo', 'simpolo', true),
  ('Cera', 'cera', true),
  ('Hindware', 'hindware', true),
  ('Jaquar', 'jaquar', true);

-- Insert Categories
INSERT INTO public.categories (name, slug, description, is_active, display_order) VALUES
  ('Tiles', 'tiles', 'Premium floor, wall, bathroom, kitchen, outdoor and elevation tiles', true, 1),
  ('Sanitaryware', 'sanitaryware', 'Complete bathroom fixtures and accessories', true, 2),
  ('Kitchen Sink', 'kitchen-sink', 'Stainless steel and designer kitchen sinks', true, 3),
  ('Bathroom Vanity', 'bathroom-vanity', 'Modern and luxurious bathroom vanities', true, 4),
  ('Parking Tiles', 'parking-tiles', 'Heavy-duty parking and outdoor floor tiles', true, 5),
  ('Marble & Granite', 'marble-and-granite', 'Premium marble and granite slabs and tiles', true, 6),
  ('Marble Statues', 'marble-statues', 'Decorative and religious marble statues', true, 7),
  ('Marble Home Interiors', 'marble-home-interiors', 'Marble mandirs, fireplaces and custom interiors', true, 8);

-- Insert Subcategories for Tiles
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'tiles'), 'Floor Tiles', 'floor-tiles', 'Vitrified, porcelain and marble look floor tiles', true, 1),
  ((SELECT id FROM categories WHERE slug = 'tiles'), 'Wall Tiles', 'wall-tiles', 'Decorative and functional wall tiles', true, 2),
  ((SELECT id FROM categories WHERE slug = 'tiles'), 'Bathroom Tiles', 'bathroom-tiles', 'Anti-skid bathroom floor and wall tiles', true, 3),
  ((SELECT id FROM categories WHERE slug = 'tiles'), 'Kitchen Tiles', 'kitchen-tiles', 'Backsplash and kitchen floor tiles', true, 4),
  ((SELECT id FROM categories WHERE slug = 'tiles'), 'Outdoor Tiles', 'outdoor-tiles', 'Terrace, balcony and garden tiles', true, 5),
  ((SELECT id FROM categories WHERE slug = 'tiles'), 'Elevation Tiles', 'elevation-tiles', 'Exterior and building elevation tiles', true, 6);

-- Insert Subcategories for Sanitaryware
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'sanitaryware'), 'Wall Hung WC', 'wall-hung-wc', 'Wall-mounted water closets and rimless WCs', true, 1),
  ((SELECT id FROM categories WHERE slug = 'sanitaryware'), 'One Piece WC', 'one-piece-wc', 'Modern one-piece toilet designs', true, 2),
  ((SELECT id FROM categories WHERE slug = 'sanitaryware'), 'Wash Basin', 'wash-basin', 'Table-top and pedestal wash basins', true, 3),
  ((SELECT id FROM categories WHERE slug = 'sanitaryware'), 'Counter Basin', 'counter-basin', 'Above counter and round counter basins', true, 4),
  ((SELECT id FROM categories WHERE slug = 'sanitaryware'), 'Bathroom Accessories', 'bathroom-accessories', 'Towel rods, soap dishes and bathroom shelves', true, 5);

-- Insert Subcategories for Kitchen Sink
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'kitchen-sink'), 'Stainless Steel Sink', 'stainless-steel-sink', 'SS 304 and SS 202 kitchen sinks', true, 1),
  ((SELECT id FROM categories WHERE slug = 'kitchen-sink'), 'Single Bowl Sink', 'single-bowl-sink', 'Single bowl kitchen sinks', true, 2),
  ((SELECT id FROM categories WHERE slug = 'kitchen-sink'), 'Double Bowl Sink', 'double-bowl-sink', 'Double bowl and workstation sinks', true, 3),
  ((SELECT id FROM categories WHERE slug = 'kitchen-sink'), 'Designer Kitchen Sink', 'designer-kitchen-sink', 'Premium and designer kitchen sinks', true, 4);

-- Insert Subcategories for Bathroom Vanity
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'bathroom-vanity'), 'Wall Mounted Vanity', 'wall-mounted-vanity', 'Floating wall-mounted vanity units', true, 1),
  ((SELECT id FROM categories WHERE slug = 'bathroom-vanity'), 'Floor Standing Vanity', 'floor-standing-vanity', 'Traditional floor-mounted vanity cabinets', true, 2),
  ((SELECT id FROM categories WHERE slug = 'bathroom-vanity'), 'Designer Vanity', 'designer-vanity', 'Luxury and designer vanity units', true, 3),
  ((SELECT id FROM categories WHERE slug = 'bathroom-vanity'), 'Basin Vanity Combo', 'basin-vanity-combo', 'Vanity units with integrated basins', true, 4);

-- Insert Subcategories for Parking Tiles
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'parking-tiles'), 'Heavy Duty Tiles', 'heavy-duty-tiles', 'High-load capacity parking tiles', true, 1),
  ((SELECT id FROM categories WHERE slug = 'parking-tiles'), 'Outdoor Parking Tiles', 'outdoor-parking-tiles', 'Driveway and outdoor parking solutions', true, 2),
  ((SELECT id FROM categories WHERE slug = 'parking-tiles'), 'Anti-Skid Tiles', 'anti-skid-tiles', 'Safety-focused anti-slip parking tiles', true, 3),
  ((SELECT id FROM categories WHERE slug = 'parking-tiles'), 'Commercial Tiles', 'commercial-tiles', 'Commercial-grade parking tiles', true, 4);

-- Insert Subcategories for Marble & Granite
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'marble-and-granite'), 'White Marble', 'white-marble', 'Premium white marble slabs and tiles', true, 1),
  ((SELECT id FROM categories WHERE slug = 'marble-and-granite'), 'Italian Marble', 'italian-marble', 'Imported Italian marble varieties', true, 2),
  ((SELECT id FROM categories WHERE slug = 'marble-and-granite'), 'Indian Marble', 'indian-marble', 'Premium Indian marble options', true, 3),
  ((SELECT id FROM categories WHERE slug = 'marble-and-granite'), 'Black Granite', 'black-granite', 'Black granite slabs and tiles', true, 4),
  ((SELECT id FROM categories WHERE slug = 'marble-and-granite'), 'White Granite', 'white-granite', 'White granite options', true, 5),
  ((SELECT id FROM categories WHERE slug = 'marble-and-granite'), 'Grey Granite', 'grey-granite', 'Grey granite varieties', true, 6),
  ((SELECT id FROM categories WHERE slug = 'marble-and-granite'), 'Countertop Granite', 'countertop-granite', 'Kitchen and bathroom countertop granite', true, 7);

-- Insert Subcategories for Marble Statues
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'marble-statues'), 'Religious Statues', 'religious-statues', 'Hindu and religious marble statues', true, 1),
  ((SELECT id FROM categories WHERE slug = 'marble-statues'), 'Decorative Statues', 'decorative-statues', 'Decorative garden and home statues', true, 2),
  ((SELECT id FROM categories WHERE slug = 'marble-statues'), 'Custom Statues', 'custom-statues', 'Custom marble statue designs', true, 3);

-- Insert Subcategories for Marble Home Interiors
INSERT INTO public.subcategories (category_id, name, slug, description, is_active, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'marble-home-interiors'), 'Marble Mandir', 'marble-mandir', 'Carved and designer marble mandirs', true, 1),
  ((SELECT id FROM categories WHERE slug = 'marble-home-interiors'), 'Marble Fireplace', 'marble-fireplace', 'Classic and modern marble fireplaces', true, 2),
  ((SELECT id FROM categories WHERE slug = 'marble-home-interiors'), 'Custom Interior Work', 'custom-interior-work', 'Bespoke marble interior solutions', true, 3);

-- Sample Products (Floor Tiles)
INSERT INTO public.products (
  category_id, subcategory_id, brand_id, name, slug, short_description,
  description, material, size, thickness, finish, color, design,
  stock_quantity, stock_status, price, mrp, discount_percentage,
  coverage_per_box, pieces_per_box, unit, is_active, is_featured
) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'tiles'),
    (SELECT id FROM subcategories WHERE slug = 'floor-tiles'),
    (SELECT id FROM brands WHERE slug = 'kajaria'),
    'Vitrified Floor Tiles 2x2',
    'vitrified-floor-tiles-2x2',
    'Premium vitrified floor tiles with marble look finish',
    'High-quality vitrified tiles perfect for living rooms, bedrooms and hallways. Scratch-resistant and easy to maintain.',
    'Vitrified', '2×2 ft', '9 mm', 'Glossy', 'White & Grey', 'Marble Look',
    150, 'in_stock', 899.00, 1099.00, 18.2,
    '15.5 Sq.Ft./Box', '2 Pieces/Box', 'box', true, true
  ),
  (
    (SELECT id FROM categories WHERE slug = 'tiles'),
    (SELECT id FROM subcategories WHERE slug = 'floor-tiles'),
    (SELECT id FROM brands WHERE slug = 'somany'),
    'Porcelain Floor Tiles 4x2',
    'porcelain-floor-tiles-4x2',
    'Elegant porcelain tiles for modern interiors',
    'Durable porcelain floor tiles with anti-slip finish. Suitable for kitchens and bathrooms.',
    'Porcelain', '4×2 ft', '8 mm', 'Matte', 'Beige', 'Contemporary',
    200, 'in_stock', 1299.00, 1599.00, 18.8,
    '31 Sq.Ft./Box', '2 Pieces/Box', 'box', true, true
  ),
  (
    (SELECT id FROM categories WHERE slug = 'tiles'),
    (SELECT id FROM subcategories WHERE slug = 'bathroom-tiles'),
    (SELECT id FROM brands WHERE slug = 'nitco'),
    'Anti-Skid Bathroom Tiles',
    'anti-skid-bathroom-tiles',
    'Safe and stylish bathroom floor tiles',
    'Specially designed anti-skid bathroom tiles to prevent slipping. Available in multiple colors.',
    'Ceramic', '1×1 ft', '10 mm', 'Textured', 'White', 'Simple',
    100, 'in_stock', 599.00, 799.00, 25.0,
    '10 Sq.Ft./Box', '12 Pieces/Box', 'box', true, false
  );

-- Sample Products (Sanitaryware)
INSERT INTO public.products (
  category_id, subcategory_id, brand_id, name, slug, short_description,
  description, material, color, finish, type, dimensions,
  stock_quantity, stock_status, price, mrp, discount_percentage,
  warranty, unit, is_active, is_featured
) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'sanitaryware'),
    (SELECT id FROM subcategories WHERE slug = 'wall-hung-wc'),
    (SELECT id FROM brands WHERE slug = 'cera'),
    'Rimless Wall Hung WC',
    'rimless-wall-hung-wc',
    'Modern rimless wall-hung water closet',
    'Contemporary rimless design for easy cleaning and maintenance. Ceramic with glossy finish.',
    'Ceramic', 'White', 'Glossy', 'Wall Hung', '55×35×30 cm',
    50, 'in_stock', 8999.00, 11999.00, 25.0,
    '2 Years', 'piece', true, true
  ),
  (
    (SELECT id FROM categories WHERE slug = 'sanitaryware'),
    (SELECT id FROM subcategories WHERE slug = 'wash-basin'),
    (SELECT id FROM brands WHERE slug = 'jaquar'),
    'Table Top Wash Basin',
    'table-top-wash-basin',
    'Premium table-top ceramic wash basin',
    'Elegant table-top basin with overflow hole. Suitable for modern and traditional bathrooms.',
    'Ceramic', 'White', 'Glossy', 'Table Top', '50×40×12 cm',
    75, 'in_stock', 3499.00, 4599.00, 23.9,
    '1 Year', 'piece', true, true
  );

-- Sample Products (Kitchen Sink)
INSERT INTO public.products (
  category_id, subcategory_id, brand_id, name, slug, short_description,
  description, material, size, finish, color, type,
  stock_quantity, stock_status, price, mrp, discount_percentage,
  warranty, unit, is_active, is_featured
) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'kitchen-sink'),
    (SELECT id FROM subcategories WHERE slug = 'stainless-steel-sink'),
    (SELECT id FROM brands WHERE slug = 'hindware'),
    'SS 304 Single Bowl Kitchen Sink',
    'ss-304-single-bowl-kitchen-sink',
    'Premium stainless steel single bowl sink',
    'High-quality SS 304 grade stainless steel kitchen sink with satin finish. Handmade for durability.',
    'Stainless Steel (SS 304)', '30×18 inches', 'Satin', 'Silver', 'Single Bowl',
    60, 'in_stock', 4999.00, 6499.00, 23.1,
    '5 Years', 'piece', true, true
  ),
  (
    (SELECT id FROM categories WHERE slug = 'kitchen-sink'),
    (SELECT id FROM subcategories WHERE slug = 'double-bowl-sink'),
    (SELECT id FROM brands WHERE slug = 'simpolo'),
    'Double Bowl Undermount Kitchen Sink',
    'double-bowl-undermount-kitchen-sink',
    'Modern double bowl undermount sink',
    'Undermount installation for seamless countertop integration. Includes drain accessories.',
    'Stainless Steel (SS 202)', '36×20 inches', 'Brushed', 'Silver', 'Double Bowl',
    45, 'in_stock', 5999.00, 7999.00, 25.0,
    '3 Years', 'piece', true, false
  );

-- Sample Products (Bathroom Vanity)
INSERT INTO public.products (
  category_id, subcategory_id, brand_id, name, slug, short_description,
  description, material, color, finish, type, dimensions,
  stock_quantity, stock_status, price, mrp, discount_percentage,
  warranty, unit, is_active, is_featured
) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'bathroom-vanity'),
    (SELECT id FROM subcategories WHERE slug = 'wall-mounted-vanity'),
    (SELECT id FROM brands WHERE slug = 'cera'),
    'Wall Mounted Floating Vanity 600mm',
    'wall-mounted-floating-vanity-600mm',
    'Sleek floating wall-mounted vanity unit',
    'Modern floating vanity with storage drawer. Made from high-quality engineered wood with water-resistant coating.',
    'Engineered Wood', 'White & Black', 'Matte', 'Wall Mounted', '60×50×55 cm',
    40, 'in_stock', 12999.00, 17999.00, 27.8,
    '2 Years', 'piece', true, true
  );

-- Sample Products (Parking Tiles)
INSERT INTO public.products (
  category_id, subcategory_id, brand_id, name, slug, short_description,
  description, material, size, thickness, finish, color,
  stock_quantity, stock_status, price, mrp, discount_percentage,
  coverage_per_box, unit, is_active, is_featured
) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'parking-tiles'),
    (SELECT id FROM subcategories WHERE slug = 'heavy-duty-tiles'),
    (SELECT id FROM brands WHERE slug = 'kajaria'),
    'Heavy Duty Vitrified Parking Tiles',
    'heavy-duty-vitrified-parking-tiles',
    'Commercial-grade parking tiles for high-traffic areas',
    'Extra thick and durable vitrified tiles designed for parking lots and commercial spaces. High load capacity.',
    'Vitrified', '2×2 ft', '12 mm', 'Textured', 'Grey',
    300, 'in_stock', 699.00, 899.00, 22.2,
    '16 Sq.Ft./Box', 'box', true, true
  );

-- Sample Products (Marble)
INSERT INTO public.products (
  category_id, subcategory_id, brand_id, name, slug, short_description,
  description, material, color, finish, type, origin,
  stock_quantity, stock_status, price, mrp, discount_percentage,
  unit, is_active, is_featured
) VALUES
  (
    (SELECT id FROM categories WHERE slug = 'marble-and-granite'),
    (SELECT id FROM subcategories WHERE slug = 'white-marble'),
    NULL,
    'Italian White Marble Slab',
    'italian-white-marble-slab',
    'Premium imported Italian white marble',
    'Luxurious imported Italian white marble for flooring and countertops. Natural veining and elegant finish.',
    'Marble', 'Pure White', 'Polished', 'Marble Slab', 'Italy',
    20, 'in_stock', 89999.00, 119999.00, 25.0,
    'sq.ft', true, true
  ),
  (
    (SELECT id FROM categories WHERE slug = 'marble-and-granite'),
    (SELECT id FROM subcategories WHERE slug = 'black-granite'),
    NULL,
    'Black Granite Kitchen Countertop',
    'black-granite-kitchen-countertop',
    'Premium black granite for kitchen counters',
    'High-quality black granite with polished finish. Durable and heat-resistant for kitchen use.',
    'Granite', 'Black', 'Polished', 'Granite Slab', 'India',
    15, 'in_stock', 7999.00, 9999.00, 20.0,
    'sq.ft', true, false
  );