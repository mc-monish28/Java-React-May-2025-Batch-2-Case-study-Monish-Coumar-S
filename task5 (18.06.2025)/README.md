# User Registration with JSP

A minimal Spring Boot application with JSP for user registration using MySQL database.

## Setup

1. **Create MySQL Database:**
   ```sql
   CREATE DATABASE userdb;
   ```

2. **Update Database Credentials** in `src/main/resources/application.properties`:
   - username: root
   - password: root
   - Change these to match your MySQL credentials

3. **Run the Application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the Application:**
   - URL: http://localhost:8080
   - Registration form will be displayed
   - After registration, success message will be shown

## Features

- Simple user registration form (Name, Email, Password)
- MySQL database storage
- JSP views
- Success message after registration
- Minimal and clean design

## Database

- Database: userdb
- Table: users (auto-created by Hibernate)
- Fields: id, name, email, password 