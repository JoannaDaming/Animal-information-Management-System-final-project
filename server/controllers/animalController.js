const db = require('../config/db');

exports.getAllAnimals = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT A.*, O.full_name as owner_name FROM ANIMALS A LEFT JOIN OWNERS O ON A.owner_id = O.owner_id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ANIMALS WHERE animal_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Animal not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAnimal = async (req, res) => {
  const { name, species, breed, gender, birth_date, color, owner_id, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO ANIMALS (name, species, breed, gender, birth_date, color, owner_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, species, breed, gender, birth_date, color, owner_id, status]
    );
    res.status(201).json({ animal_id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnimal = async (req, res) => {
  const { name, species, breed, gender, birth_date, color, owner_id, status } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE ANIMALS SET name = ?, species = ?, breed = ?, gender = ?, birth_date = ?, color = ?, owner_id = ?, status = ? WHERE animal_id = ?',
      [name, species, breed, gender, birth_date, color, owner_id, status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Animal not found' });
    res.json({ animal_id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM ANIMALS WHERE animal_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Animal not found' });
    res.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
