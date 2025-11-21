-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  price_value INTEGER NOT NULL,
  rating DECIMAL(3,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  badge TEXT,
  category TEXT NOT NULL,
  stock TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price INTEGER NOT NULL CHECK (price > 0)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required)
CREATE POLICY "Allow public read access on products" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access on reviews" 
  ON reviews FOR SELECT 
  USING (true);

-- Allow public to insert reviews (no auth required for now)
CREATE POLICY "Allow public insert on reviews" 
  ON reviews FOR INSERT 
  WITH CHECK (true);

-- Allow public to insert orders (no auth required for now)
CREATE POLICY "Allow public insert on orders" 
  ON orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert on order_items" 
  ON order_items FOR INSERT 
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
