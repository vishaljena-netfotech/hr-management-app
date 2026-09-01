# 🚀 HR Post-Selection Manager: Complete Setup & Deployment Guide

This guide provides a comprehensive, step-by-step walkthrough for setting up, configuring, and deploying the HR Post-Selection Manager application on your Windows machine.

---

## 📋 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Step 1: Installation](#step-1-installation)
3. [Step 2: Configuration](#step-2-configuration)
4. [Step 3: Running the Application](#step-3-running-the-application)
5. [Step 4: Deployment & Packaging](#step-4-deployment--packaging)
6. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

Before starting, ensure your system meets these requirements:
- **Operating System:** Windows 10 or 11 (64-bit)
- **RAM:** 8GB minimum (16GB recommended)
- **Disk Space:** 2GB free space
- **Tools:** 7-Zip or WinRAR for extraction

---

## Step 1: Installation

### 1.1 Install Node.js
1. Download the **Node.js LTS** installer from [nodejs.org](https://nodejs.org/).
2. Run the installer and follow the prompts.
3. **CRITICAL:** Ensure the "Add to PATH" option is checked.
4. Restart your computer after installation.
5. Verify installation by opening PowerShell and running:
   ```powershell
   node --version
   npm --version
   ```

### 1.2 Extract Project Files
1. Locate the `hr-desktop-app-light.tar.gz` file in your `E:\Manus\Candidate Selection2 Exit\` folder.
2. Right-click the file and select **7-Zip > Extract Here**.
3. This will create a folder named `hr-desktop-app`.

### 1.3 Install Project Dependencies
1. Open PowerShell as Administrator.
2. Navigate to the project folder:
   ```powershell
   cd "E:\Manus\Candidate Selection2 Exit\hr-desktop-app"
   ```
3. Run the installation command:
   ```powershell
   npm install --legacy-peer-deps
   ```
   *Note: You may see several "deprecated" warnings. These are normal and do not affect the application's functionality.*

---

## Step 2: Configuration

### 2.1 Environment Variables
The application comes with a pre-configured `.env` file. You can modify it if needed:
1. Open `.env` in Notepad or VS Code.
2. Key settings:
   - `PORT=3000` (Frontend port)
   - `DB_PATH=./database/hr_system.db` (Database location)
   - `JWT_SECRET=your_secure_secret_key`

### 2.2 Database Setup
The application uses **SQLite**, which is serverless. The database will be automatically initialized on the first run. No manual setup is required.

---

## Step 3: Running the Application

### 3.1 Development Mode
To run the application for testing and development:
1. In your PowerShell window (inside the project folder), run:
   ```powershell
   npm start
   ```
2. The application will launch in an Electron window.
3. **Default Login Credentials:**
   - **Super Admin:** `admin@company.com` / `admin123`
   - **HR Manager:** `hr@company.com` / `hr123`
   - **Recruiter:** `recruiter@company.com` / `recruiter123`

---

## Step 4: Deployment & Packaging

### 4.1 Build for Production
When you are ready to create a standalone Windows application (`.exe`):
1. In PowerShell, run:
   ```powershell
   npm run build
   ```
2. This process will:
   - Optimize and build the React frontend.
   - Package the Electron application into an installer.
3. Once complete, find your installer in the `dist/` folder:
   - `dist/HR Post-Selection Manager Setup 1.1.0.exe`

### 4.2 Portable Version
The build process also generates a portable version in the `dist/` folder that can be run without installation.

---

## Troubleshooting

### Issue: "npm: command not found"
- **Fix:** Node.js is not in your system PATH. Reinstall Node.js and ensure "Add to PATH" is selected, then restart.

### Issue: "ENOENT: no such file or directory"
- **Fix:** Ensure you are in the correct directory (`E:\Manus\Candidate Selection2 Exit\hr-desktop-app`) before running commands.

### Issue: White Screen on Launch
- **Fix:** This usually means the frontend hasn't finished loading. Wait 30 seconds. If it persists, close the app and run `npm start` again.

### Issue: Deprecated Warnings during `npm install`
- **Fix:** These are safe to ignore. They indicate that some sub-dependencies have newer versions available, but the current ones are fully compatible with this application.

---

**Need further help?** Refer to the `USER_GUIDE.md` for functional instructions or contact the development team.
