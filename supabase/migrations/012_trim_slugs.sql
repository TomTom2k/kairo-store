-- Trim whitespace and hidden characters from all product slugs
UPDATE products 
SET slug = TRIM(slug)
WHERE slug IS NOT NULL;

-- Also remove any potential zero-width characters and normalize
UPDATE products
SET slug = REGEXP_REPLACE(TRIM(slug), '[^\x20-\x7E]', '', 'g')
WHERE slug IS NOT NULL;
