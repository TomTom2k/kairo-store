-- Enable full access for products table (for Admin Dashboard)
CREATE POLICY "Allow public insert access on products"
  ON products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access on products"
  ON products FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete access on products"
  ON products FOR DELETE
  USING (true);

-- Enable full access for orders table (for Admin Dashboard)
CREATE POLICY "Allow public read access on orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access on orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access on orders"
  ON orders FOR UPDATE
  USING (true);

-- Enable full access for order_items table
CREATE POLICY "Allow public read access on order_items"
  ON order_items FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access on order_items"
  ON order_items FOR INSERT
  WITH CHECK (true);
