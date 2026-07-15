// bulkUpload.js - node bulkUpload.js

import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import path from "path";
import productModel from "./models/productModel.js";

cloudinary.config({
  cloud_name: "degyptxnf",
  api_key: "227739842468546",
  api_secret: "_vshB61qs8gjX3ro9Dc0CQILUGc",
});

const MONGO_URI = "mongodb+srv://delulu:admin%40123@cluster0.gs0fly8.mongodb.net/delulu";const IMAGES_DIR = "./assets";

// Copied directly from assets.js — image names mapped manually 
const products = [
  { _id: "aaaaa", name: "Women Round Neck Cotton Top", price: 100, category: "Women", subCategory: "Topwear", sizes: ["S","M","L"], bestseller: true, date: 1716634345448, images: ["p_img1.png"] },
  { _id: "aaaab", name: "Men Round Neck Pure Cotton T-shirt", price: 200, category: "Men", subCategory: "Topwear", sizes: ["M","L","XL"], bestseller: true, date: 1716621345448, images: ["p_img2_1.png","p_img2_2.png","p_img2_3.png","p_img2_4.png"] },
  { _id: "aaaac", name: "Girls Round Neck Cotton Top", price: 220, category: "Kids", subCategory: "Topwear", sizes: ["S","L","XL"], bestseller: true, date: 1716234545448, images: ["p_img3.png"] },
  { _id: "aaaad", name: "Men Round Neck Pure Cotton T-shirt", price: 110, category: "Men", subCategory: "Topwear", sizes: ["S","M","XXL"], bestseller: true, date: 1716621345448, images: ["p_img4.png"] },
  { _id: "aaaae", name: "Women Round Neck Cotton Top", price: 130, category: "Women", subCategory: "Topwear", sizes: ["M","L","XL"], bestseller: true, date: 1716622345448, images: ["p_img5.png"] },
  { _id: "aaaaf", name: "Girls Round Neck Cotton Top", price: 140, category: "Kids", subCategory: "Topwear", sizes: ["S","L","XL"], bestseller: true, date: 1716623423448, images: ["p_img6.png"] },
  { _id: "aaaag", name: "Men Tapered Fit Flat-Front Trousers", price: 190, category: "Men", subCategory: "Bottomwear", sizes: ["S","L","XL"], bestseller: false, date: 1716621542448, images: ["p_img7.png"] },
  { _id: "aaaah", name: "Men Round Neck Pure Cotton T-shirt", price: 140, category: "Men", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716622345448, images: ["p_img8.png"] },
  { _id: "aaaai", name: "Girls Round Neck Cotton Top", price: 100, category: "Kids", subCategory: "Topwear", sizes: ["M","L","XL"], bestseller: false, date: 1716621235448, images: ["p_img9.png"] },
  { _id: "aaaaj", name: "Men Tapered Fit Flat-Front Trousers", price: 110, category: "Men", subCategory: "Bottomwear", sizes: ["S","L","XL"], bestseller: false, date: 1716622235448, images: ["p_img10.png"] },
  { _id: "aaaak", name: "Men Round Neck Pure Cotton T-shirt", price: 120, category: "Men", subCategory: "Topwear", sizes: ["S","M","L"], bestseller: false, date: 1716623345448, images: ["p_img11.png"] },
  { _id: "aaaal", name: "Men Round Neck Pure Cotton T-shirt", price: 150, category: "Men", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716624445448, images: ["p_img12.png"] },
  { _id: "aaaam", name: "Women Round Neck Cotton Top", price: 130, category: "Women", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716625545448, images: ["p_img13.png"] },
  { _id: "aaaan", name: "Boy Round Neck Pure Cotton T-shirt", price: 160, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716626645448, images: ["p_img14.png"] },
  { _id: "aaaao", name: "Men Tapered Fit Flat-Front Trousers", price: 140, category: "Men", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716627745448, images: ["p_img15.png"] },
  { _id: "aaaap", name: "Girls Round Neck Cotton Top", price: 170, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716628845448, images: ["p_img16.png"] },
  { _id: "aaaaq", name: "Men Tapered Fit Flat-Front Trousers", price: 150, category: "Men", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716629945448, images: ["p_img17.png"] },
  { _id: "aaaar", name: "Boy Round Neck Pure Cotton T-shirt", price: 180, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716631045448, images: ["p_img18.png"] },
  { _id: "aaaas", name: "Boy Round Neck Pure Cotton T-shirt", price: 160, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716632145448, images: ["p_img19.png"] },
  { _id: "aaaat", name: "Women Palazzo Pants with Waist Belt", price: 190, category: "Women", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716633245448, images: ["p_img20.png"] },
  { _id: "aaaau", name: "Women Zip-Front Relaxed Fit Jacket", price: 170, category: "Women", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716634345448, images: ["p_img21.png"] },
  { _id: "aaaav", name: "Women Palazzo Pants with Waist Belt", price: 200, category: "Women", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716635445448, images: ["p_img22.png"] },
  { _id: "aaaaw", name: "Boy Round Neck Pure Cotton T-shirt", price: 180, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716636545448, images: ["p_img23.png"] },
  { _id: "aaaax", name: "Boy Round Neck Pure Cotton T-shirt", price: 210, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716637645448, images: ["p_img24.png"] },
  { _id: "aaaay", name: "Girls Round Neck Cotton Top", price: 190, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716638745448, images: ["p_img25.png"] },
  { _id: "aaaaz", name: "Women Zip-Front Relaxed Fit Jacket", price: 220, category: "Women", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716639845448, images: ["p_img26.png"] },
  { _id: "aaaba", name: "Girls Round Neck Cotton Top", price: 200, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716640945448, images: ["p_img27.png"] },
  { _id: "aaabb", name: "Men Slim Fit Relaxed Denim Jacket", price: 230, category: "Men", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716642045448, images: ["p_img28.png"] },
  { _id: "aaabc", name: "Women Round Neck Cotton Top", price: 210, category: "Women", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716643145448, images: ["p_img29.png"] },
  { _id: "aaabd", name: "Girls Round Neck Cotton Top", price: 240, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716644245448, images: ["p_img30.png"] },
  { _id: "aaabe", name: "Men Round Neck Pure Cotton T-shirt", price: 220, category: "Men", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716645345448, images: ["p_img31.png"] },
  { _id: "aaabf", name: "Men Round Neck Pure Cotton T-shirt", price: 250, category: "Men", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716646445448, images: ["p_img32.png"] },
  { _id: "aaabg", name: "Girls Round Neck Cotton Top", price: 230, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716647545448, images: ["p_img33.png"] },
  { _id: "aaabh", name: "Women Round Neck Cotton Top", price: 260, category: "Women", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716648645448, images: ["p_img34.png"] },
  { _id: "aaabi", name: "Women Zip-Front Relaxed Fit Jacket", price: 240, category: "Women", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716649745448, images: ["p_img35.png"] },
  { _id: "aaabj", name: "Women Zip-Front Relaxed Fit Jacket", price: 270, category: "Women", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716650845448, images: ["p_img36.png"] },
  { _id: "aaabk", name: "Women Round Neck Cotton Top", price: 250, category: "Women", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716651945448, images: ["p_img37.png"] },
  { _id: "aaabl", name: "Men Round Neck Pure Cotton T-shirt", price: 280, category: "Men", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716653045448, images: ["p_img38.png"] },
  { _id: "aaabm", name: "Men Printed Plain Cotton Shirt", price: 260, category: "Men", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716654145448, images: ["p_img39.png"] },
  { _id: "aaabn", name: "Men Slim Fit Relaxed Denim Jacket", price: 290, category: "Men", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716655245448, images: ["p_img40.png"] },
  { _id: "aaabo", name: "Men Round Neck Pure Cotton T-shirt", price: 270, category: "Men", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716656345448, images: ["p_img41.png"] },
  { _id: "aaabp", name: "Boy Round Neck Pure Cotton T-shirt", price: 300, category: "Kids", subCategory: "Topwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716657445448, images: ["p_img42.png"] },
  { _id: "aaabq", name: "Kid Tapered Slim Fit Trouser", price: 280, category: "Kids", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716658545448, images: ["p_img43.png"] },
  { _id: "aaabr", name: "Women Zip-Front Relaxed Fit Jacket", price: 310, category: "Women", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716659645448, images: ["p_img44.png"] },
  { _id: "aaabs", name: "Men Slim Fit Relaxed Denim Jacket", price: 290, category: "Men", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716660745448, images: ["p_img45.png"] },
  { _id: "aaabt", name: "Men Slim Fit Relaxed Denim Jacket", price: 320, category: "Men", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716661845448, images: ["p_img46.png"] },
  { _id: "aaabu", name: "Kid Tapered Slim Fit Trouser", price: 300, category: "Kids", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716662945448, images: ["p_img47.png"] },
  { _id: "aaabv", name: "Men Slim Fit Relaxed Denim Jacket", price: 330, category: "Men", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716664045448, images: ["p_img48.png"] },
  { _id: "aaabw", name: "Kid Tapered Slim Fit Trouser", price: 310, category: "Kids", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716665145448, images: ["p_img49.png"] },
  { _id: "aaabx", name: "Kid Tapered Slim Fit Trouser", price: 340, category: "Kids", subCategory: "Bottomwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716666245448, images: ["p_img50.png"] },
  { _id: "aaaby", name: "Women Zip-Front Relaxed Fit Jacket", price: 320, category: "Women", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716667345448, images: ["p_img51.png"] },
  { _id: "aaabz", name: "Men Slim Fit Relaxed Denim Jacket", price: 350, category: "Men", subCategory: "Winterwear", sizes: ["S","M","L","XL"], bestseller: false, date: 1716668445448, images: ["p_img52.png"] },
];

const description = "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.";

async function bulkUpload() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  for (const item of products) {
    try {
      const imageUrls = await Promise.all(
        item.images.map(async (imgName) => {
          const imgPath = path.join(IMAGES_DIR, imgName);
          const result = await cloudinary.uploader.upload(imgPath, { resource_type: "image" });
          return result.secure_url;
        })
      );

      await productModel.create({
        name: item.name,
        description,
        category: item.category,
        subCategory: item.subCategory,
        price: item.price,
        bestseller: item.bestseller,
        sizes: item.sizes,
        image: imageUrls,
        date: item.date,
      });

      console.log(`✅ ${item.name}`);
    } catch (err) {
      console.log(`❌ ${item.name} → ${err.message}`);
    }
  }

  await mongoose.disconnect();
  console.log("✅ All done!");
}

bulkUpload();