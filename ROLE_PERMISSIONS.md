# HR Post-Selection Manager - Role Permissions & Features

## Overview

The HR Post-Selection Manager implements a comprehensive role-based access control (RBAC) system with 5 distinct user roles, each with specific permissions and features.

---

## 1. Super Admin

### Overview
Full system control with access to all features and administrative functions.

### Permissions
- ✅ Manage all users and roles
- ✅ View and manage all candidates
- ✅ Generate and manage offer letters
- ✅ Define salary structures
- ✅ Upload and manage policies
- ✅ View all reports and analytics
- ✅ Configure system settings
- ✅ Access user management module
- ✅ View system logs and audit trails

### Features
- **User Management**
  - Create, edit, delete users
  - Assign roles to users
  - Reset user passwords
  - View user activity logs

- **Candidate Management**
  - Add, edit, delete candidates
  - View all candidate information
  - Update candidate status
  - Submit and review feedback

- **Offer Letters**
  - Generate offer letters
  - Send offers via email
  - Track offer acceptance
  - Manage offer versions

- **Salary Structure**
  - Define salary structures
  - Calculate CTC and deductions
  - Create salary templates

- **Policies**
  - Upload policies
  - Manage policy versions
  - View acknowledgments

- **Dashboard**
  - View all system statistics
  - Access all modules
  - View system overview

### Modules Accessible
- Dashboard
- Candidates
- Feedback
- Offers
- Salary
- Policies
- Onboarding
- Induction
- Reports
- Users
- Communications

---

## 2. HR Manager

### Overview
Manages post-selection HR processes including offers, salary, policies, and onboarding.

### Permissions
- ✅ Generate and send offer letters
- ✅ Define salary structures
- ✅ Upload and manage policies
- ✅ Schedule induction sessions
- ✅ View candidate feedback
- ✅ View reports and analytics
- ✅ Manage onboarding checklists
- ✅ View all candidates
- ✅ Send communications

### Features
- **Offer Letters**
  - Generate offer letters for selected candidates
  - Send offers via email
  - Track offer acceptance/rejection
  - Manage offer versions

- **Salary Structure**
  - Define salary for selected candidates
  - Calculate Gross, Net, and Annual CTC
  - Create salary templates
  - View salary history

- **Policies**
  - Upload company policies
  - Manage policy categories
  - Track employee acknowledgments
  - Manage policy versions

- **Onboarding**
  - Create onboarding checklists
  - Assign onboarding tasks
  - Track onboarding progress
  - Manage documents

- **Induction**
  - Schedule induction sessions
  - Set venue/Zoom links
  - Create agenda
  - Track attendance

- **Communications**
  - Send emails to candidates
  - Send SMS notifications
  - Create communication templates
  - View communication logs

### Modules Accessible
- Dashboard
- Candidates (View only)
- Feedback (View only)
- Offers
- Salary
- Policies
- Onboarding
- Induction
- Reports
- Communications

---

## 3. Recruiter

### Overview
Manages candidate pipeline and feedback collection from interviews.

### Permissions
- ✅ Add and manage candidates
- ✅ Submit and update feedback
- ✅ Change candidate hiring status
- ✅ View offer letters
- ✅ View reports
- ✅ Update candidate information

### Features
- **Candidate Management**
  - Add new candidates
  - Edit candidate information
  - Update hiring status
  - View candidate profiles
  - Filter candidates by status

- **Feedback Management**
  - Submit interview feedback
  - Rate technical skills (1-5)
  - Rate behavioral skills (1-5)
  - Add comments and observations
  - Make Go/No-Go decisions
  - Update feedback

- **Candidate Pipeline**
  - View all candidates
  - Track candidate progress
  - Update status through pipeline
  - View feedback history

- **Offers**
  - View generated offers
  - Track offer status
  - View offer acceptance

- **Reports**
  - View hiring reports
  - View candidate statistics
  - View feedback summary

### Modules Accessible
- Dashboard
- Candidates
- Feedback
- Offers (View only)
- Reports

---

## 4. Interviewer

### Overview
Limited access for interview feedback collection and comments.

### Permissions
- ✅ View candidate profiles
- ✅ View existing feedback
- ✅ Add comments to feedback
- ✅ Limited access to candidate pipeline

### Features
- **Candidate Viewing**
  - View candidate profiles
  - View candidate details
  - See application history

- **Feedback**
  - View existing feedback
  - Add comments to feedback
  - Rate candidates (if allowed)
  - View other interviewer's feedback

- **Limited Pipeline Access**
  - View candidate list
  - See candidate status
  - View feedback history

### Modules Accessible
- Dashboard
- Candidates (View only)
- Feedback (View & Comment only)

### Restrictions
- Cannot add new candidates
- Cannot change candidate status
- Cannot generate offers
- Cannot access salary or policies
- Cannot access reports
- Cannot manage users

---

## 5. Candidate (External)

### Overview
External portal access for candidates to view offers and acknowledge policies.

