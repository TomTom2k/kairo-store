# Supabase Setup Guide

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase dashboard

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## Step 2: Configure Environment Variables

1. Create a `.env.local` file in the project root (if it doesn't exist):

   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

## Step 3: Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the query to create all tables, indexes, and policies

## Step 4: Seed Initial Data

1. In the SQL Editor, create another new query
2. Copy and paste the contents of `supabase/seed.sql`
3. Run the query to insert all 36 products

## Step 5: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. Check that the following tables exist:
   - `products` (should have 36 rows)
   - `reviews` (empty)
   - `orders` (empty)
   - `order_items` (empty)

## Step 6: Test the Connection

1. Restart your development server:

   ```bash
   pnpm run dev
   ```

2. The app should now connect to Supabase instead of using mock data

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Make sure `.env.local` exists and contains the correct credentials
- Restart your development server after adding environment variables

### Error: "Failed to fetch products"

- Check that you ran both `schema.sql` and `seed.sql`
- Verify your Supabase project is active
- Check the browser console for detailed error messages

### Products not showing

- Verify data was inserted by checking the Table Editor in Supabase
- Check that RLS policies are enabled (they should be created by schema.sql)

## Database Schema Overview

### Products Table

- Stores all product information
- Includes pricing, images, descriptions, categories
- Has indexes on `category` and `in_stock` for fast queries

### Reviews Table

- Stores customer reviews for products
- Foreign key to `products` table
- Cascades on product deletion

### Orders & Order Items Tables

- Stores customer orders and line items
- Supports order tracking and history

## Row Level Security (RLS)

The database uses RLS policies for security:

- **Products**: Public read access
- **Reviews**: Public read and insert access
- **Orders**: Public insert access (for checkout)

For production, you should implement proper authentication and update these policies.

## Next Steps

After setup is complete:

1. Components will automatically use Supabase data
2. All CRUD operations will persist to the database
3. React Query will handle caching and optimistic updates
