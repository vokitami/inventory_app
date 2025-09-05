# Inventory Management System (with Role-Based Authentication)

## Overview
This project is an **inventory management system** built with **React, Node.js, Express, and MySQL**.  
The goal is to allow users to manage inventories and items with different levels of access based on their roles.  

## Current Progress
At this stage, the following features have been implemented:

- **Database setup with Sequelize**  
  - Users  
  - Inventories  
  - Custom fields  
  - Items  
  - Roles and permissions (RBAC)  

- **Authentication system**  
  - User registration and login  
  - JWT-based authentication  
  - Roles assigned to each user (guest, user, admin)  

- **Authorization system**  
  - Role-based access control (RBAC)  
  - Protected routes depending on role  
  - Example permissions:  
    - Guest → view and search inventories  
    - User → create inventory, edit own inventory, comment/like  
    - Admin → full access, manage users and inventories  

- **Frontend integration (React)**  
  - Login and register forms connected to the backend  
  - Protected routes for role-based access  
  - Token and user info stored in `localStorage`  

## Next Steps
The features still in progress or pending are:

- Implementing **inventory management** (CRUD for inventories)  
- Implementing **items management** (CRUD for items inside an inventory)  
- Admin panel:  
  - Manage users  
  - View all inventories  
  - Assign roles and permissions  

## Tech Stack
- **Frontend**: React, React Router  
- **Backend**: Node.js, Express, Sequelize  
- **Database**: MySQL  
- **Authentication**: JWT (JSON Web Token)  

## Status
This project is **work in progress**.  
Even though it’s not finished yet, it already demonstrates a solid foundation for **role-based authentication and authorization**.

---
