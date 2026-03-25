/*
name → String, required, trimmed.
email → String, required, unique, lowercase.
password → String, required.
role → String, enum: client or lawyer, required.
specialty → String, only for lawyers, default null.
profilePic → String, optional, default null.
reviews → Array of ObjectIds referencing the Review collection.
calendar → Object (only for lawyers):
days → Array of Strings (enum: Monday → Sunday)
startTime → String (e.g., "09:00")
endTime → String (e.g., "14:00")
timestamps → createdAt and updatedAt auto-generated.
Note: 
1. Client bookings (reserved slots) are stored in the Istichara collection, not here.
2. trimmed means: Any extra spaces at the beginning or end of the string are automatically removed when saving to the database.
    Example:
        name: "   Dr. Ahmed Ben Ali   "
        With trim: true, it will be stored as:
        name: "Dr. Ahmed Ben Ali"
*/