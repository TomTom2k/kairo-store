# Hướng Dẫn Setup Bucket Qua UI (Không Cần SQL)

## Bước 1: Tạo Bucket

1. Vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project của bạn
3. Click **Storage** ở sidebar bên trái
4. Click nút **New bucket** (màu xanh)
5. Điền form:
   ```
   Name: product-images
   ✅ Public bucket (BẬT CHECKBOX NÀY!)
   File size limit: 52428800 (50MB - tùy chọn)
   Allowed MIME types: (để trống = cho phép tất cả)
   ```
6. Click **Create bucket**

## Bước 2: Tạo Policies (Nếu Cần)

> ⚠️ **Lưu ý:** Nếu bạn đã bật "Public bucket" ở Bước 1, **KHÔNG CẦN** làm bước này!

Nếu bucket không public, làm theo:

1. Click vào bucket `product-images` vừa tạo
2. Vào tab **Policies**
3. Click **New policy**

### Policy 1: Allow Public Read

1. Click **New policy**
2. Chọn **"Get started quickly"** → **"Allow public read-access"**
3. Policy name: `Public Read Access`
4. Click **Review** → **Save policy**

### Policy 2: Allow Public Insert (Upload)

1. Click **New policy**
2. Chọn **"For full customization"**
3. Policy name: `Public Upload Access`
4. Allowed operation: Chọn **INSERT**
5. Target roles: `public`
6. USING expression:
   ```sql
   bucket_id = 'product-images'
   ```
7. WITH CHECK expression:
   ```sql
   bucket_id = 'product-images'
   ```
8. Click **Review** → **Save policy**

### Policy 3: Allow Public Delete

1. Click **New policy**
2. Chọn **"For full customization"**
3. Policy name: `Public Delete Access`
4. Allowed operation: Chọn **DELETE**
5. Target roles: `public`
6. USING expression:
   ```sql
   bucket_id = 'product-images'
   ```
7. Click **Review** → **Save policy**

## Bước 3: Kiểm Tra

### Kiểm tra bucket đã tạo:

1. Vào Storage → Bạn sẽ thấy bucket `product-images`
2. Click vào bucket
3. Tab **Configuration**:
   - Public: **ON** (màu xanh)
   - File size limit: 52428800 bytes

### Kiểm tra policies (nếu có):

1. Tab **Policies**
2. Bạn sẽ thấy ít nhất 1 policy cho SELECT/INSERT/DELETE

### Test upload thủ công:

1. Trong bucket `product-images`
2. Click **Upload file**
3. Chọn một ảnh bất kỳ
4. Upload thành công → ✅ Bucket hoạt động!
5. Click vào file vừa upload
6. Copy URL và mở trong tab mới
7. Nếu thấy ảnh → ✅ Public access hoạt động!

## Bước 4: Test Trong App

1. Restart dev server (nếu đang chạy):

   ```bash
   # Ctrl+C để stop
   pnpm run dev
   ```

2. Vào `http://localhost:3000/admin/products/new`

3. Thử drag & drop một ảnh vào upload zone

4. **Nếu thành công:**

   - ✅ Progress bar hiển thị
   - ✅ Ảnh preview xuất hiện
   - ✅ Không có lỗi trong console

5. **Nếu vẫn lỗi 403:**
   - Mở Browser Console (F12)
   - Xem lỗi chi tiết
   - Kiểm tra lại policies

## Troubleshooting

### Lỗi: "Bucket not found"

**Nguyên nhân:** Tên bucket sai hoặc chưa tạo
**Giải pháp:** Đảm bảo tên bucket là `product-images` (chính xác, không có khoảng trắng)

### Lỗi: "new row violates row-level security policy"

**Nguyên nhân:** Bucket chưa public HOẶC chưa có policies
**Giải pháp:**

- Option 1: Xóa bucket và tạo lại với "Public bucket" = ON
- Option 2: Thêm policies như Bước 2

### Lỗi: "Failed to upload image"

**Nguyên nhân:** Có thể do CORS hoặc network
**Giải pháp:**

1. Kiểm tra network tab trong browser
2. Xem response từ Supabase
3. Kiểm tra `.env.local` có đúng URL và key không

### Upload qua Dashboard OK nhưng qua App bị lỗi

**Nguyên nhân:** Policies chưa đúng cho public access
**Giải pháp:**

1. Xóa tất cả policies hiện tại
2. Tạo lại policies như Bước 2
3. Hoặc đơn giản: Xóa bucket và tạo lại với "Public bucket" = ON

## Lưu Ý Bảo Mật

> ⚠️ **Cảnh báo:** Bucket đang public, ai cũng có thể upload/delete!

**Để bảo mật hơn trong production:**

1. Tắt "Public bucket"
2. Tạo policies chỉ cho authenticated users:
   ```sql
   -- Thay vì bucket_id = 'product-images'
   -- Dùng:
   bucket_id = 'product-images' AND auth.role() = 'authenticated'
   ```
3. Yêu cầu user đăng nhập trước khi upload

Nhưng hiện tại để test, cứ để public là OK!
