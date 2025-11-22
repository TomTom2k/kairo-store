# Hướng Dẫn Sửa Lỗi 403 Khi Upload Ảnh

## Nguyên nhân

Lỗi 403 (Forbidden) xảy ra khi:

1. ❌ Bucket `product-images` chưa được tạo trong Supabase
2. ❌ Bucket chưa có policies cho phép upload

## Cách sửa nhanh (Qua Supabase Dashboard)

### Bước 1: Tạo Bucket

1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project của bạn
3. Vào **Storage** (thanh bên trái)
4. Click **New bucket**
5. Điền thông tin:
   - **Name**: `product-images`
   - **Public bucket**: ✅ **BẬT TÙY CHỌN NÀY** (quan trọng!)
6. Click **Create bucket**

### Bước 2: Kiểm tra Policies (Nếu không bật Public)

Nếu bạn quên bật "Public bucket", làm theo:

1. Click vào bucket `product-images`
2. Vào tab **Policies**
3. Click **New policy**
4. Chọn template **"For full customization"**
5. Tạo 4 policies sau:

#### Policy 1: Public Read

```sql
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
```

#### Policy 2: Public Insert

```sql
CREATE POLICY "Public Insert Access"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );
```

#### Policy 3: Public Update

```sql
CREATE POLICY "Public Update Access"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'product-images' );
```

#### Policy 4: Public Delete

```sql
CREATE POLICY "Public Delete Access"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' );
```

## Cách sửa tự động (Qua SQL)

Nếu bạn có `SUPABASE_SERVICE_ROLE_KEY` trong `.env.local`:

```bash
./scripts/setup-storage.sh
```

Script này sẽ tự động tạo bucket và setup policies.

## Kiểm tra sau khi setup

1. Vào Supabase Dashboard → Storage
2. Bạn sẽ thấy bucket `product-images`
3. Click vào bucket
4. Tab **Configuration** → **Public access** phải là **ON**
5. Tab **Policies** → Phải có ít nhất 1 policy cho SELECT

## Test lại upload

1. Vào `/admin/products/new`
2. Thử drag & drop một ảnh
3. Nếu thành công, bạn sẽ thấy:
   - Progress bar
   - Preview ảnh
   - Không có lỗi trong console

## Nếu vẫn lỗi

Mở Browser Console (F12) và kiểm tra:

### Lỗi: "Bucket not found"

→ Bucket chưa được tạo hoặc tên sai
→ Đảm bảo tên bucket là `product-images` (chính xác)

### Lỗi: "new row violates row-level security policy"

→ Chưa có policies hoặc policies sai
→ Làm lại Bước 2 ở trên

### Lỗi: "Invalid API key"

→ Kiểm tra `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Lưu ý bảo mật

> ⚠️ **Cảnh báo**: Hiện tại bucket đang public, ai cũng có thể upload/delete.
>
> Để bảo mật hơn trong production, bạn nên:
>
> 1. Tắt public access
> 2. Chỉ cho phép authenticated users upload
> 3. Sử dụng policies với `auth.role() = 'authenticated'`

Xem file `003_setup_storage_bucket.sql` để biết cách setup policies cho authenticated users.
