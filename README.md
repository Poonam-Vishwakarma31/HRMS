# HRMS (Human Resource Management System)

## Project Overview
HRMS is a backend-focused Human Resource Management System built to manage employees, roles, authentication, and core HR operations in a scalable and secure way.

## Purpose (One-liner)
A modular HRMS backend with authentication, role-based access control, and designed to be microservice-ready.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- RBAC (Role-Based Access Control)
- Git & GitHub

## Features (Initial Scope)
 User authentication (JWT)
 Role → Permission mapping (RBAC without role checks in code) (Admin, HR, Employee)
 Ownership-based access control
 Modular architecture (auth, users, roles)
 Manager approval workflow
 Audit logging for critical actions
 Clean controller–service separation
 Microservice-friendly design


### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Git

### Installation
```bash
git clone https://github.com/Poonam-Vishwakarma31/HRMS.git
cd HRMS
npm install 


## Authentication

#Login
Issues JWT containing id, role, and permissions
No DB lookup required on every request

#Register
Controlled user creation (only admin and HR can create a new user)
Employees must have a manager
Admin / HR cannot have a manager
Prevents privilege escalation

## Authorization Model
#Roles

Admin
HR
Manager
Employee
Permissions
Access is controlled using permissions, not hardcoded roles.

Example: authorizePermissions(PERMISSIONS.LEAVE_APPROVE)

Benefits:
Fine-grained control
Scales cleanly
No role-based conditionals in services


## Ownership vs Authority

#Ownership
Used for self-service actions
Example: employee cancels their own leave

#Authority
Used for approvals
Example: manager approves team member’s leave
This distinction avoids insecure role-only checks and enforces real business rules.

##Leave Management
Employee creates leave
Manager / HR / Admin approve or reject
Employee can cancel own pending leave
Leave status transitions are validated
Every change is audit-logged.

##Audit Logging
All critical actions are logged with:
Actor
Action type
Resource ID
Before / After state
Provides traceability and compliance readiness.

##Architecture
routes → permissions → controllers → services → models
Routes handle access gates
Controllers handle HTTP only
Services handle business logic
Models handle persistence

