-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to product images
CREATE POLICY "Public Access for Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Policy: Allow anyone to upload product images
-- Note: In production, you should restrict this to authenticated users only
CREATE POLICY "Allow Upload for Product Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Policy: Allow anyone to update product images
CREATE POLICY "Allow Update for Product Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- Policy: Allow anyone to delete product images
CREATE POLICY "Allow Delete for Product Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- Note: For production, replace the policies above with authenticated-only policies:
-- 
-- DROP POLICY IF EXISTS "Allow Upload for Product Images" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow Update for Product Images" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow Delete for Product Images" ON storage.objects;
-- 
-- CREATE POLICY "Authenticated Upload for Product Images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'product-images'
--   AND auth.role() = 'authenticated'
-- );
-- 
-- CREATE POLICY "Authenticated Update for Product Images"
-- ON storage.objects FOR UPDATE
-- USING (
--   bucket_id = 'product-images'
--   AND auth.role() = 'authenticated'
-- )
-- WITH CHECK (
--   bucket_id = 'product-images'
--   AND auth.role() = 'authenticated'
-- );
-- 
-- CREATE POLICY "Authenticated Delete for Product Images"
-- ON storage.objects FOR DELETE
-- USING (
--   bucket_id = 'product-images'
--   AND auth.role() = 'authenticated'
-- );
