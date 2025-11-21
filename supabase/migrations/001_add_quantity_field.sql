-- Migration: Replace stock and in_stock with quantity field
-- This migration updates the products table to use quantity-based inventory management

-- Step 1: Add the new quantity column
ALTER TABLE products ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 0 CHECK (quantity >= 0);

-- Step 2: Migrate existing data (optional - set default quantity based on in_stock)
-- If in_stock is true, set quantity to 10, otherwise set to 0
UPDATE products 
SET quantity = CASE 
  WHEN in_stock = true THEN 10 
  ELSE 0 
END
WHERE quantity = 0;

-- Step 3: Drop the old columns
ALTER TABLE products DROP COLUMN IF EXISTS stock;
ALTER TABLE products DROP COLUMN IF EXISTS in_stock;

-- Step 4: Drop the old index
DROP INDEX IF EXISTS idx_products_in_stock;

-- Step 5: Create new index for quantity
CREATE INDEX IF NOT EXISTS idx_products_quantity ON products(quantity);

-- Note: After running this migration, you should update your seed data
-- to use the quantity field instead of stock and in_stock
