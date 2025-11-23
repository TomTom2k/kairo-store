-- Add video column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS video TEXT;
