/*
Checks required fields for creating an Istichara request: clientId, lawyerId, subject, message, scheduledDate, scheduledSlot.
Validates scheduledDate is a valid date.
Validates scheduledSlot is a valid time string (e.g., "10:00").
Optionally validates attachments array.
Returns errors if validation fails.
*/



/*--------------------------------------Starting work--------------------------------------*/



const mongoose = require("mongoose");

exports.validateCreateIstichara = (req, res, next) => {
  const {
    clientId,
    lawyerId,
    subject,
    message,
    scheduledDate,
    scheduledSlot,
    attachments
  } = req.body;

  let errors = [];

  if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) {
    errors.push("Valid clientId is required");
  }

  if (!lawyerId || !mongoose.Types.ObjectId.isValid(lawyerId)) {
    errors.push("Valid lawyerId is required");
  }

  if (!subject) {
    errors.push("Subject is required");
  }

  if (!message) {
    errors.push("Message is required");
  }

  if (!scheduledDate || isNaN(Date.parse(scheduledDate))) {
    errors.push("Valid scheduledDate is required");
  }

  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!scheduledSlot || !timeRegex.test(scheduledSlot)) {
    errors.push("scheduledSlot must be valid time format HH:mm");
  }

  if (attachments && !Array.isArray(attachments)) {
    errors.push("attachments must be an array");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};