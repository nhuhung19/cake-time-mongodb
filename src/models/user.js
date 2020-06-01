const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "name is required"],
      strim: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      strim: true,
      Lowercase: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
      },
    },
    password: {
      type: String,
    },
    tokens: [String],
    listBuying: [],
    listSelled: [{}]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("userProducts", {
  ref: "Product",
  localField: "_id",
  foreignField: "owner",
});

userSchema.statics.loginWithCredentials = async function (email, password) {
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("User not found");
  const allow = await bcrypt.compare(password.toString(), user.password);
  if (!allow) throw new Error("wrong email or password");
  return user;
};

userSchema.methods.generateToken = async function () {
  const token = jwt.sign(
    { email: this.email, id: this._id },
    process.env.SECRET
  );
  this.tokens.push(token);
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  let newObj = this.toObject();
  delete newObj.password;
  delete newObj.__v;
  return newObj;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.statics.findOneOrCreate = async function (name, email) {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email });
  }
  await user.generateToken();
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
