const { Product } = require("../../../models/product_schema.js");

const createProductController = async (req, res) => {
  try {
    const data = req.body;
    console.log("creating product...", data);

    Object.keys(data).forEach((key) => {
      if (data[key] == null || data[key] == "") {
        delete data.key;
      }
    });

    let newProduct = null;

    try {
      newProduct = await Product.create(data);

      res.status(201);
      res.json({
        isSucces: true,
        message: "Product Created",
        data: newProduct,
      });
    } catch (err) {
      console.log("Error while creating the product.....", err.message);
      res.status(400);
      res.json({
        isSuccess: false,
        message: `Err:${err.message}`,
        data: {},
      });
    }
  } catch (err) {
    console.log("Error in createProductController", err.message);
    res.status[500].json({
      isSucess: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.status(201).json({
      isSucces: true,
      message: "Data Fetched Succesfully",
      data: {
        products: allProducts,
      },
    });
  } catch (err) {
    console.log("Error in gettng all PRODUCTS -->> ", err.message);
    res.status(501).json({
      isSucess: false,
      message: "Internal Server Error",
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const newData = req.body;

    const newProduct = await Product.findByIdAndUpdate(productId, newData, {
      new: true,
      runValidators: true,
    }); // validators will run only when we post into

    if (newProduct == null) {
      res.status(400).json({
        isSuccess: false,
        message: "Invalid product ID",
        data: {},
      });

      return;
    }

    res.status(200).json({
      isSuccess: true,
      message: "Product Updated",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    console.log("Error in gettng all PRODUCTS -->> ", err.message);
    res.status(501).json({
      isSucess: false,
      message: "Internal Server Error",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    try {
      const { productId } = req.params;

      await Product.findByIdAndDelete(productId);
      res.status(204).json({
        isSuccess: true,
        message: "Delted successfully",
        data: {},
      });
    } catch (err) {
      res.status(400);
      res.json({
        isSuccess: false,
        message: "You are deleting invalid product ID",
      });
    }
  } catch (err) {
    console.log("Error in deleting message ", err.message);
    res.status(501).json({
      isSucess: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createProductController,
  getAllProducts,
  updateProductController,
  deleteProductController,
};
