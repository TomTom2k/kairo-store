-- Migration: Add SEO fields to products table
-- This migration adds meta_title, meta_description, keywords, and slug for better SEO

-- Step 1: Add SEO fields
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_title VARCHAR(60);
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160);
ALTER TABLE products ADD COLUMN IF NOT EXISTS keywords TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;

-- Step 2: Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Step 3: Create index for keywords search
CREATE INDEX IF NOT EXISTS idx_products_keywords ON products USING GIN(to_tsvector('english', COALESCE(keywords, '')));

-- Step 4: Generate initial slugs for existing products (Vietnamese-friendly)
-- This will create slugs from existing product names
UPDATE products 
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      TRANSLATE(
        name,
        'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ',
        'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd'
      ),
      '[^a-z0-9]+', '-', 'g'
    ),
    '^-|-$', '', 'g'
  ) || '-' || id::text
)
WHERE slug IS NULL;

-- Step 5: Set meta_title from name if not exists
UPDATE products 
SET meta_title = SUBSTRING(name FROM 1 FOR 60)
WHERE meta_title IS NULL;

-- Step 6: Set meta_description from description if not exists
UPDATE products 
SET meta_description = SUBSTRING(description FROM 1 FOR 160)
WHERE meta_description IS NULL;

-- Note: After running this migration:
-- - All products will have unique slugs
-- - Existing products will have auto-generated SEO data
-- - New products should provide SEO data in the application
