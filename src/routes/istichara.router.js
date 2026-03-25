/*
istichara.router.js - Istichara (Consultation) Routes

- GET /istichara → list all Istichara by role: (lawyer or client)
- POST /istichara → create a new Istichara request
- PUT /istichara/:id → update Istichara
- DELETE /istichara/:id → delete Istichara
- PATCH /istichara/:id/accept → lawyer accepts request
- PATCH /istichara/:id/refuse → lawyer refuses request
- Handles status updates and calendar availability
*/