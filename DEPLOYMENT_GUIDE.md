# HR Post-Selection Manager - Deployment Guide

## Overview

This guide covers deployment of the HR Post-Selection Manager application to production environments on Windows, macOS, and Linux.

---

## Pre-Deployment Checklist

- [ ] All tests passed
- [ ] Code reviewed and approved
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Backups created
- [ ] Rollback plan prepared
- [ ] Stakeholders notified
- [ ] Deployment window scheduled

---

## System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **OS** | Windows 10+, macOS 10.14+, Ubuntu 18.04+ |
| **RAM** | 4 GB |
| **Storage** | 2 GB free space |
| **CPU** | 2 cores minimum |
| **Network** | Stable internet connection |

### Recommended Requirements

| Component | Requirement |
|-----------|-------------|
| **OS** | Windows Server 2019+, macOS 11+, Ubuntu 20.04+ |
| **RAM** | 8 GB |
| **Storage** | 10 GB free space |
| **CPU** | 4 cores |
| **Network** | 100 Mbps connection |

---

## Installation Steps

### Step 1: Install Node.js

#### Windows

1. Download Node.js LTS from https://nodejs.org/
2. Run installer (.msi file)
3. Follow installation wizard
4. Accept default settings
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```

#### macOS

```bash
# Using Homebrew
brew install node

# Verify installation
node --version
npm --version
```

#### Linux (Ubuntu)

```bash
# Update package manager
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Step 2: Clone/Extract Application

```bash
# Extract project files
cd /path/to/hr-desktop-app

# Navigate to project directory
cd hr-desktop-app
```

### Step 3: Install Dependencies

```bash
# Install npm packages
npm install --legacy-peer-deps

# Install Electron for desktop packaging
npm install --save-dev electron
```

### Step 4: Configure Environment

Create `.env` file in project root:

```env
# Database
DATABASE_URL=./data/app.db
DATABASE_BACKUP_PATH=./backups

# Server
PORT=3001
NODE_ENV=production

# JWT
JWT_SECRET=your-secret-key-here-min-32-chars
JWT_EXPIRY=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@hrmanager.com

# SMS Configuration
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Application
APP_NAME=HR Post-Selection Manager
APP_URL=http://localhost:3000
```

### Step 5: Initialize Database

```bash
# Create database
npm run db:init

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

### Step 6: Build Application

```bash
# Build React app
npm run build

# Build Electron app
npm run electron:build
```

---

## Running the Application

### Development Mode

```bash
# Start development server
npm start

# Application opens at http://localhost:3000
```

### Production Mode

#### Windows

```bash
# Run built application
npm run start:prod

# Or run Electron app
npm run electron:start
```

#### macOS/Linux

```bash
# Run built application
npm run start:prod

# Or run Electron app
npm run electron:start
```

---

## Desktop Application Packaging

### Windows Installer

```bash
# Build Windows installer
npm run build:win

# Creates: dist/HR-Post-Selection-Manager-Setup.exe
```

**Installation:**
1. Download installer
2. Double-click to run
3. Follow installation wizard
4. Application installs to Program Files
5. Desktop shortcut created

### macOS Installer

```bash
# Build macOS app
npm run build:mac

# Creates: dist/HR-Post-Selection-Manager.dmg
```

**Installation:**
1. Download DMG file
2. Double-click to mount
3. Drag app to Applications folder
4. Eject DMG
5. Run from Applications

### Linux AppImage

```bash
# Build Linux AppImage
npm run build:linux

# Creates: dist/HR-Post-Selection-Manager.AppImage
```

**Installation:**
1. Download AppImage
2. Make executable: `chmod +x HR-Post-Selection-Manager.AppImage`
3. Run: `./HR-Post-Selection-Manager.AppImage`

---

## Database Setup

### SQLite (Default)

Database file: `./data/app.db`

**Backup database:**

```bash
# Create backup
cp ./data/app.db ./backups/app.db.backup.$(date +%Y%m%d_%H%M%S)

# Restore from backup
cp ./backups/app.db.backup.20260401_120000 ./data/app.db
```

### Database Maintenance

```bash
# Optimize database
npm run db:optimize

# Verify database integrity
npm run db:verify

# Export data
npm run db:export

# Import data
npm run db:import
```

---

## Configuration Management

### Email Setup

1. **Gmail:**
   - Enable 2-factor authentication
   - Generate app-specific password
   - Update SMTP_USER and SMTP_PASSWORD in .env

2. **Office 365:**
   - Use SMTP: smtp.office365.com
   - Port: 587
   - Update credentials in .env

3. **Custom SMTP:**
   - Update SMTP_HOST and SMTP_PORT
   - Provide credentials

### SMS Setup

1. **Twilio:**
   - Create Twilio account
   - Get Account SID and Auth Token
   - Update in .env
   - Verify phone numbers

2. **AWS SNS:**
   - Create AWS account
   - Configure SNS service
   - Update credentials in .env

---

## Security Hardening

### 1. Change Default Credentials

```bash
# Update admin password
npm run admin:password

