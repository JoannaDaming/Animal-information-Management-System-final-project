const API_URL = 'http://localhost:3000/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export const fetchOwners = () => request('/owners');
export const fetchOwnerById = (id) => request(`/owners/${id}`);
export const createOwner = (data) => request('/owners', { method: 'POST', body: JSON.stringify(data) });
export const updateOwner = (id, data) => request(`/owners/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteOwner = (id) => request(`/owners/${id}`, { method: 'DELETE' });

export const fetchAnimals = () => request('/animals');
export const fetchAnimalById = (id) => request(`/animals/${id}`);
export const createAnimal = (data) => request('/animals', { method: 'POST', body: JSON.stringify(data) });
export const updateAnimal = (id, data) => request(`/animals/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteAnimal = (id) => request(`/animals/${id}`, { method: 'DELETE' });

export const fetchAppointments = () => request('/appointments');
export const createAppointment = (data) => request('/appointments', { method: 'POST', body: JSON.stringify(data) });
export const deleteAppointment = (id) => request(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({status: 'Cancelled'}) });

export const fetchMedicalRecords = () => request('/medical-records');
export const createMedicalRecord = (data) => request('/medical-records', { method: 'POST', body: JSON.stringify(data) });
