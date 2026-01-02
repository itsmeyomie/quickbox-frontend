#!/bin/bash

# Database Backup Script
# Usage: ./scripts/backup-db.sh

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/quickbox_db_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

DB_NAME=${DB_NAME:-quickbox_db}
DB_ROOT_PASSWORD=${DB_ROOT_PASSWORD:-rootpassword}

echo "📦 Creating database backup..."

# Check if MySQL container is running
if docker ps | grep -q quickbox-mysql; then
    # Backup from Docker container
    docker exec quickbox-mysql mysqldump -u root -p${DB_ROOT_PASSWORD} ${DB_NAME} > $BACKUP_FILE
    echo "✅ Backup created: $BACKUP_FILE"
else
    echo "❌ MySQL container is not running."
    exit 1
fi

# Compress backup
echo "🗜️  Compressing backup..."
gzip $BACKUP_FILE
echo "✅ Compressed backup: ${BACKUP_FILE}.gz"

# Keep only last 7 backups
echo "🧹 Cleaning old backups (keeping last 7)..."
ls -t ${BACKUP_DIR}/quickbox_db_*.sql.gz | tail -n +8 | xargs -r rm
echo "✅ Backup complete!"
