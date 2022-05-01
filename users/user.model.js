const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    insuranceDetails: [{}],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      // expire docs 60 seconds after createdAt
      // createdAt: { type: Date, expires: '5m', default: Date.now },
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("user", userSchema);
console.log("User1", JSON.stringify(User));
module.exports = User;
