# HR Post-Selection Manager - Setup Instructions for Windows

## Quick Start Guide

### Option 1: Using Pre-built Executable (Recommended for End Users)

1. **Download the installer**
   - Download `HR-Post-Selection-Manager-Setup.exe` from the release package

2. **Run the installer**
   - Double-click `HR-Post-Selection-Manager-Setup.exe`
   - Follow the installation wizard
   - Choose installation directory (default: `C:\Program Files\HR Post-Selection Manager`)

3. **Launch the application**
   - After installation, the app will appear in your Start Menu
   - Click "HR Post-Selection Manager" to launch
   - Or double-click the desktop shortcut

4. **First-time login**
   - Email: `admin@hr.com`
   - Password: `admin123`
   - Create additional users through User Management

### Option 2: Running from Source (For Developers)

#### Prerequisites
- **Node.js** (v14 or higher) - Download from https://nodejs.org/
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

#### Installation Steps

1. **Extract the project**
   ```bash
   # Extract the hr-desktop-app folder to your desired location
   # Example: C:\Users\YourName\Documents\hr-desktop-app
   ```

2. **Open Command Prompt or PowerShell**
   ```bash
   # Navigate to the project directory
   cd C:\Users\YourName\Documents\hr-desktop-app
   ```

3. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   
   This may take 5-10 minutes. You'll see progress messages.

