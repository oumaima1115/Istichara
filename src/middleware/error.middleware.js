/*
Error Middleware (error.js)
Catches errors thrown in routes or controllers.
Sends JSON response with:
status → HTTP status code (default: 500)
message → Error message (default: "Server Error")
Keeps error handling centralized for all APIs.
*/