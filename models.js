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
