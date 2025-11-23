-- Update admin email address
-- Run this in Supabase SQL Editor

UPDATE admin_users 
SET email = 'tramthu96@gmail.com' 
WHERE username = 'admin';

-- Verify the update
SELECT username, email, is_active 
FROM admin_users 
WHERE username = 'admin';
