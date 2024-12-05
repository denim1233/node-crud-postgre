const express = require('express');
const cors = require('cors');
const Product = require('./Product');
const Category = require('./Category');

const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Only allow this domain
    methods: 'GET,POST,PUT,DELETE', // Allow only these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow only these headers
  };
  
app.use(cors(corsOptions));

// Middleware to set security headers
app.use((req, res, next) => {
  // X-XSS-Protection Header (blocks some reflected XSS attacks in older browsers)
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Content-Security-Policy Header (prevents inline scripts and other types of attacks)
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none'");

  // You can add other headers as needed (e.g., for additional security)
  res.setHeader('X-Content-Type-Options', 'nosniff');  // Prevents MIME type sniffing
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains'); // HTTP Strict Transport Security

  next();
});

// Product Routes
app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

app.get('/products-detailed', async (req, res) => {
    try {
      const productsWithCategories = await Product.getProductsWithCategories();
      res.status(200).json(productsWithCategories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve products with categories' });
    }
  });
  

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.delete(req.params.id);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Category Routes
app.post('/categories', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

app.get('/categories/:id', async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
});

app.put('/categories/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.params.id, req.body);
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/categories/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.delete(req.params.id);
    if (deletedCategory) {
      res.status(200).json(deletedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});