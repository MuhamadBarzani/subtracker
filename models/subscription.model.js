import mongoose from "mongoose";
const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [1, "price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "IQD"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    category: {
      type: String,
      enum: ["sports", "finance", "technology"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Cancelled", "Expired"],
      default: "Active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);
subscriptionSchema.pre("save", function () {
  if (!this.renewalDate) {
    const renewalPeriods = { daily: 1, weekly: 7, monthly: 30, yearly: 365 };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
  }
  if (this.renewalDate < new Date()) {
    this.status = "Expired";
  }
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
