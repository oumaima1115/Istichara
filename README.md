# Istichara – Legal Consultation Platform

## Description
Istichara is a web platform that connects clients with lawyers for legal consultations.  
Users can submit their questions, choose a lawyer, select an available time slot, and receive professional legal advice.  

The platform includes appointment booking, online payment, and lawyer availability management.

---

## Features
- User authentication (Sign up, Sign in, Logout)  
- Client and Lawyer roles  
- List of lawyers with filters  
- Submit Istichara (consultation request)  
- Upload attachments  
- Select lawyer and available time (calendar)  
- Online payment with coupon system  
- Lawyer can accept or refuse requests  
- Email notification to clients  
- Profile management (client and lawyer)  

---

## Tech Stack
- Frontend: Angular / React  
- Backend: Node.js (Express) or Laravel  
- Database: MongoDB  
- Authentication: JWT  

---

## Project Structure
- Frontend → UI pages and components  
- Backend → API, business logic  
- Database → MongoDB collections (Users, Istichara, Coupon, Review)  

---

## Main Pages
- Home  
- Lawyers List  
- Istichara Form  
- Sign In / Sign Up  
- Profile (Client / Lawyer)  

---

## API Overview

### Auth

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST   | /signup  | Create a new user |
| POST   | /login   | Authenticate user |
| POST   | /logout  | Logout user |

---

### Users

| Method | Endpoint   | Description |
| ------ | ---------- | ----------- |
| GET    | /profile   | Get current user profile |
| PUT    | /profile   | Update current user profile |
| DELETE | /profile   | Delete current user profile |
| GET    | /users     | Get all users |

---

### Istichara

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /istichara | Get all istichara |
| POST   | /istichara | Create new istichara |
| PUT    | /istichara/:id | Update istichara |
| DELETE | /istichara/:id | Delete istichara |
| PATCH  | /istichara/:id/accept | Accept istichara |
| PATCH  | /istichara/:id/refuse | Refuse istichara |

---

### Coupon

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /coupon | Get all coupons |
| POST   | /coupon | Create coupon |
| PUT    | /coupon/:id | Update coupon |
| DELETE | /coupon/:id | Delete coupon |

---

### Review

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /reviews | Get reviews (filtered by user role in controller) |
| POST   | /reviews | Create a review (client only) |
| PUT    | /reviews/:id | Update a review (client only) |
| DELETE | /reviews/:id | Delete a review (client only) |

---

## How It Works
1. Client selects a lawyer  
2. Client chooses an available date and time  
3. Client submits an Istichara request  
4. The selected time slot becomes **reserved**  
5. Lawyer accepts or refuses the request  
6. Client receives a notification  

---

## Installation & Run

### 1. Clone the repository
```bash
git clone https://github.com/oumaima1115/Istichara.git
cd istichara-backend
```
### 2. Install dependencies
```bash
npm install
```
### Dependencies Explanation

| Package | Description |
|--------|------------|
| express | Node.js web framework |
| mongoose | MongoDB object modeling |
| dotenv | Load environment variables from `.env` |
| cors | Allow cross-origin requests |
| bcryptjs | Hash passwords securely |
| jsonwebtoken | Generate and verify JWT tokens |
| multer | Handle file uploads |
| nodemailer | Send emails |
| nodemon | Auto-restart server in development |
| eslint | Linting tool for code quality |

### 3. Configure environment variables

Create a .env file in the root folder and add:
```bash
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password_or_app_password
```
### 4. Run the server
```bash
npm run dev
```
or
```bash
npm start
```
### 5. Verify the server

Open your browser or Postman:
```bash
http://localhost:5000
```
### Notes
Make sure MongoDB is running locally or use MongoDB Atlas

Use Postman or Thunder Client to test APIs

### Future Improvements

Video consultation

Real-time chat

Advanced search filters

Payment gateway integration

---

## Project Repositories

This project is split into two parts:
```bash
- Backend (API): https://github.com/oumaima1115/Istichara  
- Frontend (Client): https://github.com/oumaima1115/Istichara-frontend
```
