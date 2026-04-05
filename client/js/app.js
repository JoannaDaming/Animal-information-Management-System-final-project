import * as api from './api.js';

const viewTitle = document.getElementById('view-title');
const content = document.getElementById('content');
const navLinks = document.querySelectorAll('.sidebar nav ul li a');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const recordForm = document.getElementById('record-form');
const closeModal = document.querySelector('.close-modal');

let currentView = 'dashboard';
let editingId = null;

const views = {
  dashboard: async () => {
    const [animals, owners, appointments, records] = await Promise.all([
      api.fetchAnimals(), api.fetchOwners(), api.fetchAppointments(), api.fetchMedicalRecords()
    ]);
    
    content.innerHTML = `
      <div class="dashboard-stats">
        <div class="stat-card">
          <i class="fas fa-dog"></i>
          <div class="info"><h3>Total Animals</h3><p>${animals.length}</p></div>
        </div>
        <div class="stat-card">
          <i class="fas fa-user-friends"></i>
          <div class="info"><h3>Total Owners</h3><p>${owners.length}</p></div>
        </div>
        <div class="stat-card">
          <i class="fas fa-calendar-alt"></i>
          <div class="info"><h3>Appointments</h3><p>${appointments.length}</p></div>
        </div>
        <div class="stat-card">
          <i class="fas fa-file-medical"></i>
          <div class="info"><h3>Medical Records</h3><p>${records.length}</p></div>
        </div>
      </div>
    `;
  },
  animals: async () => {
    const animals = await api.fetchAnimals();
    content.innerHTML = `
      <div class="actions-header"><button class="btn btn-primary" id="add-btn">Add New Animal</button></div>
      <table><thead><tr><th>Name</th><th>Species</th><th>Breed</th><th>Owner</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${animals.map(a => `
        <tr>
          <td>${a.name}</td><td>${a.species}</td><td>${a.breed}</td><td>${a.owner_name || 'N/A'}</td><td>${a.status}</td>
          <td>
            <button class="btn btn-primary btn-sm edit-btn" data-id="${a.animal_id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${a.animal_id}"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`).join('')}
      </tbody></table>
    `;
    document.getElementById('add-btn').onclick = () => showModal('animal');
    addTableListeners('animal');
  },
  owners: async () => {
    const owners = await api.fetchOwners();
    content.innerHTML = `
      <div class="actions-header"><button class="btn btn-primary" id="add-btn">Add New Owner</button></div>
      <table><thead><tr><th>Name</th><th>Contact</th><th>Email</th><th>Address</th><th>Actions</th></tr></thead>
      <tbody>${owners.map(o => `
        <tr>
          <td>${o.full_name}</td><td>${o.contact_number}</td><td>${o.email}</td><td>${o.address}</td>
          <td>
            <button class="btn btn-primary btn-sm edit-btn" data-id="${o.owner_id}"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${o.owner_id}"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`).join('')}
      </tbody></table>
    `;
    document.getElementById('add-btn').onclick = () => showModal('owner');
    addTableListeners('owner');
  },
  appointments: async () => {
    const appointments = await api.fetchAppointments();
    content.innerHTML = `
      <div class="actions-header"><button class="btn btn-primary" id="add-btn">Add New Appointment</button></div>
      <table><thead><tr><th>Animal</th><th>Owner</th><th>Date</th><th>Purpose</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>${appointments.map(app => `
        <tr>
          <td>${app.animal_name}</td><td>${app.owner_name}</td><td>${new Date(app.appointment_date).toLocaleString()}</td><td>${app.purpose}</td><td>${app.status}</td>
          <td>
            <button class="btn btn-danger btn-sm cancel-btn" data-id="${app.appointment_id}"><i class="fas fa-times"></i> Cancel</button>
          </td>
        </tr>`).join('')}
      </tbody></table>
    `;
    document.getElementById('add-btn').onclick = () => showModal('appointment');
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.onclick = async () => {
            if(confirm('Cancel this appointment?')) {
                await api.deleteAppointment(btn.dataset.id);
                switchView('appointments');
            }
        };
    });
  },
  medical: async () => {
    const records = await api.fetchMedicalRecords();
    content.innerHTML = `
      <div class="actions-header"><button class="btn btn-primary" id="add-btn">Add New Record</button></div>
      <table><thead><tr><th>Animal</th><th>Diagnosis</th><th>Treatment</th><th>Date</th></tr></thead>
      <tbody>${records.map(r => `<tr><td>${r.animal_name}</td><td>${r.diagnosis}</td><td>${r.treatment}</td><td>${new Date(r.record_date).toLocaleDateString()}</td></tr>`).join('')}</tbody></table>
    `;
    document.getElementById('add-btn').onclick = () => showModal('medical');
  }
};

function addTableListeners(type) {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = () => showModal(type, btn.dataset.id);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = async () => {
            if(confirm(`Are you sure you want to delete this ${type}?`)) {
                try {
                    if(type === 'animal') await api.deleteAnimal(btn.dataset.id);
                    else if(type === 'owner') await api.deleteOwner(btn.dataset.id);
                    switchView(currentView);
                } catch(err) { alert(err.message); }
            }
        };
    });
}

async function showModal(type, id = null) {
  editingId = id;
  modalTitle.textContent = `${id ? 'Edit' : 'Add New'} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  recordForm.dataset.type = type;
  
  let existingData = {};
  if (id) {
      if (type === 'animal') existingData = await api.fetchAnimalById(id);
      else if (type === 'owner') existingData = await api.fetchOwnerById(id);
  }

  if (type === 'animal') {
    const owners = await api.fetchOwners();
    recordForm.innerHTML = `
      <input type="text" name="name" placeholder="Animal Name" value="${existingData.name || ''}" required>
      <input type="text" name="species" placeholder="Species" value="${existingData.species || ''}">
      <input type="text" name="breed" placeholder="Breed" value="${existingData.breed || ''}">
      <select name="gender">
        <option value="Male" ${existingData.gender === 'Male' ? 'selected' : ''}>Male</option>
        <option value="Female" ${existingData.gender === 'Female' ? 'selected' : ''}>Female</option>
        <option value="Unknown" ${existingData.gender === 'Unknown' ? 'selected' : ''}>Unknown</option>
      </select>
      <input type="date" name="birth_date" value="${existingData.birth_date ? existingData.birth_date.split('T')[0] : ''}">
      <input type="text" name="color" placeholder="Color" value="${existingData.color || ''}">
      <select name="owner_id"><option value="">Select Owner</option>
        ${owners.map(o => `<option value="${o.owner_id}" ${existingData.owner_id == o.owner_id ? 'selected' : ''}>${o.full_name}</option>`).join('')}
      </select>
      <select name="status">
        <option value="Active" ${existingData.status === 'Active' ? 'selected' : ''}>Active</option>
        <option value="Inactive" ${existingData.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
        <option value="Deceased" ${existingData.status === 'Deceased' ? 'selected' : ''}>Deceased</option>
      </select>
      <button type="submit" class="btn btn-primary">Save Animal</button>
    `;
  } else if (type === 'owner') {
    recordForm.innerHTML = `
      <input type="text" name="full_name" placeholder="Full Name" value="${existingData.full_name || ''}" required>
      <input type="text" name="contact_number" placeholder="Contact Number" value="${existingData.contact_number || ''}">
      <input type="email" name="email" placeholder="Email" value="${existingData.email || ''}">
      <textarea name="address" placeholder="Address">${existingData.address || ''}</textarea>
      <button type="submit" class="btn btn-primary">Save Owner</button>
    `;
  } else if (type === 'appointment') {
    const [animals, owners] = await Promise.all([api.fetchAnimals(), api.fetchOwners()]);
    recordForm.innerHTML = `
      <select name="animal_id" id="animal-select" required>
        <option value="">Select Animal</option>
        ${animals.map(a => `<option value="${a.animal_id}" data-owner="${a.owner_id}">${a.name}</option>`).join('')}
      </select>
      <select name="owner_id" id="owner-select" required>
        <option value="">Select Owner</option>
        ${owners.map(o => `<option value="${o.owner_id}">${o.full_name}</option>`).join('')}
      </select>
      <input type="datetime-local" name="appointment_date" required>
      <input type="text" name="purpose" placeholder="Purpose">
      <select name="status"><option value="Scheduled">Scheduled</option><option value="Completed">Completed</option><option value="Cancelled">Cancelled</option></select>
      <button type="submit" class="btn btn-primary">Save Appointment</button>
    `;

    // Auto-select owner logic
    const animalSelect = document.getElementById('animal-select');
    const ownerSelect = document.getElementById('owner-select');

    animalSelect.onchange = () => {
        const selectedOption = animalSelect.options[animalSelect.selectedIndex];
        const ownerId = selectedOption.getAttribute('data-owner');
        if (ownerId) {
            ownerSelect.value = ownerId;
        }
    };
  }
 else if (type === 'medical') {
    const animals = await api.fetchAnimals();
    recordForm.innerHTML = `
      <select name="animal_id" required><option value="">Select Animal</option>${animals.map(a => `<option value="${a.animal_id}">${a.name}</option>`).join('')}</select>
      <textarea name="diagnosis" placeholder="Diagnosis" required></textarea>
      <textarea name="treatment" placeholder="Treatment"></textarea>
      <input type="date" name="record_date" required>
      <button type="submit" class="btn btn-primary">Save Medical Record</button>
    `;
  }
  
  modal.style.display = 'block';
}

recordForm.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(recordForm);
  const data = Object.fromEntries(formData.entries());
  const type = recordForm.dataset.type;

  try {
    if (editingId) {
        if (type === 'animal') await api.updateAnimal(editingId, data);
        else if (type === 'owner') await api.updateOwner(editingId, data);
    } else {
        if (type === 'animal') await api.createAnimal(data);
        else if (type === 'owner') await api.createOwner(data);
        else if (type === 'appointment') await api.createAppointment(data);
        else if (type === 'medical') await api.createMedicalRecord(data);
    }
    
    modal.style.display = 'none';
    switchView(currentView);
  } catch (err) {
    alert('Error saving record: ' + err.message);
  }
};

closeModal.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

async function switchView(viewName) {
  currentView = viewName;
  viewTitle.textContent = viewName.charAt(0).toUpperCase() + (viewName === 'medical' ? 'edical Records' : viewName.slice(1));
  if (views[viewName]) await views[viewName]();
  
  navLinks.forEach(link => {
    if (link.dataset.view === viewName) link.classList.add('active');
    else link.classList.remove('active');
  });
}

navLinks.forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); switchView(link.dataset.view); }); });

switchView('dashboard');
