// update.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

const imageMap = {
  "boAt Rockerz 450 Wireless Headphones": "boat_headphones.jpg",
  "Logitech MK215 Wireless Keyboard and Mouse Combo": "logitech_combo.jpg",
  "HP 15s Laptop AMD Ryzen 5": "hp_15s.jpg",
  "Samsung Galaxy M14 5G": "samsung_m14.jpg",
  "Noise ColorFit Pulse Grand Smart Watch": "noise_watch.jpg",
  "Acer EK220Q 21.5 inch Full HD Monitor": "acer_monitor.jpg",
  "Zebronics Zeb-Rover Wired Mouse": "zebronics_mouse.jpg",
  "Mi 10000mAh Power Bank 3i": "mi_powerbank.jpg",
  "JBL Go 3 Portable Bluetooth Speaker": "jbl_go3.jpg",
  "Amazon Echo Dot (4th Gen)": "echo_dot.jpg"
};

async function run() {
  await mongoose.connect('mongodb+srv://sameedshaikh445:sameedshaikhmongodb55@easify.m6ebi.mongodb.net/?retryWrites=true&w=majority&appName=easify');

  for (const [name, image] of Object.entries(imageMap)) {
    await Product.updateOne({ name }, { $set: { image } });
    console.log(`✅ Updated image for ${name}`);
  }

  mongoose.disconnect();
}

run();
