const db = require('../config/db');

exports.getAllAppointments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT APP.*, A.name as animal_name, O.full_name as owner_name 
      FROM APPOINTMENTS APP 
      JOIN ANIMALS A ON APP.animal_id = A.animal_id 
      JOIN OWNERS O ON APP.owner_id = O.owner_id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  const { animal_id, owner_id, appointment_date, purpose, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO APPOINTMENTS (animal_id, owner_id, appointment_date, purpose, status) VALUES (?, ?, ?, ?, ?)',
      [animal_id, owner_id, appointment_date, purpose, status]
    );
    res.status(201).json({ appointment_id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE APPOINTMENTS SET status = ? WHERE appointment_id = ?',
      [status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ appointment_id: req.params.id, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
