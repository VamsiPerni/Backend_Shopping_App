const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-admin"],
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Before creating the schema/modifying the schema {.pre} will run and hash the passswords and for the hash functions we are having different sources
// bycrypt library it is present in the Node JS it self but we need manually we need to the customs things
// there are two popular libraries {bycrpt.js} , {node.bycrpy.js}
// It is the mongoose midlware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password.toString(), 12);
  }
  next();
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };

// name , email , password , role , profile picture , gender , address , phone number ,
