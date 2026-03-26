/*
Checks if required fields for coupon creation are present: code, expirationDate, discountPercentage.
Validates discountPercentage is a number between 0–100.
Validates expirationDate is a valid future date.
Returns errors if validation fails.
*/
const validateCoupon = (data) => {
    const errors = [];

    const { code, expirationDate, discountPercentage } = data;

    // Check required fields
    if (!code) {
        errors.push("Code is required");
    }

    if (!expirationDate) {
        errors.push("Expiration date is required");
    }

    if (discountPercentage === undefined) {
        errors.push("Discount percentage is required");
    }

    // Validate discountPercentage
    if (discountPercentage !== undefined) {
        if (typeof discountPercentage !== "number") {
            errors.push("Discount must be a number");
        } else if (discountPercentage < 0 || discountPercentage > 100) {
            errors.push("Discount must be between 0 and 100");
        }
    }

    // Validate expirationDate
    if (expirationDate) {
        const expDate = new Date(expirationDate);

        if (isNaN(expDate.getTime())) {
            errors.push("Expiration date is invalid");
        } else if (expDate <= new Date()) {
            errors.push("Expiration date must be in the future");
        }
    }

    return errors;
    
};

module.exports = validateCoupon;