#!/bin/bash

# Script to run the admin_users table migration
# This creates the admin_users table for database-managed authentication

echo "🔄 Running database migration: Create admin_users table..."
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
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL"
    echo "Please set NEXT_PUBLIC_SUPABASE_URL in .env.local"
    exit 1
fi

# Migration file
MIGRATION_FILE="supabase/migrations/013_create_admin_users.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Error: Migration file not found: $MIGRATION_FILE"
    exit 1
fi

echo "📋 Migration file: $MIGRATION_FILE"
echo "🌐 Supabase URL: $NEXT_PUBLIC_SUPABASE_URL"
echo ""
echo "Please run this SQL in your Supabase SQL Editor:"
echo "---------------------------------------------------"
cat "$MIGRATION_FILE"
echo "---------------------------------------------------"
echo ""
echo "✅ After running the migration, you can login with:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "⚠️  IMPORTANT: Change the default password after first login!"
