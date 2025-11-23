-- Relax SEO field length constraints to avoid "value too long" errors
-- We will handle length recommendations in the UI instead of strict DB constraints

ALTER TABLE products 
  ALTER COLUMN meta_title TYPE TEXT,
  ALTER COLUMN meta_description TYPE TEXT;
