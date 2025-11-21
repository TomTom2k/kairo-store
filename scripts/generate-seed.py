#!/usr/bin/env python3
"""
Script to convert mock products data to SQL INSERT statements
"""

import json
import re

# Read the TypeScript file and extract the mockProducts array
with open('src/features/categories/mock-products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the array content between mockProducts: Product[] = [ and ];
match = re.search(r'export const mockProducts: Product\[\] = \[(.*?)\];', content, re.DOTALL)
if not match:
    print("Could not find mockProducts array")
    exit(1)

array_content = match.group(1)

# Parse products manually (simple approach)
products = []
current_product = {}
lines = array_content.split('\n')

for line in lines:
    line = line.strip()
    if not line or line == '{' or line == '},':
        if current_product and 'id' in current_product:
            products.append(current_product)
            current_product = {}
        continue
    
    if line.endswith(','):
        line = line[:-1]
    
    if ':' in line:
        key, value = line.split(':', 1)
        key = key.strip()
        value = value.strip().strip(',').strip("'").strip('"')
        
        if key in ['id', 'priceValue']:
            current_product[key] = int(value) if value.isdigit() else 0
        elif key == 'rating':
            current_product[key] = float(value) if value else 0
        elif key == 'inStock':
            current_product[key] = value == 'true'
        elif key == 'badge' and value == 'null':
            current_product[key] = None
        else:
            current_product[key] = value.replace("'", "''")  # Escape single quotes for SQL

# Add last product if exists
if current_product and 'id' in current_product:
    products.append(current_product)

# Generate SQL INSERT statements
sql_statements = []
sql_statements.append("-- Seed data for products table")
sql_statements.append("-- This file is auto-generated from mock-products.ts\n")

for product in products:
    badge_value = f"'{product.get('badge', '')}'" if product.get('badge') else 'NULL'
    
    sql = f"""INSERT INTO products (id, name, price, price_value, rating, image, description, badge, category, stock, in_stock)
VALUES (
  {product.get('id', 0)},
  '{product.get('name', '')}',
  '{product.get('price', '')}',
  {product.get('priceValue', 0)},
  {product.get('rating', 0)},
  '{product.get('image', '')}',
  '{product.get('description', '')}',
  {badge_value},
  '{product.get('category', '')}',
  '{product.get('stock', '')}',
  {str(product.get('inStock', True)).lower()}
);"""
    
    sql_statements.append(sql)

# Write to file
output_file = 'supabase/seed.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_statements))
    f.write('\n\n-- Reset sequence to continue from max ID\n')
    f.write("SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));\n")

print(f"Generated {len(products)} product INSERT statements in {output_file}")
