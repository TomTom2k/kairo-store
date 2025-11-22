#!/bin/bash

# Script to setup Supabase Storage bucket and policies
# This script will create the product-images bucket and configure access policies

echo "🔄 Setting up Supabase Storage bucket..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please create .env.local with your Supabase credentials"
    exit 1
fi

# Load environment variables
source .env.local

# Check if required variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: Missing Supabase credentials"
    echo "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    exit 1
fi

# Read migration file
MIGRATION_FILE="supabase/migrations/003_setup_storage_bucket.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Error: Migration file not found: $MIGRATION_FILE"
    exit 1
fi

MIGRATION_SQL=$(cat "$MIGRATION_FILE")

# Execute migration using Supabase REST API
echo "Creating bucket and setting up policies..."
curl -X POST "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$MIGRATION_SQL" | jq -Rs .)}"

echo ""
echo "✅ Storage bucket setup completed!"
echo ""
echo "Next steps:"
echo "1. Verify the bucket in Supabase Dashboard → Storage"
echo "2. Test image upload in your application"
echo "3. Check that images are publicly accessible"