### Permissions
- ✅ View own profile
- ✅ View offer letters
- ✅ Accept or decline offers
- ✅ Acknowledge company policies
- ✅ Receive email/SMS notifications
- ✅ View communications

### Features
- **Profile**
  - View own profile information
  - View application status
  - See interview feedback (if shared)

- **Offers**
  - View offer letters
  - Download offer as PDF
  - Accept offer
  - Decline offer
  - Track offer status

- **Policies**
  - View company policies
  - Acknowledge policies
  - Download policies
  - View acknowledgment history

- **Communications**
  - Receive email notifications
  - Receive SMS notifications
  - View message history
  - Track important updates

### Modules Accessible
- My Profile
- My Offers
- My Policies
- My Communications

### Restrictions
- Cannot view other candidates
- Cannot submit feedback
- Cannot manage any data
- Cannot access admin features
- Cannot view reports
- Cannot manage users

---

## Permission Matrix

| Feature | Super Admin | HR Manager | Recruiter | Interviewer | Candidate |
|---------|:-----------:|:----------:|:---------:|:-----------:|:---------:|
| Manage Users | ✅ | ❌ | ❌ | ❌ | ❌ |
| Add Candidates | ✅ | ❌ | ✅ | ❌ | ❌ |
| View Candidates | ✅ | ✅ | ✅ | ✅ | ✅ (Own) |
| Submit Feedback | ✅ | ❌ | ✅ | ✅ (Comments) | ❌ |
| Generate Offers | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Offers | ✅ | ✅ | ✅ | ❌ | ✅ (Own) |
| Accept/Decline Offers | ✅ | ❌ | ❌ | ❌ | ✅ |
| Define Salary | ✅ | ✅ | ❌ | ❌ | ❌ |
| Upload Policies | ✅ | ✅ | ❌ | ❌ | ❌ |
| Acknowledge Policies | ✅ | ❌ | ❌ | ❌ | ✅ |
| Schedule Induction | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Reports | ✅ | ✅ | ✅ | ❌ | ❌ |
| Send Communications | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## Default Credentials

### Super Admin
- **Email:** admin@hr.com
- **Password:** admin123
- **Role:** Super Admin

### Sample Users (Create via User Management)

#### HR Manager
- **Email:** hrmanager@hr.com
- **Role:** HR Manager

#### Recruiter
- **Email:** recruiter@hr.com
- **Role:** Recruiter

#### Interviewer
- **Email:** interviewer@hr.com
- **Role:** Interviewer

#### Candidate
- **Email:** candidate@example.com
- **Role:** Candidate

---

## Role-Based Dashboard

Each role has a customized dashboard showing relevant statistics:

### Super Admin Dashboard
- Total Users
- Total Candidates
- System Overview
- All Recent Activities

### HR Manager Dashboard
- Offers Generated
- Offers Accepted
- Total Candidates
- Pending Tasks

### Recruiter Dashboard
- Pending Feedback
- Selected Candidates
- Total Candidates
- Recent Activities

### Interviewer Dashboard
- Pending Feedback
- Candidate Count
- Feedback History

### Candidate Dashboard
- Application Status
- Offer Status
- Pending Policies
- Messages

---

## Access Control Implementation

### Authentication
- JWT-based token authentication
- Secure password hashing with bcryptjs
- Session management

### Authorization
- Role-based access control (RBAC)
- Permission checking on every action
- Module-level access restrictions
- Feature-level permission validation

### Security
- Password encryption
- HTTPS for all communications
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

---

## Best Practices

1. **Least Privilege:** Users get minimum permissions needed for their role
2. **Separation of Duties:** Different roles handle different responsibilities
3. **Audit Trail:** All actions are logged for compliance
4. **Regular Review:** Permissions should be reviewed periodically
5. **Password Policy:** Strong passwords required for all users
6. **Session Timeout:** Automatic logout after inactivity

---

## Workflow Examples

### Candidate Hiring Workflow
1. **Recruiter** adds candidate to pipeline
2. **Recruiter** updates status through interview rounds
3. **Interviewer** adds feedback and comments
4. **Recruiter** submits final feedback
5. **HR Manager** generates offer letter
6. **HR Manager** sends offer via email
7. **Candidate** receives offer and accepts/declines
8. **HR Manager** creates salary structure
9. **HR Manager** schedules induction
10. **HR Manager** uploads policies
11. **Candidate** acknowledges policies

### User Management Workflow
1. **Super Admin** creates new user
2. **Super Admin** assigns role
3. **Super Admin** sets department
4. User receives login credentials
5. User logs in and changes password
6. User accesses modules based on role

---

## Troubleshooting

### User Cannot Access Module
- Check user role in User Management
- Verify role has permission for module
- Clear browser cache and login again

### Permission Denied Error
- Verify user role
- Check if role has permission for action
- Contact Super Admin to update permissions

### Offer Not Visible to Candidate
- Verify offer was sent to candidate email
- Check if candidate is logged in
- Verify candidate email matches

---

## Support

For role-related issues or permission changes, contact your Super Admin or HR Manager.

---

**Version:** 1.0.0  
**Last Updated:** April 2026
