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



/*--------------------------------------Starting work--------------------------------------*/



const express = require("express");
const router = express.Router();

const isticharaController = require("../controllers/istichara.controller");
const { validateCreateIstichara } = require("../utils/validateIstichara");

const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

router.get("/", isticharaController.getIstichara);

router.post(
  "/",
  validateCreateIstichara,
  isticharaController.createIstichara
);

router.put("/:id", isticharaController.updateIstichara);

router.delete("/:id", isticharaController.deleteIstichara);

router.patch("/:id/accept", isticharaController.acceptIstichara);

router.patch("/:id/refuse", isticharaController.refuseIstichara);

module.exports = router;