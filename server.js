require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const fs = require('fs');

const LoginHistory = require('./models/LoginHistory');
const Product = require('./models/Product'); // For search functionality

const app = express();

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'images'))); // Serve product images

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 86400000 }
}));

// MongoDB Connection
mongoose.connect("mongodb+srv://sameedshaikh445:sameedshaikhmongodb55@easify.m6ebi.mongodb.net/?retryWrites=true&w=majority&appName=easify", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// User Model
const User = mongoose.model('User', {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// --- Routes ---

// Registration Route
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const loginHistory = new LoginHistory({
      userId: user._id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await loginHistory.save();
    req.session.userId = user._id;

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search Route
app.get('/api/search', async (req, res) => {
  const query = req.query.q || '';
  try {
    const results = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).limit(20);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// Compare Price Route
app.post('/api/compare-price', async (req, res) => {
  const { productName } = req.body;

  try {
    const amazonPath = path.join(__dirname, 'data', 'amazon.json');
    const flipkartPath = path.join(__dirname, 'data', 'flipkart.json');

    const amazonData = JSON.parse(fs.readFileSync(amazonPath, 'utf-8'));
    const flipkartData = JSON.parse(fs.readFileSync(flipkartPath, 'utf-8'));

    const amazonMatch = amazonData.find(p =>
      p.product.toLowerCase().includes(productName.toLowerCase())
    );
    const flipkartMatch = flipkartData.find(p =>
      p.product.toLowerCase().includes(productName.toLowerCase())
    );

    res.json({
      amazon: amazonMatch || { error: 'Not Found' },
      flipkart: flipkartMatch || { error: 'Not Found' }
    });
  } catch (err) {
    console.error('Error comparing prices:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve index.html and frontend files (fallback)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
