-- Ensure RLS is enabled for products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE tablename = 'products'
        AND policyname = 'Allow public read access on products'
    ) THEN
        CREATE POLICY "Allow public read access on products"
        ON products FOR SELECT
        USING (true);
    END IF;
END
$$;
