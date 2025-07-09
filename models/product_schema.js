// -----------------------------------------------------

// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

// const productSchema = new Schema({});

// const Product = model("product", productSchema);
// // product is our cluster
// // const Product -->> This prodcut will help us create the documents in the cluster

// model.exports = {
//   Product,
// };

// -----------------------------------------------------
// ---->>> Basic Schema to write is the below option

// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

// const productSchema = new Schema(
//   {
//     title: String,
//     price: Number,
//     rating: Number,
//     description: String,
//     quantity: Number,
//     images: [String],
//   },
//   {
//     versionKey: false,
//     timestamps: true,
//   }
// );

// const Product = model("product", productSchema);

// model.exports = {
//   Product,
// };

// -----------------------------------------------------

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    description: String,
    quantity: {
      type: Number,
      default: 1,
    },
    images: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = model("product", productSchema);

module.exports = {
  Product,
};
