const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true }
}, { collection: "AdminUsers" });

const AdminUser = mongoose.model("AdminUser", adminUserSchema); // creating a moongoose model --> AdminUser

module.exports.AdminUser = AdminUser; // exportin the mongoose model so that it can be used in other files.


// *******************************************************************

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true }
}, { collection: "Categories" });

const Category = mongoose.model("Category", categorySchema); // creating a mongoose model --> Category

module.exports.Category = Category; // exporting the mongoose model so that it can be used in other files.

// *******************************************************************

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { collection: "Products" });

const Product = mongoose.model("Product", productSchema); // creating a mongoose model --> Product

module.exports.Product = Product; // exporting the mongoose model so that it can be used in other files.


// **********************************************************

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true }
}, { collection: "Users" });

const User = mongoose.model("User", UserSchema); // creating a mongoose model --> User

module.exports.User = User; // exporting the mongoose model so that it can be used in other files.
