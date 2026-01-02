# QuickBox - Quick Start Guide

## 🚀 Quick Start with Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Git

### Steps

1. **Clone and Setup**
   ```bash
   git clone <your-repo-url>
   cd quickbox-angular
   cp env.example .env
   ```

2. **Configure Environment** (Edit `.env` file)
   ```env
   DB_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   API_URL=http://localhost:8080/api
   ```

3. **Start Everything**
   ```bash
   docker-compose up -d
   ```

4. **Access Application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080/api
   - Database: localhost:3306

5. **Default Admin Credentials**
   - Email: `admin@quickbox.com`
   - Password: `admin123` (⚠️ Change this immediately!)

## 📋 Manual Setup

### Backend (Spring Boot)

1. **Setup MySQL**
   - See [SETUP_MYSQL.md](./SETUP_MYSQL.md)

2. **Configure Database**
   - Edit `backend/application.properties`
   - Set database connection details

3. **Run Backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

### Frontend (Angular)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL**
   - Edit `src/environments/environment.ts` for development
   - Edit `src/environments/environment.prod.ts` for production

3. **Run Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build:prod
   ```

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [SETUP_MYSQL.md](./SETUP_MYSQL.md) - MySQL setup instructions
- [IMAGE_UPLOAD_USAGE.md](./IMAGE_UPLOAD_USAGE.md) - Image upload component guide

## 🔧 Common Commands

```bash
# Docker
docker-compose up -d          # Start all services
docker-compose down           # Stop all services
docker-compose logs -f        # View logs
docker-compose ps             # Check status

# Database
docker exec -it quickbox-mysql mysql -u root -p
./scripts/backup-db.sh        # Backup database

# Frontend
npm start                     # Development server
npm run build:prod           # Production build
npm test                     # Run tests
```

## 🐛 Troubleshooting

### Database Connection Issues
- Check MySQL is running: `docker ps`
- Verify credentials in `.env`
- Check logs: `docker-compose logs mysql`

### Backend Issues
- Check logs: `docker-compose logs backend`
- Verify database connection
- Check JWT secret configuration

### Frontend Issues
- Verify API URL in environment files
- Check browser console
- Ensure backend is running

## 📞 Support

For detailed information, see the full documentation files.
