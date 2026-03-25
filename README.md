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
- POST /signup  
- POST /login  
- POST /logout  

### Users
- GET /profile  
- PUT /profile  
- DELETE /profile  
- GET /users  

### Istichara
- GET /istichara  
- POST /istichara  
- PUT /istichara/:id  
- DELETE /istichara/:id  
- PATCH /istichara/:id/accept  
- PATCH /istichara/:id/refuse  

### Coupon
- GET /coupon  
- POST /coupon  
- PUT /coupon/:id  
- DELETE /coupon/:id  

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
```bash
- **express** → Node.js web framework  
- **mongoose** → MongoDB object modeling  
- **dotenv** → load environment variables from `.env`  
- **cors** → allow cross-origin requests (frontend ↔ backend)  
- **bcryptjs** → hash passwords securely  
- **jsonwebtoken** → generate/verify JWT tokens  
- **multer** → handle file uploads (attachments)  
- **nodemailer** → send emails  
- **nodemon** → auto-restart server in development  
- **eslint** → linting tool for code quality
```
### 3. Configure environment variables

Create a .env file in the root folder and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
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
