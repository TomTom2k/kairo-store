-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT, -- For Lucide icons
  color TEXT, -- For gradient styling (e.g., "from-emerald-400 to-emerald-600")
  bg_color TEXT, -- For background styling (e.g., "bg-emerald-50")
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access for everyone
CREATE POLICY "Allow public read access" ON categories
  FOR SELECT USING (true);

-- Create policy to allow write access for authenticated users (admin)
CREATE POLICY "Allow authenticated insert" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON categories
  FOR DELETE USING (auth.role() = 'authenticated');

-- Seed initial data
INSERT INTO categories (name, slug, icon_name, description, color, bg_color) VALUES
  (
    'Cây Văn Phòng', 
    'cay-van-phong', 
    'Home', 
    'Cây xanh lý tưởng cho không gian làm việc, dễ chăm sóc', 
    'from-emerald-400 to-emerald-600', 
    'bg-emerald-50'
  ),
  (
    'Cây Cảnh', 
    'cay-canh', 
    'Leaf', 
    'Cây trang trí đẹp mắt, tạo điểm nhấn cho không gian', 
    'from-green-400 to-green-600', 
    'bg-green-50'
  ),
  (
    'Cây Trong Nhà', 
    'cay-trong-nha', 
    'Sprout', 
    'Phù hợp môi trường trong nhà, lọc không khí tốt', 
    'from-lime-400 to-lime-600', 
    'bg-lime-50'
  ),
  (
    'Cây Ngoài Trời', 
    'cay-ngoai-troi', 
    'TreePine', 
    'Cây chịu nắng, chịu mưa, phù hợp sân vườn', 
    'from-teal-400 to-teal-600', 
    'bg-teal-50'
  ),
  (
    'Cây Sen Đá', 
    'cay-sen-da', 
    'Flower', 
    'Cây mini xinh xắn, dễ chăm sóc, ít tốn nước', 
    'from-cyan-400 to-cyan-600', 
    'bg-cyan-50'
  ),
  (
    'Cây Nhiệt Đới', 
    'cay-nhiet-doi', 
    'Palmtree', 
    'Cây nhiệt đới độc đáo, tạo không gian xanh mát', 
    'from-emerald-500 to-emerald-700', 
    'bg-emerald-50'
  ),
  (
    'Cây Phong Thủy',
    'cay-phong-thuy',
    'Sparkles',
    'Mang lại may mắn, tài lộc và bình an',
    'from-yellow-400 to-yellow-600',
    'bg-yellow-50'
  ),
  (
    'Cây Lọc Không Khí',
    'cay-loc-khong-khi',
    'Wind',
    'Giúp thanh lọc không khí, loại bỏ độc tố',
    'from-blue-400 to-blue-600',
    'bg-blue-50'
  ),
  (
    'Chậu Cây',
    'chau-cay',
    'Box',
    'Các loại chậu cây đa dạng mẫu mã',
    'from-orange-400 to-orange-600',
    'bg-orange-50'
  ),
  (
    'Phụ Kiện',
    'phu-kien',
    'Tool',
    'Dụng cụ làm vườn và phụ kiện trang trí',
    'from-gray-400 to-gray-600',
    'bg-gray-50'
  ),
  (
    'Đất & Phân Bón',
    'dat-phan-bon',
    'Layers',
    'Đất trồng và phân bón chất lượng cao',
    'from-amber-700 to-amber-900',
    'bg-amber-50'
  );
