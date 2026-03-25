/*
Checks if required fields for coupon creation are present: code, expirationDate, discountPercentage.
Validates discountPercentage is a number between 0–100.
Validates expirationDate is a valid future date.
Returns errors if validation fails.
*/