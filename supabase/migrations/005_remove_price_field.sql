-- Remove redundant price field from products table
-- We only need price_value (number) for calculations
-- Frontend will format the display price

ALTER TABLE products DROP COLUMN IF EXISTS price;

-- Add comment to price_value for clarity
COMMENT ON COLUMN products.price_value IS 'Product price in VND (Vietnamese Dong). Frontend will format for display.';
