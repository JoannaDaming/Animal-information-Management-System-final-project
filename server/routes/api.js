const express = require('express');
const router = express.Router();

const ownerController = require('../controllers/ownerController');
const animalController = require('../controllers/animalController');
const medicalRecordController = require('../controllers/medicalRecordController');
const appointmentController = require('../controllers/appointmentController');

// Owners
router.get('/owners', ownerController.getAllOwners);
router.get('/owners/:id', ownerController.getOwnerById);
router.post('/owners', ownerController.createOwner);
router.put('/owners/:id', ownerController.updateOwner);
router.delete('/owners/:id', ownerController.deleteOwner);

// Animals
router.get('/animals', animalController.getAllAnimals);
router.get('/animals/:id', animalController.getAnimalById);
router.post('/animals', animalController.createAnimal);
router.put('/animals/:id', animalController.updateAnimal);
router.delete('/animals/:id', animalController.deleteAnimal);

// Medical Records
router.get('/medical-records', medicalRecordController.getAllMedicalRecords);
router.get('/medical-records/animal/:animalId', medicalRecordController.getMedicalRecordsByAnimalId);
router.post('/medical-records', medicalRecordController.createMedicalRecord);

// Appointments
router.get('/appointments', appointmentController.getAllAppointments);
router.post('/appointments', appointmentController.createAppointment);
router.patch('/appointments/:id/status', appointmentController.updateAppointmentStatus);

module.exports = router;
