-- Migration: Add images array and care instructions to products
-- This migration updates the products table to support multiple images and customizable care instructions

-- Step 1: Add the new images column (array of text)
ALTER TABLE products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Step 2: Migrate existing image data to images array
UPDATE products 
SET images = ARRAY[image]
WHERE image IS NOT NULL AND (images IS NULL OR array_length(images, 1) IS NULL);

-- Step 3: Add care instruction columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS care_light TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS care_water TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS care_temperature TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS care_fertilizer TEXT;

-- Step 4: Drop the old single image column
ALTER TABLE products DROP COLUMN IF EXISTS image;

-- Step 5: Add constraint to ensure at least one image
ALTER TABLE products ADD CONSTRAINT products_images_not_empty 
  CHECK (array_length(images, 1) > 0);

-- Step 6: Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_images ON products USING GIN(images);

-- Note: After running this migration, update your application code to use:
-- - products.images (array) instead of products.image (single value)
-- - products.care_* fields for care instructions
 