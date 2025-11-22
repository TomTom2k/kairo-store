# Supabase Storage Setup Guide

## Create Storage Bucket

Follow these steps to set up the `product-images` bucket in your Supabase project:

### 1. Access Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project

### 2. Create Bucket

1. Navigate to **Storage** in the left sidebar
2. Click **New bucket**
3. Enter bucket details:
   - **Name**: `product-images`
   - **Public bucket**: ✅ Check this option (for public access)
4. Click **Create bucket**

### 3. Configure Bucket Policies (If Not Public)

If you didn't check "Public bucket", you'll need to set up policies:

1. Click on the `product-images` bucket
2. Go to **Policies** tab
3. Click **New policy**
4. Create the following policies:

#### Policy 1: Public Read Access

```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
```

#### Policy 2: Authenticated Upload

```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);
```

#### Policy 3: Authenticated Delete

```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
);
```

### 4. Verify Setup

Test the bucket by uploading a test image:

1. Go to the `product-images` bucket
2. Click **Upload file**
3. Select an image file
4. After upload, click on the file
5. Copy the public URL
6. Open the URL in a new tab - you should see the image

### 5. Environment Variables

Ensure your `.env.local` file has the required Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These should already be configured if you're using Supabase for your database.

## Bucket Structure

Images will be organized as follows:

```
product-images/
└── products/
    ├── 1234567890-abc123.jpg
    ├── 1234567891-def456.png
    └── ...
```

Each filename is unique, generated using:

- Timestamp
- Random string
- Original file extension

## File Restrictions

The upload component enforces:

- **Allowed types**: JPEG, JPG, PNG, WebP, GIF
- **Max file size**: 5MB per image
- **Max images**: 10 per product

## Troubleshooting

### Images not uploading

- Check that the bucket exists and is named `product-images`
- Verify bucket is public or has correct policies
- Check browser console for errors

### Images not displaying

- Verify the public URL is correct
- Check CORS settings in Supabase (should be enabled by default)
- Ensure bucket has public read access

### Permission errors

- Make sure you're authenticated when uploading
- Verify the policies are correctly set up
- Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct

## Next Steps

Once the bucket is set up:

1. Navigate to `/admin/products/new`
2. Try uploading images using drag & drop
3. Verify images are stored in Supabase Storage
4. Create a product and verify images display correctly
