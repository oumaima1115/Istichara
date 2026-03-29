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
price → Number, the cost of consultation from the lawyer
cases_won → Number, the number of cases won by the lawyer
timestamps → createdAt and updatedAt auto-generated.
Note: 
1. Client bookings (reserved slots) are stored in the Istichara collection, not here.
2. trimmed means: Any extra spaces at the beginning or end of the string are automatically removed when saving to the database.
    Example:
        name: "   Dr. Ahmed Ben Ali   "
        With trim: true, it will be stored as:
        name: "Dr. Ahmed Ben Ali"
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['client', 'lawyer'],
      required: true
    },

    specialty: {
      type: String,
      default: null
    },

    profilePic: {
      type: String,
      default: null
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],

    calendar: {
      days: [
        {
          type: String,
          enum: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ]
        }
      ],
      startTime: {
        type: String // example: "09:00"
      },
      endTime: {
        type: String // example: "14:00"
      }
    },

    price: {
      type: Number,
      default: 0
    },

    cases_won: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);