const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required!"],
      minLength: [3, "Firts name should be atleast 3 characters long!"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required!"],
      minLength: [3, "Last name should be atleast 3 characters long!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid Email!",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [5, "Password must be atleast 5 characters!"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Passswords don't match!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
