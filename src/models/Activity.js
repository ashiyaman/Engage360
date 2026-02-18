const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ['LEAD_CREATED', 'STATUS_CHANGE', 'NOTE_ADDED', 'LEAD_CLOSED', 'PRIORITY_CHANGED', 'TIMETOCLOSE_UPDATED' ], //Pre-defined activity types
      index: true
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      index: true
    },
    salesAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesAgent",
      index: true
    },
    payload: {
        from: String,
        to: String,
        text: String
    }
  },
  { timestamps: true },
);

const Activity = new mongoose.model('Activity', ActivitySchema)
module.exports = Activity