# Generate new JWT secret
npm run generate:secret
```

### 2. Enable HTTPS

```bash
# Generate SSL certificate
npm run ssl:generate

# Update .env
SSL_ENABLED=true
SSL_CERT_PATH=./certs/server.crt
SSL_KEY_PATH=./certs/server.key
```

### 3. Configure Firewall

```bash
# Allow port 3000 and 3001
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
```

### 4. Regular Backups

```bash
# Create backup script (backup.sh)
#!/bin/bash
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
cp ./data/app.db $BACKUP_DIR/app.db.backup.$TIMESTAMP
gzip $BACKUP_DIR/app.db.backup.$TIMESTAMP

# Schedule daily backup (crontab)
0 2 * * * /path/to/backup.sh
```

---

## Monitoring & Maintenance

### Health Check

```bash
# Check application status
curl http://localhost:3001/api/health

# Expected response:
# {"status":"ok","timestamp":"2026-04-01T12:00:00Z"}
```

### View Logs

```bash
# Application logs
tail -f logs/app.log

# Error logs
tail -f logs/error.log

# Access logs
tail -f logs/access.log
```

### Performance Monitoring

```bash
# Monitor CPU and memory
top

# Monitor disk usage
df -h

# Monitor network
netstat -an
```

---

## Troubleshooting

### Application Won't Start

**Problem:** Port already in use

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=3002
```

**Problem:** Database connection error

**Solution:**
```bash
# Check database file exists
ls -la ./data/app.db

# Reinitialize database
npm run db:init
npm run db:migrate
npm run db:seed
```

### Performance Issues

**Problem:** Slow application

**Solution:**
```bash
# Optimize database
npm run db:optimize

# Clear cache
rm -rf ./cache/*

# Increase Node.js memory
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

### Email Not Sending

**Problem:** Emails not delivered

**Solution:**
- Verify SMTP credentials in .env
- Check firewall allows port 587
- Test email configuration:
  ```bash
  npm run test:email
  ```
- Check email logs:
  ```bash
  tail -f logs/email.log
  ```

---

## Upgrade Procedure

### Before Upgrade

```bash
# Backup current installation
cp -r ./hr-desktop-app ./hr-desktop-app.backup

# Backup database
cp ./data/app.db ./backups/app.db.pre-upgrade
```

### Upgrade Steps

```bash
# Download new version
cd /path/to/new/version

# Install dependencies
npm install --legacy-peer-deps

# Run migrations
npm run db:migrate

# Build application
npm run build

# Start application
npm start
```

### Verify Upgrade

```bash
# Check version
npm run version

# Test all modules
npm run test

# Verify data integrity
npm run db:verify
```

### Rollback if Needed

```bash
# Stop application
npm stop

# Restore backup
cp -r ./hr-desktop-app.backup ./hr-desktop-app
cp ./backups/app.db.pre-upgrade ./data/app.db

# Restart application
npm start
```

---

## Performance Tuning

### Database Optimization

```bash
# Index frequently searched columns
npm run db:index

# Analyze query performance
npm run db:analyze

# Vacuum database
npm run db:vacuum
```

### Application Optimization

```bash
# Enable compression
COMPRESSION_ENABLED=true

# Enable caching
CACHE_ENABLED=true
CACHE_TTL=3600

# Optimize bundle
npm run build:optimize
```

---

## Disaster Recovery

### Backup Strategy

**Daily Backups:**
```bash
# Automated daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

**Weekly Full Backup:**
```bash
# Full backup every Sunday
0 3 * * 0 /path/to/full-backup.sh
```

**Monthly Archive:**
```bash
# Archive monthly on 1st
0 4 1 * * /path/to/archive.sh
```

### Recovery Procedure

```bash
# List available backups
ls -la ./backups/

# Restore from backup
cp ./backups/app.db.backup.20260401_020000 ./data/app.db

# Verify restoration
npm run db:verify

# Restart application
npm start
```

---

## Support & Maintenance

### Regular Maintenance Tasks

| Task | Frequency | Command |
|------|-----------|---------|
| Database optimization | Weekly | `npm run db:optimize` |
| Log rotation | Daily | `npm run logs:rotate` |
| Security updates | Monthly | `npm audit fix` |
| Database backup | Daily | `npm run db:backup` |
| Performance check | Weekly | `npm run perf:check` |

### Support Contacts

- **Technical Support:** support@hrmanager.com
- **Emergency Hotline:** +1-800-HR-HELP
- **Documentation:** https://docs.hrmanager.com

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | April 2026 | Initial release |

---

**Last Updated:** April 2026

**Document Version:** 1.0.0
