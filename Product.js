const pool = require('./db');

class Product {
  static async create({ product_name, status_id, product_description, category_id }) {
    const query = 'INSERT INTO products (product_name, status_id, product_description, category_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [product_name, status_id, product_description, category_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  }

  static async getProductsWithCategories() {
    const query = `
      SELECT
        p.id AS product_id,
        p.product_name,
        p.status_id AS product_status,
        p.product_description,
        c.id AS category_id,
        c.category_name,
        c.status_id AS category_status
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { product_name, status_id, product_description, category_id }) {
    const query = `
      UPDATE products 
      SET product_name = $1, status_id = $2, product_description = $3, category_id = $4 
      WHERE id = $5 
      RETURNING *`;
    const values = [product_name, status_id, product_description, category_id, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Product;