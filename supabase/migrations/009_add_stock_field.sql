-- Add stock column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock TEXT DEFAULT 'Còn hàng';