4. **Start the application**
   ```bash
   npm start
   ```
   
   The app will:
   - Start the React development server (http://localhost:3000)
   - Launch the Electron desktop window
   - Start the backend server (http://localhost:3001)
   
   Wait 30-60 seconds for everything to load.

5. **Login**
   - Email: `admin@hr.com`
   - Password: `admin123`

### Option 3: Building Your Own Executable

If you want to create a custom Windows installer:

1. **Follow Option 2 steps 1-3**

2. **Build the application**
   ```bash
   npm run build
   ```
   
   This creates an optimized production build.

3. **Create the Windows installer**
   ```bash
   npm run electron-build
   ```
   
   This generates:
   - `dist/HR-Post-Selection-Manager-Setup.exe` - Full installer
   - `dist/HR-Post-Selection-Manager.exe` - Portable version

4. **Share the installer**
   - The `.exe` files in the `dist/` folder can be distributed to other computers
   - No additional setup required on target computers

## System Requirements

| Component | Requirement |
|-----------|------------|
| **OS** | Windows 7 or higher (Windows 10/11 recommended) |
| **RAM** | 2 GB minimum, 4 GB recommended |
| **Disk Space** | 500 MB for installation |
| **Internet** | Required for email/SMS features |

## Features Available

✅ **Fully Functional Modules:**
- Candidate Pipeline Management
- Feedback Collection & Tracking
- Offer Letter Generation
- Salary Structure Definition
- Onboarding Checklists
- Induction Scheduling
- Policy Management
- Reports & Analytics
- User Management

✅ **User Roles:**
- Super Admin
- HR Manager
- Recruiter
- Interviewer
- Candidate (External)

## Default Users

| Email | Password | Role |
|-------|----------|------|
| admin@hr.com | admin123 | Super Admin |

You can create additional users through the User Management module.

## Database Location

The application stores data in a local SQLite database at:
```
C:\Users\[YourUsername]\AppData\Roaming\hr-post-selection-app\hr-app.db
```

**To reset the database:**
1. Close the application
2. Navigate to the above folder
3. Delete `hr-app.db`
4. Restart the application (fresh database will be created)

## Troubleshooting

### Issue: "Port 3000 or 3001 already in use"

**Solution:**
1. Close the application
2. Open Command Prompt and run:
   ```bash
   netstat -ano | findstr :3000
   netstat -ano | findstr :3001
   ```
3. Note the PID (Process ID) from the output
4. Kill the process:
   ```bash
   taskkill /PID [PID_NUMBER] /F
   ```
5. Restart the application

### Issue: "Node.js not found" or "npm not recognized"

**Solution:**
1. Reinstall Node.js from https://nodejs.org/
2. Make sure to check "Add to PATH" during installation
3. Restart Command Prompt/PowerShell
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Issue: Application crashes on startup

**Solution:**
1. Delete the database file (see Database Location above)
2. Delete `node_modules` folder and `package-lock.json`
3. Run:
   ```bash
   npm install --legacy-peer-deps
   npm start
   ```

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Clean install
rm -r node_modules
npm install --legacy-peer-deps
npm start
```

## Common Operations

### Adding a New Candidate
1. Go to **Candidate Pipeline**
2. Click **➕ Add Candidate**
3. Fill in Name, Email, Phone, and Role
4. Click **Add Candidate**

### Submitting Feedback
1. Go to **Candidate Pipeline**
2. Find the candidate in the list
3. Click **📝 Feedback**
4. Fill in Technical Rating, Behavioral Rating, Comments
5. Select Go/No-Go decision
6. Click **Submit Feedback**

### Generating Offer Letter
1. Go to **Offer Letters**
2. Select a candidate with "Feedback Submitted" status
3. Click **📄 Generate Offer**
4. Review and send via email

### Creating Salary Structure
1. Go to **Salary Structure**
2. Enter candidate details
3. Fill in earnings (Basic, HRA, DA, Special Allowance)
4. Fill in deductions (PF, ESI, TDS, Professional Tax)
5. Review calculated Gross, Net, and Annual CTC
6. Click **Save Salary Structure**

### Scheduling Induction
1. Go to **Induction Schedule**
2. Click **➕ Schedule Session**
3. Enter session title, date/time, venue/link, and agenda
4. Click **Schedule Session**

### Uploading Policies
1. Go to **Policies**
2. Click **➕ Upload Policy**
3. Enter policy title and select category
4. Provide file path
5. Click **Upload Policy**

## Performance Tips

1. **Close unnecessary applications** to free up RAM
2. **Keep the database size manageable** - Archive old records periodically
3. **Use Chrome DevTools** (F12) for debugging if needed
4. **Clear browser cache** if experiencing UI issues

## Security Recommendations

1. **Change default password** immediately after first login
2. **Use strong passwords** for all user accounts
3. **Restrict file access** to the database folder
4. **Regular backups** of the database file
5. **Keep Windows updated** for security patches

## Backup & Recovery

### Backing up Data
```bash
# Copy the database file to a safe location
Copy-Item "C:\Users\[YourUsername]\AppData\Roaming\hr-post-selection-app\hr-app.db" -Destination "D:\Backup\hr-app-backup.db"
```

### Restoring Data
```bash
# Close the application first
# Then copy the backup file back
Copy-Item "D:\Backup\hr-app-backup.db" -Destination "C:\Users\[YourUsername]\AppData\Roaming\hr-post-selection-app\hr-app.db"
```

## Getting Help

If you encounter issues:

1. **Check the logs** - Look for error messages in the console (F12)
2. **Review README.md** - Comprehensive documentation
3. **Check database** - Ensure database file exists and is accessible
4. **Restart the application** - Often resolves temporary issues
5. **Reinstall** - As a last resort, uninstall and reinstall the application

## Uninstalling

### From Installer
1. Go to **Control Panel** → **Programs and Features**
2. Find **HR Post-Selection Manager**
3. Click **Uninstall**
4. Follow the uninstall wizard

### Manual Cleanup
```bash
# Delete the application folder
# Delete the database folder
rmdir "C:\Users\[YourUsername]\AppData\Roaming\hr-post-selection-app"
```

## Updates

To update to a newer version:
1. Download the latest installer
2. Run it (it will upgrade the existing installation)
3. Your data will be preserved

## Support

For technical support or feature requests:
- Check the README.md file
- Review the troubleshooting section above
- Contact your IT administrator

---

**Version**: 1.0.0  
**Last Updated**: April 2026  
**Supported OS**: Windows 7, 8, 10, 11
