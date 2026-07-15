import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// Function for add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      // converting the sizes string to array
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added" });
    // res.json({});
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};
// Function of list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({}); // which is used to fetch the data from the db
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function for removeProduct
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.body.id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function for Single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { listProduct, addProduct, removeProduct, singleProduct };
