const db = require('../config/db');

exports.getAllMedicalRecords = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT MR.*, A.name as animal_name FROM MEDICAL_RECORDS MR JOIN ANIMALS A ON MR.animal_id = A.animal_id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMedicalRecordsByAnimalId = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM MEDICAL_RECORDS WHERE animal_id = ?', [req.params.animalId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMedicalRecord = async (req, res) => {
  const { animal_id, diagnosis, treatment, record_date } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO MEDICAL_RECORDS (animal_id, diagnosis, treatment, record_date) VALUES (?, ?, ?, ?)',
      [animal_id, diagnosis, treatment, record_date]
    );
    res.status(201).json({ record_id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
