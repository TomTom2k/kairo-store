-- Create discounts table
CREATE TABLE IF NOT EXISTS discounts (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value DECIMAL(10,2) NOT NULL CHECK (value > 0),
  min_order_value DECIMAL(10,2) DEFAULT 0,
  max_discount_amount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP,
  valid_to TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add discount columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS discount_id INTEGER REFERENCES discounts(id),
ADD COLUMN IF NOT EXISTS discount_code VARCHAR(50),
ADD COLUMN IF NOT EXISTS discount_amount DECIMAL(10,2) DEFAULT 0;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_discounts_code ON discounts(code);
CREATE INDEX IF NOT EXISTS idx_discounts_active ON discounts(is_active);
CREATE INDEX IF NOT EXISTS idx_discounts_valid_period ON discounts(valid_from, valid_to);

-- Insert sample discounts for testing
INSERT INTO discounts (code, type, value, min_order_value, max_discount_amount, usage_limit, valid_from, valid_to, description)
VALUES 
  ('WELCOME10', 'percentage', 10, 0, 50000, 100, NOW(), NOW() + INTERVAL '30 days', 'Giảm 10% cho đơn hàng đầu tiên'),
  ('SUMMER50K', 'fixed', 50000, 200000, NULL, 50, NOW(), NOW() + INTERVAL '60 days', 'Giảm 50.000đ cho đơn từ 200.000đ'),
  ('VIP20', 'percentage', 20, 500000, 100000, 20, NOW(), NOW() + INTERVAL '90 days', 'Giảm 20% cho VIP (tối đa 100k)')
ON CONFLICT (code) DO NOTHING;
