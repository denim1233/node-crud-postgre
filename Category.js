const pool = require('./db');

class Category {
  static async create({ category_name, status_id }) {
    const query = 'INSERT INTO categories (category_name, status_id) VALUES ($1, $2) RETURNING *';
    const values = [category_name, status_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, { category_name, status_id }) {
    const query = 'UPDATE categories SET category_name = $1, status_id = $2 WHERE id = $3 RETURNING *';
    const values = [category_name, status_id, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM categories WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Category;