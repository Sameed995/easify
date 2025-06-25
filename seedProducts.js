
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables (optional if using .env)
require('dotenv').config();

// Define product schema (or import your Product model)
const Product = require('./models/Product');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || 'your-mongodb-atlas-uri-here', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB Atlas');
  const filePath = path.join(__dirname, 'mockProducts.json');
  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log('✅ Mock products inserted successfully!');
  mongoose.disconnect();
})
.catch(err => {
  console.error('❌ Error inserting products:', err);
});
