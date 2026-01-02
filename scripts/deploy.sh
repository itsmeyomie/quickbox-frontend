#!/bin/bash

# QuickBox Deployment Script
# Usage: ./scripts/deploy.sh [environment]
# Example: ./scripts/deploy.sh production

set -e

ENVIRONMENT=${1:-development}

echo "🚀 Starting QuickBox deployment for $ENVIRONMENT environment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your configuration before continuing."
    read -p "Press Enter to continue after editing .env file..."
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

echo "📦 Building Docker images..."
docker-compose build

echo "🗄️  Starting MySQL database..."
docker-compose up -d mysql

echo "⏳ Waiting for MySQL to be ready..."
sleep 10

# Check MySQL health
until docker exec quickbox-mysql mysqladmin ping -h localhost -u root -p${DB_ROOT_PASSWORD:-rootpassword} --silent; do
    echo "⏳ Waiting for MySQL..."
    sleep 2
done

echo "✅ MySQL is ready!"

echo "🗄️  Initializing database..."
if [ -f database/init.sql ]; then
    docker exec -i quickbox-mysql mysql -u root -p${DB_ROOT_PASSWORD:-rootpassword} ${DB_NAME:-quickbox_db} < database/init.sql || echo "⚠️  Database may already be initialized"
fi

echo "🚀 Starting backend and frontend services..."
docker-compose up -d backend frontend

echo "⏳ Waiting for services to start..."
sleep 5

echo "✅ Deployment complete!"
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "🌐 Services are available at:"
echo "   Frontend: http://localhost:${FRONTEND_PORT:-4200}"
echo "   Backend:  http://localhost:${BACKEND_PORT:-8080}"
echo ""
echo "📝 View logs with: docker-compose logs -f"
echo "🛑 Stop services with: docker-compose down"
