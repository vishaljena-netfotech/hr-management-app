# HR Post-Selection Manager - User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Super Admin Guide](#super-admin-guide)
3. [HR Manager Guide](#hr-manager-guide)
4. [Recruiter Guide](#recruiter-guide)
5. [Interviewer Guide](#interviewer-guide)
6. [Candidate Guide](#candidate-guide)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### System Requirements

- **Browser:** Chrome, Firefox, Safari, or Edge (latest version)
- **Internet:** Stable internet connection
- **Screen Resolution:** Minimum 1024x768

### Login Process

1. Open the HR Post-Selection Manager application
2. Enter your email address
3. Enter your password
4. Click "Login"
5. You will be redirected to your role-specific dashboard

### Resetting Password

1. Click "Forgot Password" on login page
2. Enter your email address
3. Check your email for password reset link
4. Follow the link and create a new password
5. Login with new password

---

## Super Admin Guide

### Overview

As a Super Admin, you have full control over the system. You can manage users, view all data, and configure system settings.

### Dashboard

Your dashboard displays:
- Total Users count
- Total Candidates count
- System Overview
- Recent Activities
- Quick access links

### User Management

#### Adding a New User

1. Navigate to **Users** module
2. Click **"Add User"** button
3. Fill in the following details:
   - **Full Name:** Enter user's full name
   - **Email:** Enter unique email address
   - **Role:** Select from dropdown (Super Admin, HR Manager, Recruiter, Interviewer, Candidate)
   - **Department:** Select department
   - **Phone:** Enter phone number
4. Click **"Create User"**
5. System generates temporary password
6. Share credentials with user
7. User should change password on first login

#### Editing User Information

1. Go to **Users** module
2. Find user in the list
3. Click **"Edit"** button
4. Modify required fields
5. Click **"Save Changes"**

#### Deactivating a User

1. Go to **Users** module
2. Find user in the list
3. Click **"Deactivate"** button
4. Confirm action
5. User cannot login after deactivation

#### Resetting User Password

1. Go to **Users** module
2. Find user in the list
3. Click **"Reset Password"** button
4. System generates new temporary password
5. Share with user
6. User must change password on next login

### Viewing Reports

1. Navigate to **Reports** module
2. Select report type:
   - **Hiring Pipeline:** View candidate progress
   - **Feedback Summary:** View all feedback submitted
   - **Offer Status:** Track offer acceptance
   - **User Activity:** View user actions
3. Apply filters if needed
4. Click **"Export"** to download as PDF/Excel

### System Configuration

1. Navigate to **Settings** (if available)
2. Configure:
   - Email settings
   - SMS gateway credentials
   - System notifications
   - Data retention policies
3. Click **"Save Settings"**

---

## HR Manager Guide

### Overview

As an HR Manager, you manage post-selection processes including offers, salary, policies, and onboarding.

### Dashboard

Your dashboard shows:
- Offers Generated count
- Offers Accepted count
- Total Candidates
- Pending Tasks
- Quick links to main modules

### Generating Offer Letters

#### Creating an Offer Letter

1. Navigate to **Offer Letters** module
2. Click **"Generate Offer"** button
3. Select candidate from dropdown (only "Selected" candidates appear)
4. Fill in offer details:
   - **Hiring Type:** Full-time, Contract, Intern, etc.
   - **Joining Date:** Select date
   - **Reporting Manager:** Enter name
   - **Department:** Select department
   - **Location:** Enter location
5. Review offer preview
6. Click **"Generate Offer"**
7. Offer is created and ready to send

#### Sending Offer Letter

1. Go to **Offer Letters** module
2. Find offer in the list
3. Click **"Send"** button
4. Select communication method:
   - **Email:** Send via email
   - **Email + SMS:** Send both
5. Review recipient details
6. Click **"Send"**
7. Candidate receives offer notification

#### Tracking Offer Status

1. Go to **Offer Letters** module
2. View status column:
   - **Pending:** Waiting for candidate response
   - **Accepted:** Candidate accepted
   - **Declined:** Candidate declined
3. Click offer to view details and history

### Defining Salary Structures

#### Creating Salary Structure

1. Navigate to **Salary Structure** module
2. Click **"Add Salary Structure"** button
3. Select candidate (only "Selected" candidates)
4. Enter earnings:
   - **Basic Salary:** Monthly basic amount
   - **HRA:** House Rent Allowance
   - **DA:** Dearness Allowance
   - **Special Allowance:** Any other allowance
5. Enter deductions:
   - **PF:** Provident Fund
   - **ESI:** Employee State Insurance
   - **TDS:** Tax Deducted at Source
   - **Professional Tax:** Professional tax
6. System automatically calculates:
   - **Gross Salary:** Total earnings
   - **Net Salary:** Gross minus deductions
   - **Annual CTC:** Gross × 12
7. Click **"Create Salary Structure"**

#### Viewing Salary Details

1. Go to **Salary Structure** module
2. Find salary in the list
3. Click **"View"** to see detailed breakdown
4. Export as PDF if needed

### Managing Policies

#### Uploading Policies

1. Navigate to **Policies** module
2. Click **"Upload Policy"** button
3. Fill in details:
   - **Policy Title:** Name of policy
   - **Category:** Select category (Code of Conduct, Leave Policy, etc.)
   - **Description:** Brief description
   - **File:** Upload PDF/Document
4. Click **"Upload"**
5. Policy is now available for candidates

#### Tracking Policy Acknowledgments

1. Go to **Policies** module
2. Click on policy to view details
3. See list of candidates who acknowledged
4. View acknowledgment date and time
5. Export acknowledgment report if needed

### Scheduling Induction

#### Creating Induction Session

1. Navigate to **Induction** module
2. Click **"Schedule Induction"** button
3. Fill in details:
   - **Candidates:** Select multiple candidates
   - **Date:** Select induction date
   - **Time:** Select start time
   - **Venue/Link:** Enter location or Zoom link
   - **Agenda:** Describe agenda
   - **Facilitator:** Enter facilitator name
4. Click **"Schedule"**
5. Candidates receive notification

#### Managing Induction Attendance

1. Go to **Induction** module
2. Find induction session
3. Click **"Mark Attendance"**
4. Check/uncheck candidates as they arrive
5. Click **"Save Attendance"**

### Sending Communications

#### Sending Email/SMS

1. Navigate to **Communications** module
2. Click **"Send Communication"** button
3. Select recipient candidate
4. Choose communication type (Email or SMS)
5. Select template or write custom message
6. Review message
7. Click **"Send"**
8. Candidate receives notification

#### Using Communication Templates

1. Go to **Communications** module
2. Click **"Save Template"** button
3. Fill in template details:
   - **Template Name:** Give it a descriptive name
   - **Type:** Email or SMS
   - **Subject:** Email subject
   - **Message:** Template content with variables
4. Click **"Save Template"**
5. Template is available for future use

---

## Recruiter Guide

### Overview

As a Recruiter, you manage the candidate pipeline and collect interview feedback.

### Dashboard

Your dashboard shows:
- Pending Feedback count
- Selected Candidates count
- Total Candidates
- Recent activities

### Managing Candidates

#### Adding a New Candidate

1. Navigate to **Candidate Pipeline** module
2. Click **"Add Candidate"** button
3. Fill in candidate details:
   - **Full Name:** Candidate's name
   - **Email:** Email address
   - **Phone:** Contact number
   - **Role:** Position applied for
   - **Source:** Where candidate came from (Portal, Referral, LinkedIn, etc.)
4. Click **"Add Candidate"**
5. Candidate is added to pipeline

#### Updating Candidate Status

1. Go to **Candidate Pipeline** module
2. Find candidate in the list
3. Click status dropdown
4. Select new status:
   - **Applied:** Initial status
   - **Shortlisted:** Selected for interview
   - **HR Round:** Passed HR round
   - **Final Round:** In final round
   - **Feedback Submitted:** Feedback collected
   - **Selected:** Offer ready
   - **Rejected:** Not selected
5. Status updates immediately

#### Viewing Candidate Details

1. Go to **Candidate Pipeline** module
2. Click on candidate name
3. View complete profile:
   - Personal information
   - Application details
   - Interview feedback
   - Status history
   - Communications

### Submitting Feedback

#### Adding Interview Feedback

1. Go to **Candidate Pipeline** module
2. Find candidate
3. Click **"Feedback"** button
4. Fill in feedback form:
   - **Round:** HR or Final
   - **Technical Rating:** Rate 1-5
   - **Behavioral Rating:** Rate 1-5
   - **Decision:** Go or No-Go
   - **Comments:** Detailed feedback
5. Click **"Submit Feedback"**
6. Feedback is recorded

#### Viewing Feedback History

1. Go to **Candidate Pipeline** module
2. Click on candidate name
3. Scroll to "Feedback History" section
4. View all feedback submitted by different interviewers
5. See ratings, comments, and dates

### Filtering and Searching

#### Using Filters

1. Go to **Candidate Pipeline** module
2. Use filter dropdown at top
3. Select status to filter by
4. List updates to show only selected status
5. Click "All Statuses" to reset

#### Searching Candidates

1. Go to **Candidate Pipeline** module
2. Use search box
3. Type candidate name or email
4. Results update in real-time
5. Click on result to view details

---

## Interviewer Guide

### Overview

As an Interviewer, you have limited access to view candidates and add feedback comments.

### Dashboard

Your dashboard shows:
- Pending Feedback count
- Total Candidates
- Quick links

### Viewing Candidates

#### Accessing Candidate List

1. Navigate to **Candidate Pipeline** module
2. View list of all candidates
3. You can view but cannot add or edit candidates
4. Click on candidate to view profile

#### Viewing Candidate Details

1. Go to **Candidate Pipeline** module
2. Click on candidate name
3. View candidate information:
   - Personal details
   - Role applied for
   - Application date
   - Current status
4. You cannot edit candidate information

### Adding Feedback Comments

#### Submitting Feedback

1. Go to **Candidate Pipeline** module
2. Find candidate
3. Click **"Add Comment"** button
4. Fill in feedback form:
   - **Round:** HR or Final
   - **Comments:** Your observations and feedback
5. Click **"Add Comment"**
6. Your comment is added to candidate's feedback

#### Viewing Other Feedback

1. Go to **Candidate Pipeline** module
2. Click on candidate name
3. Scroll to "Feedback History"
4. View all feedback from other interviewers
5. View ratings and comments

### Limitations

As an Interviewer, you cannot:
- Add new candidates
- Change candidate status
- Generate offers
- Access salary or policy information
- View reports
- Manage users
- Send communications

---

## Candidate Guide

### Overview

As a Candidate, you can view your profile, offers, and company policies through the candidate portal.

### Dashboard

Your dashboard shows:
- Your application status
- Pending actions
- Quick links to important sections

### Viewing Your Profile

#### Accessing Your Profile

1. Navigate to **My Profile** section
2. View your information:
   - Name and contact details
   - Position applied for
   - Application date
   - Current status
3. You cannot edit your profile

### Managing Offers

#### Viewing Offer Letters

1. Navigate to **My Offers** section
2. View all offers received
3. For each offer, see:
   - Position and department
   - Joining date
   - Reporting manager
   - Offer status

#### Accepting an Offer

1. Go to **My Offers** section
2. Find offer with "Pending" status
3. Click **"Accept Offer"** button
4. Confirm your acceptance
5. Status changes to "Accepted"
6. You receive confirmation email

#### Declining an Offer

1. Go to **My Offers** section
2. Find offer with "Pending" status
3. Click **"Decline Offer"** button
4. Confirm your decision
5. Status changes to "Declined"
6. You receive confirmation email

#### Downloading Offer

1. Go to **My Offers** section
2. Click **"View PDF"** button
3. Offer opens in new window
4. Click print icon to print
5. Click download icon to save

### Acknowledging Policies

#### Viewing Policies

1. Navigate to **My Policies** section
2. View all company policies
3. Each policy shows:
   - Title
   - Category
   - Description
   - Acknowledgment status

#### Acknowledging a Policy

1. Go to **My Policies** section
2. Find policy with "Not Acknowledged" status
3. Click **"Acknowledge"** button
4. Confirm your acknowledgment
5. Status changes to "Acknowledged"
6. Date and time are recorded

### Receiving Communications

#### Viewing Messages

1. Navigate to **My Communications** section
2. View all emails and SMS received
3. Each message shows:
   - Subject/Content
   - Type (Email or SMS)
   - Date and time received
   - Status

#### Managing Notifications

1. Check your email for offer and policy notifications
2. Check SMS for urgent updates
3. Click links in emails to take action
4. Respond to communications as needed

---

## Common Tasks

### Task 1: Complete Hiring Process for One Candidate

**Timeline:** 1-2 weeks

**Steps:**

1. **Recruiter:** Add candidate to pipeline
2. **Recruiter:** Update status to "HR Round"
3. **Interviewer:** Add feedback comments
4. **Recruiter:** Update status to "Final Round"
5. **Recruiter:** Submit final feedback with Go decision
6. **Recruiter:** Update status to "Selected"
7. **HR Manager:** Generate offer letter
8. **HR Manager:** Send offer to candidate
9. **Candidate:** Accept offer
10. **HR Manager:** Create salary structure
11. **HR Manager:** Send policy documents
12. **Candidate:** Acknowledge policies
13. **HR Manager:** Schedule induction
14. **Candidate:** Confirm induction attendance

### Task 2: Batch Send Offers

**Timeline:** 1 hour

**Steps:**

1. **HR Manager:** Go to Offer Letters module
2. Filter "Selected" candidates without offers
3. For each candidate:
   - Generate offer
   - Send via email
4. Track acceptance status
5. Follow up with non-respondents

### Task 3: Generate Hiring Report

**Timeline:** 30 minutes

**Steps:**

1. **Super Admin/HR Manager:** Go to Reports module
2. Select "Hiring Pipeline" report
3. Choose date range
4. Apply filters (department, role, status)
5. Click "Generate Report"
6. Review statistics
7. Export as PDF/Excel

---

## Troubleshooting

### Login Issues

**Problem:** Cannot login

**Solutions:**
- Verify email address is correct
- Check caps lock is off
- Use "Forgot Password" to reset
- Clear browser cache and cookies
- Try different browser
- Contact Super Admin

**Problem:** Forgot password

**Solutions:**
- Click "Forgot Password" on login page
- Enter email address
- Check email for reset link
- Follow link and create new password
- Login with new password

### Permission Issues

**Problem:** Cannot access a module

**Solutions:**
- Verify your role has permission
- Ask Super Admin to check your role
- Logout and login again
- Clear browser cache
- Try different browser

**Problem:** Cannot perform an action

**Solutions:**
- Check if your role has permission for that action
- Verify you have completed prerequisite steps
- Contact Super Admin if permission needed

### Data Issues

**Problem:** Candidate not appearing in list

**Solutions:**
- Verify candidate was added successfully
- Check if filters are applied
- Search by name or email
- Refresh page
- Contact Super Admin

**Problem:** Offer not received by candidate

**Solutions:**
- Check candidate email address
- Verify offer was sent
- Check spam/junk folder
- Resend offer
- Try SMS instead

### Technical Issues

**Problem:** Page not loading

**Solutions:**
- Refresh page
- Clear browser cache
- Check internet connection
- Try different browser
- Restart application

**Problem:** Slow performance

**Solutions:**
- Close other browser tabs
- Clear browser cache
- Check internet speed
- Restart application
- Contact support

---

## Support & Contact

For technical issues or questions:

1. **Email:** support@hrmanager.com
2. **Phone:** +1-800-HR-HELP
3. **Hours:** Monday-Friday, 9 AM - 6 PM

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | April 2026 | Initial release |

---

**Last Updated:** April 2026

**Document Version:** 1.0.0
