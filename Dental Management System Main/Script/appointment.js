// Sample data for demonstration
const appointments = [
  {
    appointmentId: "APT123",
    patientName: "prabhu",
    dateTime: "2025-05-27 10:30 AM",
    preferredDentist: "Dr. Smith",
    referral: "Friend",
    department: "Orthodontics",
    status: "Confirmed",
    bookingSource: "Online",
    createdBy: "Receptionist",
    notes: "Patient prefers morning appointments"
  }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners for table rows
  document.querySelectorAll("#appointmentsTableBody tr").forEach((row, index) => {
    row.addEventListener("dblclick", () => {
      const appointment = appointments[index];
      populateViewModal(appointment);
      
      const viewModal = new bootstrap.Modal(document.getElementById("viewAppointmentModal"));
      viewModal.show();
    });
  });

  // Add Appointment Form Submission
  document.querySelector('#newAppointmentModal .btn-success').addEventListener('click', function(e) {
    e.preventDefault();
    const formData = getFormData('newAppointmentModal');
    console.log("Adding new appointment:", JSON.stringify(formData, null, 2));
    
    // Add to appointments array
    appointments.push(formData);
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('newAppointmentModal'));
    modal.hide();
    document.querySelector('#newAppointmentModal form').reset();
    
    alert('Appointment added successfully!');
    console.log("Updated appointments list:", appointments);
  });

  // Edit Appointment Form Submission
  document.querySelector('#editAppointmentModal #saveChangesButton').addEventListener('click', function(e) {
    e.preventDefault();
    const formData = getFormData('editAppointmentModal');
    console.log("Editing appointment:", JSON.stringify(formData, null, 2));
    
    // Find and update the appointment
    const index = appointments.findIndex(a => a.appointmentId === formData.appointmentId);
    if (index !== -1) {
      appointments[index] = formData;
    }
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal'));
    modal.hide();
    
    alert('Appointment updated successfully!');
    console.log("Updated appointments list:", appointments);
  });

  // Open Edit Modal from View Modal
  document.getElementById("openAppointmentEditModalBtn").addEventListener("click", () => {
    const appointmentId = document.getElementById("viewAppointmentId").textContent;
    const appointment = appointments.find(a => a.appointmentId === appointmentId);
    
    if (appointment) {
      populateEditModal(appointment);
      
      const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewAppointmentModal"));
      viewModal.hide();
      
      const editModal = new bootstrap.Modal(document.getElementById("editAppointmentModal"));
      editModal.show();
    }
  });

  // Delete Confirmation
  document.getElementById("confirmYes").addEventListener("click", () => {
    const appointmentId = document.getElementById("viewAppointmentId").textContent;
    const index = appointments.findIndex(a => a.appointmentId === appointmentId);
    
    if (index !== -1) {
      console.log("Deleting appointment:", JSON.stringify(appointments[index], null, 2));
      appointments.splice(index, 1);
      
      const deleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmAppointmentDeleteModal'));
      deleteModal.hide();
      const viewModal = bootstrap.Modal.getInstance(document.getElementById('viewAppointmentModal'));
      viewModal.hide();
      
      alert('Appointment deleted successfully!');
      console.log("Updated appointments list:", appointments);
    }
  });

  // Initialize status colors
  document.querySelectorAll('select[onchange="updateStatusColor(this)"]').forEach(select => {
    updateStatusColor(select);
    select.addEventListener('change', function() {
      updateStatusColor(this);
    });
  });
});

// Helper function to populate view modal
function populateViewModal(appointment) {
  document.getElementById("viewAppointmentId").textContent = appointment.appointmentId || "-";
  document.getElementById("viewPatientName").textContent = appointment.patientName || "-";
  document.getElementById("viewDateTime").textContent = appointment.dateTime || "-";
  document.getElementById("viewDentist").textContent = appointment.preferredDentist || "-";
  document.getElementById("viewReferal").textContent = appointment.referral || "-";
  document.getElementById("viewDepartment").textContent = appointment.department || "-";
  document.getElementById("viewStatus").textContent = appointment.status || "-";
  document.getElementById("viewSource").textContent = appointment.bookingSource || "-";
  document.getElementById("viewCreated").textContent = appointment.createdBy || "-";
  document.getElementById("viewNotes").textContent = appointment.notes || "-";
}

