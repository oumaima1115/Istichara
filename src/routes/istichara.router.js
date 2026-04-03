/*
istichara.router.js - Istichara (Consultation) Routes

- GET /istichara → list all Istichara by role: (attorney or client)
- POST /istichara → create a new Istichara request
- PUT /istichara/:id → update Istichara
- DELETE /istichara/:id → delete Istichara
- PATCH /istichara/:id/accept → attorney accepts request
- PATCH /istichara/:id/refuse → attorney refuses request
- Handles status updates and calendar availability
*/

const express = require("express");
const router = express.Router();

const isticharaController = require("../controllers/istichara.controller");
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

router.get(
  '/',
  authMiddleware,
  isticharaController.getAll
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('client'),
  upload.array('attachments'),
  isticharaController.create
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('client'),
  isticharaController.update
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('client'),
  isticharaController.delete
);

router.patch(
  '/:id/accept',
  authMiddleware,
  roleMiddleware('attorney'),
  isticharaController.accept
);

router.patch(
  '/:id/refuse',
  authMiddleware,
  roleMiddleware('attorney'),
  isticharaController.refuse
);

module.exports = router;