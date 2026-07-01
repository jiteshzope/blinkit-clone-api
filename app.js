const express = require('express');
const mongoose = require("mongoose");
const AdminUser = require("./models").AdminUser;
const Category = require("./models").Category;
const Product = require("./models").Product;
const User = require("./models").User;

// by default nodejs has process.env object, and to make all the environment variables available in the process.env object, we need to use dotenv package and call config() method on it.
require("dotenv").config();

const server = express(); // creating an http server

server.use(express.json()); // to parse the incoming request body as json

server.use((req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// api endpoint to handle the admin login request
server.post('/admin/login', (req, res, next) => {
  const userName = req.body?.userName;
  const password = req.body?.password;

  if (!userName || !password) {
    return res.status(400).json({ message: 'userName and password are required' });
  }

  console.log('Login attempt:', { userName });

  AdminUser.findOne({ userName: userName, password: password }).then((user) => {
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  }).catch((err) => {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.post('/add-category', (req, res, next) => {
  const categoryName = req.body?.categoryName;
  const imageUrl = req.body?.categoryImage;
  const description = req.body?.categoryDescription;

  if (!categoryName || !imageUrl || !description) {
    return res.status(400).json({ message: 'categoryName, imageUrl, and description are required' });
  }

  const newCategory = new Category({ categoryName: categoryName, imageUrl: imageUrl, description: description });

  newCategory.save().then((category) => {
    res.status(201).json({ message: 'Category created successfully', category: category });
  }).catch((err) => {
    console.error('Error creating category:', err);
    res.status(500).json({ message: 'Internal server error' });
  });

});

server.get('/categories', (req, res, next) => {

  Category.find().then((categories) => {
    res.status(200).json({ categories: categories });
  }).catch((err) => {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Internal server error' });
  });

});

server.put('/edit-category/:id', (req, res, next) => {
  const categoryId = req.params.id;
  const updatedData = {
    categoryName: req.body?.categoryName,
    imageUrl: req.body?.categoryImage,
    description: req.body?.categoryDescription
  };

  Category.findByIdAndUpdate(categoryId, updatedData).then((updatedCategory) => {
    if (updatedCategory) {
      res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  }).catch((err) => {
    console.error('Error updating category:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.post('/add-product', (req, res, next) => {
  const productName = req.body?.productName;
  const imageUrl = req.body?.productImage;
  const description = req.body?.productDescription;
  const price = req.body?.productPrice;
  const categoryId = req.body?.categoryId;

  if (!productName || !imageUrl || !description || !price || !categoryId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newProduct = new Product({ productName, imageUrl, description, price, categoryId });

  newProduct.save().then((product) => {
    res.status(201).json({ message: 'Product created successfully', product });
  }).catch((err) => {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.get('/products/:categoryId', (req, res, next) => {
  const categoryId = req.params.categoryId;

  Product.find({ categoryId: categoryId }).then((products) => {
    res.status(200).json({ products: products });
  }).catch((err) => {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Internal server error' });
  });

});

server.put('/edit-product/:id', (req, res, next) => {
  const productId = req.params.id;
  const updatedProductData = {
    productName: req.body?.productName,
    description : req.body?.productDescription,
   imageUrl : req.body?.productImage,
   price : req.body?.productPrice
  };
  //here we are using findByIdAndUpdate method so this method will find the product and update it
  Product.findByIdAndUpdate(productId , updatedProductData).then((updatedProduct) => {
    if (updatedProduct) {
      res.status(200).json({ message: 'product updated successfully', product: updatedProduct });
    } else {
      res.status(404).json({ message: 'product not found' });
    }
  }).catch((err) => {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});

server.post('/auth/user/register', (req, res, next) => {
  const { userName, email, password, mobile, address } = req.body;

  if (!userName || !email || !password || !mobile || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = new User({ userName, email, password, mobile, address });

  newUser.save().then((user) => {
    res.status(201).json({ message: 'User registered successfully', user });
  }).catch((err) => {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});


server.post('/auth/user/login',(req,res,next)=>{
  const {userName,password}= req.body
  if (!userName || !password){
    res.status(400).json({message:'username and password are required'})  
  }

  User.findOne({userName,password}).then((user)=>{
    if (user){
      return res.status(200).json({message:'login successful',user})
    }else{
      return res.status(401).json({message:'invalid username or password'})
    }
  }).catch((err)=>{
    console.error('error during user login:',err);
    res.status(500).json({message:'internal server error'})
  })
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');

  // Start accepting requests only after DB is connected.
  server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