// Helper function to populate edit modal
function populateEditModal(appointment) {
  const form = document.querySelector('#editAppointmentModal form');
  form.querySelector('input[type="text"]').value = appointment.appointmentId || "";
  form.querySelectorAll('input[type="text"]')[1].value = appointment.notes || ""; // Reason
  form.querySelectorAll('input[type="text"]')[2].value = appointment.patientName || "";
  
  // Split date and time
  if (appointment.dateTime) {
    const [datePart, timePart] = appointment.dateTime.split(' ');
    form.querySelector('input[type="date"]').value = datePart || "";
    form.querySelector('input[type="time"]').value = timePart || "";
  }
  
  form.querySelector('select').value = appointment.preferredDentist || "select";
  form.querySelectorAll('input[type="text"]')[3].value = appointment.referral || "";
  form.querySelectorAll('select')[1].value = appointment.department || "Choose...";
  form.querySelectorAll('select')[2].value = (appointment.status || "").toLowerCase().replace(' ', '_');
  form.querySelectorAll('select')[3].value = (appointment.bookingSource || "").toLowerCase().replace(' ', '_');
  form.querySelector('textarea').value = appointment.notes || "";
}

// Helper function to get form data
function getFormData(modalId) {
  const form = document.querySelector(`#${modalId} form`);
  return {
    appointmentId: form.querySelector('input[type="text"]').value,
    patientName: form.querySelectorAll('input[type="text"]')[2].value,
    dateTime: `${form.querySelector('input[type="date"]').value} ${form.querySelector('input[type="time"]').value}`,
    preferredDentist: form.querySelector('select').value,
    referral: form.querySelectorAll('input[type="text"]')[3].value,
    department: form.querySelectorAll('select')[1].value,
    status: form.querySelectorAll('select')[2].options[form.querySelectorAll('select')[2].selectedIndex].text,
    bookingSource: form.querySelectorAll('select')[3].value,
    createdBy: form.querySelector('input[readonly]').value,
    notes: form.querySelector('textarea').value
  };
}

// Table data Small modal js code
let selectedCell = null;
let saveData = {}; // { cellKey: [ { text, time }, ... ] }

function openSmallModal(cell) {
  selectedCell = cell;
  const cellKey = cell.dataset.id || cell.textContent.split('(')[0].trim();

  // Set current time
  const now = new Date();
  document.getElementById('currentTime').textContent = now.toLocaleTimeString();

  // Clear input
  document.getElementById('modalInput').value = '';

  // Populate previous notes
  const notes = saveData[cellKey] || [];
  const historyList = document.getElementById('noteHistory');
  historyList.innerHTML = '';
  notes.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.time} - ${entry.text}`;
    historyList.appendChild(li);
  });

  // Show count
  document.getElementById('saveCount').textContent = notes.length;

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('smallModal'));
  modal.show();
}

function saveModalNote() {
  const inputVal = document.getElementById('modalInput').value.trim();
  if (!inputVal || !selectedCell) return;

  const now = new Date();
  const time = now.toLocaleTimeString();
  const cellKey = selectedCell.dataset.id || selectedCell.textContent.split('(')[0].trim();

  if (!saveData[cellKey]) saveData[cellKey] = [];

  // Save note
  saveData[cellKey].push({ text: inputVal, time });

  // Update history list in modal
  const historyList = document.getElementById('noteHistory');
  const li = document.createElement('li');
  li.textContent = `${time} - ${inputVal}`;
  historyList.appendChild(li);

  // Update count
  document.getElementById('saveCount').textContent = saveData[cellKey].length;

  // Display latest note in cell
  const latestNote = inputVal;
  selectedCell.textContent = ` (${saveData[cellKey].length}) - ${latestNote}`;

  // Retain original cell key for future clicks
  selectedCell.dataset.id = cellKey;

  // Clear input
  document.getElementById('modalInput').value = '';
}

function clearModalNotes() {
  if (!selectedCell) return;
  const cellKey = selectedCell.dataset.id || selectedCell.textContent.split('(')[0].trim();

  if (!confirm("Are you sure you want to clear all saved records?")) return;

  // Clear data
  saveData[cellKey] = [];

  // Reset modal UI
  document.getElementById('saveCount').textContent = '0';
  document.getElementById('noteHistory').innerHTML = '';

  // Reset table cell
  selectedCell.textContent = 'Add Note';
}

// Appointment status color
function updateStatusColor(selectElem) {
  const value = selectElem.value;
  const emoji = selectElem.options[selectElem.selectedIndex].textContent.split(' ')[0];
  console.log("Status changed to:", value, "Emoji:", emoji);

  // Set background color based on status
  const colorMap = {
    booked: "#cce5ff",
    checked_in: "#ffeeba",
    in_progress: "#fff3cd",
    completed: "#d4edda",
    no_show: "#f8d7da",
    rescheduled: "#e2d6f9",
    pending_confirmation: "#fefefe",
    follow_up_due: "#e2e3e5"
  };

  selectElem.style.backgroundColor = colorMap[value] || "white";
}