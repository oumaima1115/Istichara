/*
Auth Middleware (auth.js)
Checks if the user is logged in.
Verifies JWT token from headers.
Attaches user info to req.user if valid.
Returns 401 Unauthorized if token is missing or invalid.
*/