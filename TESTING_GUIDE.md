# HR Post-Selection Manager - Testing Guide

## Overview

This document provides comprehensive testing guidelines for the HR Post-Selection Manager application across all user roles and features.

---

## Test Environment Setup

### Prerequisites

1. Node.js v14+ installed
2. npm or yarn package manager
3. SQLite3 database
4. Modern web browser (Chrome, Firefox, Safari)
5. Test data prepared

### Starting Test Environment

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Application runs on http://localhost:3000
# Backend API on http://localhost:3001
```

### Test Data Initialization

```bash
# Create test database
npm run db:init

# Seed test data
npm run db:seed
```

---

## Test Scenarios by Role

### 1. Super Admin Testing

#### 1.1 User Management

**Test Case:** Create New User

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as Super Admin | Dashboard loads |
| 2 | Navigate to Users module | User list displays |
| 3 | Click "Add User" button | Add User form opens |
| 4 | Fill all required fields | Form accepts input |
| 5 | Select role from dropdown | Role options display |
| 6 | Click "Create User" | User created, confirmation shown |
| 7 | Verify in user list | New user appears in list |

**Test Case:** Edit User Information

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Users module | User list displays |
| 2 | Click "Edit" on a user | Edit form opens |
| 3 | Modify user details | Form updates |
| 4 | Click "Save Changes" | Changes saved, confirmation shown |
| 5 | Verify changes | User list reflects changes |

**Test Case:** Reset User Password

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Users module | User list displays |
| 2 | Click "Reset Password" | Confirmation dialog appears |
| 3 | Confirm action | Password reset, new password shown |
| 4 | Share credentials with user | User receives credentials |
| 5 | User logs in with new password | Login successful |

#### 1.2 Dashboard Access

**Test Case:** View System Statistics

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as Super Admin | Dashboard loads |
| 2 | View stat cards | All stats display correctly |
| 3 | Verify total users count | Count matches database |
| 4 | Verify total candidates count | Count matches database |
| 5 | View recent activities | Activities list shows recent actions |

#### 1.3 Module Access

**Test Case:** Access All Modules

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as Super Admin | Dashboard loads |
| 2 | Click each module in sidebar | Module loads successfully |
| 3 | Verify data displays | Data shows correctly |
| 4 | Test navigation | Can navigate between modules |

---

### 2. HR Manager Testing

#### 2.1 Offer Letter Generation

**Test Case:** Generate Offer Letter

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as HR Manager | Dashboard loads |
| 2 | Navigate to Offer Letters | Offer list displays |
| 3 | Click "Generate Offer" | Offer form opens |
| 4 | Select "Selected" candidate | Only selected candidates appear |
| 5 | Fill offer details | Form accepts input |
| 6 | Click "Generate" | Offer created, confirmation shown |
| 7 | Verify in list | New offer appears in list |

**Test Case:** Send Offer Letter

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Offer Letters | Offer list displays |
| 2 | Find offer with "Pending" status | Offer visible in list |
| 3 | Click "Send" button | Send options appear |
| 4 | Select Email option | Email form displays |
| 5 | Click "Send" | Email sent, confirmation shown |
| 6 | Verify status changes | Status updates to "Sent" |

**Test Case:** Track Offer Acceptance

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Offer Letters | Offer list displays |
| 2 | View status column | Status shows current state |
| 3 | Click offer to view details | Offer details display |
| 4 | Check acceptance history | History shows candidate action |

#### 2.2 Salary Structure

**Test Case:** Create Salary Structure

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Salary Structure | Salary list displays |
| 2 | Click "Add Salary Structure" | Form opens |
| 3 | Select candidate | Only selected candidates appear |
| 4 | Enter earnings (Basic, HRA, DA, etc.) | Form accepts numeric input |
| 5 | Enter deductions (PF, ESI, TDS, etc.) | Form accepts numeric input |
| 6 | Verify calculations | Gross, Net, CTC calculate correctly |
| 7 | Click "Create" | Salary created, confirmation shown |

**Test Case:** Verify Salary Calculations

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Create salary with known values | Salary created |
| 2 | Basic: 50000, HRA: 10000, DA: 5000 | Values entered |
| 3 | PF: 5000, ESI: 1000 | Deductions entered |
| 4 | Verify Gross = 65000 | Calculation correct |
| 5 | Verify Net = 59000 | Calculation correct |
| 6 | Verify CTC = 780000 | Calculation correct |

#### 2.3 Policy Management

**Test Case:** Upload Policy

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Policies | Policy list displays |
| 2 | Click "Upload Policy" | Upload form opens |
| 3 | Enter policy title | Form accepts input |
| 4 | Select category | Categories display |
| 5 | Enter description | Form accepts input |
| 6 | Upload PDF file | File accepted |
| 7 | Click "Upload" | Policy uploaded, confirmation shown |

**Test Case:** Track Policy Acknowledgments

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Policies | Policy list displays |
| 2 | Click on policy | Policy details display |
| 3 | View acknowledgments section | Candidate list shows |
| 4 | See acknowledgment dates | Dates display correctly |

#### 2.4 Communications

**Test Case:** Send Email Communication

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Communications | Communication list displays |
| 2 | Click "Send Communication" | Send form opens |
| 3 | Select candidate | Candidates list displays |
| 4 | Select Email type | Email option selected |
| 5 | Enter subject and message | Form accepts input |
| 6 | Click "Send" | Email sent, confirmation shown |
| 7 | Verify in history | Communication appears in list |

**Test Case:** Use Communication Template

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Communications | Communication list displays |
| 2 | Click "Send Communication" | Send form opens |
| 3 | Select template | Templates list displays |
| 4 | Click template | Template loads into form |
| 5 | Modify if needed | Form allows editing |
| 6 | Send communication | Sent successfully |

---

### 3. Recruiter Testing

#### 3.1 Candidate Management

**Test Case:** Add New Candidate

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as Recruiter | Dashboard loads |
| 2 | Navigate to Candidate Pipeline | Candidate list displays |
| 3 | Click "Add Candidate" | Add form opens |
| 4 | Fill candidate details | Form accepts input |
| 5 | Select source | Source options display |
| 6 | Click "Add Candidate" | Candidate added, confirmation shown |
| 7 | Verify in list | New candidate appears |

**Test Case:** Update Candidate Status

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Find candidate | Candidate visible |
| 3 | Click status dropdown | Status options display |
| 4 | Select new status | Status updates |
| 5 | Verify change | List reflects new status |

#### 3.2 Feedback Management

**Test Case:** Submit Interview Feedback

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Find candidate | Candidate visible |
| 3 | Click "Feedback" button | Feedback form opens |
| 4 | Select round (HR/Final) | Round selected |
| 5 | Rate technical skills (1-5) | Rating accepted |
| 6 | Rate behavioral skills (1-5) | Rating accepted |
| 7 | Select decision (Go/No-Go) | Decision selected |
| 8 | Add comments | Comments accepted |
| 9 | Click "Submit" | Feedback submitted, confirmation shown |

**Test Case:** View Feedback History

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Click on candidate name | Candidate details display |
| 3 | Scroll to feedback section | Feedback history displays |
| 4 | View all feedback entries | All feedback visible |
| 5 | See ratings and comments | Data displays correctly |

#### 3.3 Filtering and Search

**Test Case:** Filter by Status

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Click filter dropdown | Status options display |
| 3 | Select "HR Round" | List filters to HR Round candidates |
| 4 | Select different status | List updates |
| 5 | Select "All Statuses" | All candidates display |

**Test Case:** Search Candidate

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Click search box | Search box active |
| 3 | Type candidate name | Results update in real-time |
| 4 | Type email address | Correct candidate appears |
| 5 | Clear search | All candidates display |

---

### 4. Interviewer Testing

#### 4.1 Limited Access Verification

**Test Case:** Cannot Add Candidate

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as Interviewer | Dashboard loads |
| 2 | Navigate to Candidate Pipeline | Candidate list displays |
| 3 | Look for "Add Candidate" button | Button not visible |
| 4 | Verify no add option | Cannot add candidates |

**Test Case:** Cannot Change Status

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Look for status dropdown | Dropdown not visible |
| 3 | Verify no status change option | Cannot change status |

#### 4.2 Feedback Comments

**Test Case:** Add Feedback Comment

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Find candidate | Candidate visible |
| 3 | Click "Add Comment" button | Comment form opens |
| 4 | Enter comment | Form accepts input |
| 5 | Click "Add Comment" | Comment added, confirmation shown |

**Test Case:** View Other Feedback

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to Candidate Pipeline | Candidate list displays |
| 2 | Click on candidate | Candidate details display |
| 3 | View feedback section | All feedback visible |
| 4 | See other interviewer's feedback | Feedback displays |

---

### 5. Candidate Testing

#### 5.1 Profile Access

**Test Case:** View Own Profile

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as Candidate | Dashboard loads |
| 2 | Navigate to "My Profile" | Profile displays |
| 3 | View personal information | Information correct |
| 4 | View application status | Status displays |

#### 5.2 Offer Management

**Test Case:** View and Accept Offer

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to "My Offers" | Offer list displays |
| 2 | View offer details | Offer information shows |
| 3 | Click "Accept Offer" | Confirmation dialog appears |
| 4 | Confirm acceptance | Status changes to "Accepted" |
| 5 | Receive confirmation email | Email arrives |

**Test Case:** Decline Offer

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to "My Offers" | Offer list displays |
| 2 | Find pending offer | Offer visible |
| 3 | Click "Decline Offer" | Confirmation dialog appears |
| 4 | Confirm decline | Status changes to "Declined" |
| 5 | Receive confirmation email | Email arrives |

**Test Case:** Download Offer PDF

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to "My Offers" | Offer list displays |
| 2 | Click "View PDF" | PDF opens in new window |
| 3 | Verify PDF content | Offer details display correctly |
| 4 | Print PDF | Print dialog appears |
| 5 | Download PDF | File downloads |

#### 5.3 Policy Acknowledgment

**Test Case:** Acknowledge Policy

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to "My Policies" | Policy list displays |
| 2 | Find unacknowledged policy | Policy visible |
| 3 | Click "Acknowledge" | Confirmation dialog appears |
| 4 | Confirm acknowledgment | Status changes to "Acknowledged" |
| 5 | Verify date recorded | Acknowledgment date displays |

---

## Cross-Role Testing

### Test Case: Complete Hiring Workflow

**Scenario:** Hire one candidate from application to onboarding

| Step | Actor | Action | Expected Result |
|------|-------|--------|-----------------|
| 1 | Recruiter | Add candidate | Candidate appears in pipeline |
| 2 | Recruiter | Update to "HR Round" | Status updates |
| 3 | Interviewer | Add feedback | Feedback recorded |
| 4 | Recruiter | Update to "Final Round" | Status updates |
| 5 | Recruiter | Submit final feedback | Feedback recorded |
| 6 | Recruiter | Update to "Selected" | Status updates |
| 7 | HR Manager | Generate offer | Offer created |
| 8 | HR Manager | Send offer | Offer sent to candidate |
| 9 | Candidate | Accept offer | Offer accepted |
| 10 | HR Manager | Create salary | Salary structure created |
| 11 | HR Manager | Send policies | Policies sent |
| 12 | Candidate | Acknowledge policies | Policies acknowledged |
| 13 | HR Manager | Schedule induction | Induction scheduled |
| 14 | Candidate | View induction | Induction visible |

---

## Performance Testing

### Test Case: Bulk Operations

**Scenario:** Add 100 candidates and verify performance

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare 100 candidate records | Data ready |
| 2 | Bulk import candidates | Import completes in < 5 seconds |
| 3 | Load candidate list | List loads in < 2 seconds |
| 4 | Search candidate | Search results in < 1 second |
| 5 | Filter candidates | Filter results in < 1 second |

---

## Security Testing

### Test Case: Role-Based Access Control

**Scenario:** Verify users cannot access unauthorized modules

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as Recruiter | Dashboard loads |
| 2 | Try to access Users module | Access denied or module hidden |
| 3 | Try to access Salary module | Access denied or module hidden |
| 4 | Try to access Policies module | Access denied or module hidden |
| 5 | Verify only authorized modules visible | Correct modules display |

### Test Case: Password Security

**Scenario:** Verify password requirements

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Try weak password | Password rejected |
| 2 | Try password with special chars | Password accepted |
| 3 | Verify password encrypted in database | Password not readable |

---

## Bug Reporting Template

When reporting bugs, use this format:

```
Title: [Brief description]

Severity: [Critical/High/Medium/Low]

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [etc.]

Expected Result:
[What should happen]

Actual Result:
[What actually happened]

Screenshots/Logs:
[Attach relevant files]

Browser/Environment:
[Browser version, OS, etc.]
```

---

## Test Execution Checklist

- [ ] All user roles can login
- [ ] All modules load correctly
- [ ] All forms accept input
- [ ] All calculations are accurate
- [ ] All permissions enforced
- [ ] All communications sent
- [ ] All data persists
- [ ] All reports generate
- [ ] No console errors
- [ ] No security vulnerabilities
- [ ] Performance acceptable
- [ ] Mobile responsive (if applicable)

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Project Manager | | | |
| Client | | | |

---

**Version:** 1.0.0  
**Last Updated:** April 2026
