-- Check if password was updated successfully
SELECT 
  username, 
  email,
  LEFT(password_hash, 20) as password_hash_preview,
  is_active,
  last_login_at,
  updated_at
FROM admin_users 
WHERE username = 'admin';

-- Check password reset tokens
SELECT 
  id,
  admin_user_id,
  token,
  used,
  expires_at,
  created_at
FROM password_reset_tokens
ORDER BY created_at DESC
LIMIT 5;
