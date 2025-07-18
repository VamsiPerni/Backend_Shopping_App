// ------------------------------------------------------------

// const { UserModel } = require("../../../models/user_schema");

// const userRegistrationController = async (req, res) => {
//   const data = req.body;

//   if (!data.email || !data.password) {
//     // addddd more validation like regex check for email
//     res
//       .status(400)
//       .json({ isSucces: false, message: "Email & Password is required!" });
//     return; // NEVER forgot to write return in such cases , if we match the above case {IF} then we need to return instead of proceeding further coding ,if we not return then it will proceed further and then it will be the error
//   }
//   const newUser = await UserModel.create(data);

//   console.log("=>", newUser._doc);
//   // delete newUser.password;  // instead of deleting password we are taking the password to another variable and remainig data to another to the newUser,then it would be same as delete
//   const { password, ...safeData } = newUser;
//   console.log("----->>", safeData);

//   res.status(201).json({
//     isSuccess: true,
//     message: "User Created!",
//     data: { user: newUser },
//   });
// };

// module.exports = { userRegistrationController };

// ------------------------------------------------------------

const { UserModel } = require("../../../models/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegistrationController = async (req, res) => {
  try {
    const data = req.body;

    if (!data.email || !data.password) {
      res.status(400).json({
        isSucces: false,
        message: "Email & Password is required!",
        data: {},
      });
      return;
    }
    const newUser = await UserModel.create(data);

    const { password, ...safeData } = newUser._doc;
    console.log("----->>", safeData);

    res.status(201).json({
      isSuccess: true,
      message: "User Created!",
      data: { user: safeData },
    });
  } catch (err) {
    console.log("Error while creaing user", err.message);

    res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
    });
  }
};

const userLoginController = async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    // some more validation need to done by us
    req.status(400).json({
      isSuccess: true,

      message: "Email and password is required:",
      data: {},
    });
    return;
  }

  // inside find the curly bracket is called mongodb filters
  // here {find} -> querySelectorAll in JS
  // {fineOne} -> querySelector in JS
  const user = await UserModel.findOne({
    email: data.email,
  });

  if (user == null) {
    req.status(400).json({
      isSuccess: true,
      message: "E-Mail ID doesn't exist please register first before login",
      data: {},
    });
    return;
  }

  const hashedPassword = user.password;

  const isCorrect = await bcrypt.compare(
    data.password.toString(),
    hashedPassword
  );

  if (!isCorrect) {
    req.status(400).json({
      isSuccess: true,
      message: "Incorrect Password",
      data: {},
    });
    return;
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  ); // try to put more than 30 characters

  res.cookie("authorization", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: true, // the cookie will not be sotred in the frontend if not mention this line
    samesite: "strict",
  });

  res.status(200).json({
    isSuccess: true,
    message: "Login Successfully",
    data: {
      user: {
        email: user.email,
      },
    },
  });
};

module.exports = { userRegistrationController, userLoginController };
