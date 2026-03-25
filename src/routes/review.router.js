/*
review.router.js - Review Routes

- GET /reviews → Get all reviews by role: (lawyer or client)
- POST /reviews → create a review for a lawyer (client only)
- PUT /reviews/:id → update a review (client only)
- DELETE /reviews/:id → delete a review (client only)
- Handles rating (1-5) and comment validation 
*/