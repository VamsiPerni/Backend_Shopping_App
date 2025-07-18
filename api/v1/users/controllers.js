const jwt = require("jsonwebtoken");

const getUserDetailsController = async (req, res) => {
  try {
    const { authorization } = req.cookies;

    if (!authorization) {
      res.status(401).json({
        isSuccess: false,
        message: "Token not found!",
      });
      return;
    }

    jwt.verify(
      authorization,
      process.env.JWT_SECRET,
      function (err, decodedData) {
        if (err) {
          res.status(401).json({
            isSuccess: false,
            message: "Invalid token!!",
            data: {},
          });
        } else {
          res.status(200).json({
            isSuccess: true,
            message: "Invalid token!",
            data: {
              user: decodedData,
            },
          });
        }
      }
    );
  } catch (err) {
    console.log("Error in getUserDetailsController --->> ", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
      data: { message: err.message },
    });
  }
};

module.exports = { getUserDetailsController };
