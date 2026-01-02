# QuickBox Deployment Guide

This guide covers deploying the QuickBox application with MySQL database.

## Prerequisites

- Docker and Docker Compose installed
- MySQL 8.0+ (if not using Docker)
- Java 17+ (for backend)
- Node.js 18+ and npm (for frontend development)

## Quick Start with Docker

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd quickbox-angular

# Copy environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

### 2. Configure Environment Variables

Edit `.env` file:

```env
# Database
DB_HOST=mysql
DB_PORT=3306
DB_NAME=quickbox_db
DB_USER=quickbox_user
DB_PASSWORD=your_secure_password
DB_ROOT_PASSWORD=your_root_password

# Backend
BACKEND_PORT=8080
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGINS=http://localhost:4200

# Frontend
FRONTEND_PORT=4200
API_URL=http://localhost:8080/api
```

### 3. Start Services

```bash
# Start all services (MySQL, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Initialize Database

The database will be automatically initialized with the `init.sql` script when MySQL container starts for the first time.

To manually run database scripts:

```bash
# Connect to MySQL container
docker exec -it quickbox-mysql mysql -u root -p

# Or run SQL file
docker exec -i quickbox-mysql mysql -u root -p${DB_ROOT_PASSWORD} quickbox_db < database/init.sql
```

## Manual Deployment

### Backend Setup (Spring Boot)

1. **Configure Database**

   Edit `backend/application.properties` or use environment variables:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/quickbox_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

2. **Build Backend**

   ```bash
   cd backend
   ./mvnw clean package
   # Or with Gradle
   ./gradlew build
   ```

3. **Run Backend**

   ```bash
   java -jar target/quickbox-api-*.jar
   ```

### Frontend Setup (Angular)

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment**

   Edit `src/environments/environment.prod.ts`:

   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://api.yourdomain.com/api'
   };
   ```

3. **Build for Production**

   ```bash
   npm run build -- --configuration production
   ```

4. **Serve with Nginx**

   ```bash
   # Copy built files to nginx
   sudo cp -r dist/quickbox-angular/browser/* /var/www/html/

   # Or use the provided nginx.conf
   sudo cp nginx.conf /etc/nginx/sites-available/quickbox
   sudo ln -s /etc/nginx/sites-available/quickbox /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Database Setup

1. **Create Database**

   ```bash
   mysql -u root -p
   ```

   ```sql
   CREATE DATABASE quickbox_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'quickbox_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON quickbox_db.* TO 'quickbox_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

2. **Run Schema Script**

   ```bash
   mysql -u quickbox_user -p quickbox_db < database/schema.sql
   ```

3. **Initialize Data (Optional)**

   ```bash
   mysql -u quickbox_user -p quickbox_db < database/init.sql
   ```

## Production Deployment

### 1. Security Checklist

- [ ] Change default database passwords
- [ ] Set strong JWT secret
- [ ] Enable SSL/TLS for database connections
- [ ] Configure CORS origins properly
- [ ] Set up firewall rules
- [ ] Enable HTTPS for frontend
- [ ] Configure proper logging
- [ ] Set up backup strategy

### 2. Environment Variables for Production

Create `.env.production`:

```env
DB_HOST=your-production-db-host
DB_PORT=3306
DB_NAME=quickbox_db
DB_USER=quickbox_user
DB_PASSWORD=strong_secure_password
JWT_SECRET=very-strong-random-secret-key
CORS_ORIGINS=https://yourdomain.com
API_URL=https://api.yourdomain.com/api
```

### 3. Docker Production Deployment

```bash
# Build and start with production environment
docker-compose -f docker-compose.yml --env-file .env.production up -d

# Or use docker-compose.prod.yml if you create one
docker-compose -f docker-compose.prod.yml up -d
```

### 4. Database Backup

```bash
# Backup database
docker exec quickbox-mysql mysqldump -u root -p${DB_ROOT_PASSWORD} quickbox_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
docker exec -i quickbox-mysql mysql -u root -p${DB_ROOT_PASSWORD} quickbox_db < backup_file.sql
```

## Monitoring and Maintenance

### Health Checks

- Frontend: `http://localhost:4200/health`
- Backend: `http://localhost:8080/actuator/health` (if actuator is enabled)
- Database: `docker exec quickbox-mysql mysqladmin ping -h localhost -u root -p`

### Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Database Maintenance

```bash
# Connect to database
docker exec -it quickbox-mysql mysql -u root -p

# Check database size
SELECT table_schema AS 'Database', 
       ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'quickbox_db'
GROUP BY table_schema;
```

## Troubleshooting

### Database Connection Issues

1. Check if MySQL is running: `docker ps`
2. Verify credentials in `.env` file
3. Check network connectivity: `docker network ls`
4. View MySQL logs: `docker-compose logs mysql`

### Backend Issues

1. Check backend logs: `docker-compose logs backend`
2. Verify database connection
3. Check JWT secret configuration
4. Verify CORS settings

### Frontend Issues

1. Check if API URL is correct in environment files
2. Verify CORS configuration on backend
3. Check browser console for errors
4. Verify nginx configuration

## Scaling

### Horizontal Scaling

For production, consider:

1. **Load Balancer**: Use Nginx or cloud load balancer
2. **Database Replication**: Set up MySQL master-slave replication
3. **Caching**: Implement Redis for session management
4. **CDN**: Use CDN for static assets

### Example with Load Balancer

```yaml
# docker-compose.scale.yml
services:
  backend:
    deploy:
      replicas: 3
  frontend:
    deploy:
      replicas: 2
```

## Support

For issues or questions, please check:
- Application logs
- Database logs
- Docker logs
- GitHub issues (if applicable)
