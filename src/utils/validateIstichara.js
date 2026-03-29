/*
Checks required fields for creating an Istichara request: clientId, lawyerId, subject, message, scheduledDate, scheduledSlot.
Validates scheduledDate is a valid date.
Validates scheduledSlot is a valid time string (e.g., "10:00").
Optionally validates attachments array.
Returns errors if validation fails.
*/

const validateIstichara = (data) => {
  const errors = [];

  const {
    clientId,
    lawyerId,
    subject,
    message,
    scheduledDate,
    scheduledSlot,
    attachments,
    couponCode
  } = data;

  // ===== Required fields =====
  if (!clientId) errors.push("clientId is required");
  if (!lawyerId) errors.push("lawyerId is required");
  if (!subject) errors.push("Subject is required");
  if (!message) errors.push("Message is required");
  if (!scheduledDate) errors.push("Scheduled date is required");
  if (!scheduledSlot) errors.push("Scheduled slot is required");

  // ===== Date validation =====
  if (scheduledDate) {
    const date = new Date(scheduledDate);

    if (isNaN(date.getTime())) {
      errors.push("Scheduled date is invalid");
    } else if (date <= new Date()) {
      errors.push("Scheduled date must be in the future");
    }
  }

  // ===== Time format validation (HH:mm) =====
  if (scheduledSlot) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(scheduledSlot)) {
      errors.push("Scheduled slot must be in format HH:mm (e.g., 10:00)");
    }
  }

  // ===== Attachments validation (optional) =====
  if (attachments !== undefined) {
    if (!Array.isArray(attachments)) {
      errors.push("Attachments must be an array");
    } else {
      attachments.forEach((file, index) => {
        if (typeof file !== "string") {
          errors.push(`Attachment at index ${index} must be a string`);
        }
      });
    }
  }

  // ===== Coupon validation (optional) =====
  if (couponCode !== undefined && couponCode !== null) {
    if (typeof couponCode !== "string") {
      errors.push("Coupon code must be a string");
    }
  }

  return errors;
};

module.exports = validateIstichara;