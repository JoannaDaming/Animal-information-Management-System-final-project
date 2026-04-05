const db = require('../config/db');

exports.getAllOwners = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM OWNERS');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOwnerById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM OWNERS WHERE owner_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Owner not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOwner = async (req, res) => {
  const { full_name, contact_number, email, address } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO OWNERS (full_name, contact_number, email, address) VALUES (?, ?, ?, ?)',
      [full_name, contact_number, email, address]
    );
    res.status(201).json({ owner_id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOwner = async (req, res) => {
  const { full_name, contact_number, email, address } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE OWNERS SET full_name = ?, contact_number = ?, email = ?, address = ? WHERE owner_id = ?',
      [full_name, contact_number, email, address, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Owner not found' });
    res.json({ owner_id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOwner = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM OWNERS WHERE owner_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Owner not found' });
    res.json({ message: 'Owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
