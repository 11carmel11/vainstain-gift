const mongoose = require("mongoose");
const required = true;

const CouponSchema = mongoose.Schema({
  title: {
    type: String,
    required,
  },
  explain: {
    type: String,
    required,
  },
  used: {
    type: Boolean,
    default: false,
  },
  id: String,
});

const Coupon = mongoose.model("Coupons", CouponSchema);

module.exports = Coupon;
