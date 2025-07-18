const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String  // ✅ This must be 'image' and NOT 'imageUrl'
});

module.exports = mongoose.model('Product', productSchema);
