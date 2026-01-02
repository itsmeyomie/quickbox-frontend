# MySQL Setup Guide for QuickBox

This guide will help you set up MySQL database for the QuickBox application.

## Option 1: Using Docker (Recommended)

The easiest way to set up MySQL is using Docker Compose:

```bash
# Start MySQL container
docker-compose up -d mysql

# The database will be automatically initialized with init.sql
```

## Option 2: Manual MySQL Installation

### 1. Install MySQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Windows:**
Download and install from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)

### 2. Secure MySQL Installation

```bash
sudo mysql_secure_installation
```

### 3. Create Database and User

```bash
mysql -u root -p
```

```sql
-- Create database
CREATE DATABASE quickbox_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'quickbox_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON quickbox_db.* TO 'quickbox_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SHOW DATABASES;
EXIT;
```

### 4. Initialize Database Schema

```bash
# Run schema script
mysql -u quickbox_user -p quickbox_db < database/schema.sql

# Or run initialization script (includes sample data)
mysql -u quickbox_user -p quickbox_db < database/init.sql
```

### 5. Configure Backend

Update `backend/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quickbox_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=quickbox_user
spring.datasource.password=your_secure_password
```

## Option 3: Using Cloud MySQL (Production)

### AWS RDS

1. Create RDS MySQL instance
2. Configure security groups
3. Update connection string in `backend/application-prod.properties`

### Google Cloud SQL

1. Create Cloud SQL instance
2. Configure authorized networks
3. Update connection string

### Azure Database for MySQL

1. Create Azure MySQL server
2. Configure firewall rules
3. Update connection string

## Connection Testing

### Test Connection from Command Line

```bash
mysql -u quickbox_user -p -h localhost quickbox_db
```

### Test Connection from Backend

The Spring Boot application will automatically test the connection on startup. Check logs for:

```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
```

## Database Maintenance

### Backup Database

```bash
# Using mysqldump
mysqldump -u quickbox_user -p quickbox_db > backup_$(date +%Y%m%d).sql

# Or use the provided script
./scripts/backup-db.sh
```

### Restore Database

```bash
mysql -u quickbox_user -p quickbox_db < backup_file.sql
```

### Check Database Size

```sql
SELECT 
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'quickbox_db'
GROUP BY table_schema;
```

### View Table Sizes

```sql
SELECT 
    table_name AS 'Table',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'quickbox_db'
ORDER BY (data_length + index_length) DESC;
```

## Troubleshooting

### Connection Refused

- Check if MySQL is running: `sudo systemctl status mysql`
- Verify port 3306 is open: `netstat -tuln | grep 3306`
- Check firewall settings

### Access Denied

- Verify username and password
- Check user privileges: `SHOW GRANTS FOR 'quickbox_user'@'localhost';`
- Ensure user can connect from required host

### Character Encoding Issues

- Verify database charset: `SHOW CREATE DATABASE quickbox_db;`
- Ensure tables use utf8mb4: `SHOW CREATE TABLE users;`

### Performance Issues

- Check slow query log
- Analyze table indexes: `SHOW INDEX FROM table_name;`
- Optimize tables: `OPTIMIZE TABLE table_name;`

## Security Best Practices

1. **Use Strong Passwords**: Generate secure passwords for database users
2. **Limit User Privileges**: Only grant necessary permissions
3. **Enable SSL**: Use SSL connections in production
4. **Regular Backups**: Set up automated backup schedule
5. **Monitor Access**: Enable audit logging
6. **Update Regularly**: Keep MySQL updated to latest version

## Next Steps

After setting up MySQL:

1. Update backend configuration files
2. Test database connection
3. Run database migrations (if using Flyway/Liquibase)
4. Start backend application
5. Verify tables are created correctly

For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
