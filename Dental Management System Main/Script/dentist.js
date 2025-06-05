  

  //dentist js

  const dentists = [
  {
    id: "DENT001",
    registrationDate: "2024-10-15",
    name: "Dr. Aarthi Mehta",
    gender: "Female",
    age: 42,
    contact: "+91-9988776655",
    email: "aarthi.dent@example.com",
    idProofUrl: "uploads/id_aarthi.pdf",
    councilNumber: "TN-D-56321",
    availableDays: "Mon, Wed, Fri",
    roomNumber: "203",
    availableTime: "10:00 AM - 1:00 PM",
    experience: "15 Years",
    availability: "Available"
  }
];


// Attach event to each row (assumes 1:1 mapping with dentist array)
document.querySelectorAll("#dentistTable tr").forEach((row, index) => {
  row.addEventListener("dblclick", () => {
    const d = dentists[index];

    document.getElementById("viewDentistId").textContent = d.id;
    document.getElementById("viewRegistrationDate").textContent = d.registrationDate;
    document.getElementById("viewDentistName").textContent = d.name;
    document.getElementById("viewDentistGender").textContent = d.gender;
    document.getElementById("viewDentistAge").textContent = d.age;
    document.getElementById("viewDentistContact").textContent = d.contact;
    document.getElementById("viewDentistEmail").textContent = d.email;

    document.getElementById("viewDentistIdProofLink").href = d.idProofUrl || "#";
    document.getElementById("viewCouncilNumber").textContent = d.councilNumber || "-";
    document.getElementById("viewAvailableDays").textContent = d.availableDays || "-";
    document.getElementById("viewRoomNumber").textContent = d.roomNumber || "-";
    document.getElementById("viewAvailableTime").textContent = d.availableTime || "-";
    document.getElementById("viewExperience").textContent = d.experience || "-";

    const viewDentistModal = new bootstrap.Modal(document.getElementById("viewDentistModal"));
    viewDentistModal.show();
  });
});


 // Open Edit Modal from View Modal
  document.getElementById("editDentistBtn").addEventListener("click", () => {
    const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewDentistModal"));
    viewModal.hide();

    const editModal = new bootstrap.Modal(document.getElementById("editDentistModal"));
    const patientId = document.getElementById("viewPatientId").textContent;
    document.getElementById("patientId").value = patientId;

    // Populate other fields into the edit modal as needed...

    editModal.show();
  });



  // Dentist view available dates
// Dentist  add dentist available dates code 
  const availableDate = [];

  function addAvailableDate() {
    const dateInput = document.getElementById("available-date");
    const noteInput = document.getElementById("date-note");

    let date = dateInput.value.trim();
    let note = noteInput.value.trim();

    // If neither is provided
    if (!date && !note) {
      alert("Please enter a date or a note.");
      return;
    }

    // If note is a valid date and actual date field is empty, treat that as date
    if (!date && isValidDateFormat(note)) {
      date = note;
      note = "";
    }

    // Prevent duplicates (based on date + note combination)
    const exists = availableDate.find(d => d.date === date && d.note === note);
    if (exists) {
      alert("This entry is already added.");
      return;
    }

    availableDate.push({ date, note });
    renderAvailableDates();

    // Clear inputs
    dateInput.value = "";
    noteInput.value = "";
  }

  function isValidDateFormat(value) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(value);
  }

  function removeAvailableDate(index) {
    availableDate.splice(index, 1);
    renderAvailableDates();
  }

  function renderAvailableDates() {
    const list = document.getElementById("available-dates-list");
    list.innerHTML = "";

    availableDate.forEach((item, index) => {
      const chip = document.createElement("div");
      chip.className = "bg-light border rounded px-3 py-1 position-relative small text-muted";

      // Construct display text based on which fields exist
      let text = "";
      if (item.date && item.note) {
        text = `${item.date} - ${item.note}`;
      } else if (item.date) {
        text = item.date;
      } else {
        text = item.note;
      }

      chip.innerHTML = `
        <span class="p-2">${text}</span>
        <button class="btn-close position-absolute top-0 end-0 me-1 mt-1" onclick="removeAvailableDate(${index})" style="transform: scale(0.7);"></button>
      `;

      list.appendChild(chip);
    });
  }


// Edit Dentist available dates code
    const availableDate2 = [];

  function addAvailableDate2() {
    const dateInput = document.getElementById("available-date-2");
    const noteInput = document.getElementById("date-note-2");

    let date = dateInput.value.trim();
    let note = noteInput.value.trim();

    // Allow note to be treated as date if valid date format
    if (!date && isValidDateFormat(note)) {
      date = note;
      note = "";
    }

    if (!date && !note) {
      alert("Please enter a date or a note.");
      return;
    }

    const exists = availableDate2.find(d => d.date === date && d.note === note);
    if (exists) {
      alert("This entry is already added.");
      return;
    }

    availableDate2.push({ date, note });
    renderAvailableDates2();

    // Clear inputs after add
    dateInput.value = "";
    noteInput.value = "";
  }

  function removeAvailableDate2(index) {
    availableDate2.splice(index, 1);
    renderAvailableDates2();
  }

  function renderAvailableDates2() {
    const list = document.getElementById("available-dates-list-2");
    list.innerHTML = "";

    availableDate2.forEach((item, index) => {
      const chip = document.createElement("div");
      chip.className = "bg-light border rounded px-3 py-1 position-relative small text-muted";

      let text = "";
      if (item.date && item.note) {
        text = `${item.date} - ${item.note}`;
      } else if (item.date) {
        text = item.date;
      } else {
        text = item.note;
      }

      chip.innerHTML = `
        <span class="p-2">${text}</span>
        <button class="btn-close position-absolute top-0 end-0 me-1 mt-1" 
          onclick="removeAvailableDate2(${index})" style="transform: scale(0.7);"></button>
      `;

      list.appendChild(chip);
    });
  }

  function isValidDateFormat(value) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(value);
  }

  // Dentist add available dates code
// Array to store available dates
let availableDates = [];

// Function to add available date and note
function addAvailableDate() {
  const dateInput = document.getElementById('available-date').value;
  const noteInput = document.getElementById('date-note').value;

  if (dateInput) {
    availableDates.push({ date: dateInput, note: noteInput || '' });

    // Display added dates
    const datesList = document.getElementById('available-dates-list');
    const dateElement = document.createElement('div');
    dateElement.className = 'badge bg-secondary p-2';
    dateElement.textContent = `${dateInput} ${noteInput ? `(${noteInput})` : ''}`;
    datesList.appendChild(dateElement);

    // Clear inputs
    document.getElementById('available-date').value = '';
    document.getElementById('date-note').value = '';
  } else {
    alert('Please select a date.');
  }
}

// Function to calculate age based on DOB
function calculateAge() {
  const dobInput = document.getElementById('dob').value;
  if (dobInput) {
    const dob = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    document.getElementById('age').value = age;
  }
}

// Handle form submission
document.getElementById('dentistForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Validate gender and specialization
  const gender = document.getElementById('gender').value;
  const specialization = document.getElementById('specialization').value;
  if (!gender || !specialization) {
    alert('Please select a valid Gender and Specialization.');
    return;
  }

  // Validate councilId
  const councilId = document.getElementById('councilId').value;
  if (!councilId) {
    alert('Please enter a valid Council ID.');
    return;
  }

  // Collect form data
  const formData = {
    dentistId: document.getElementById('dentistId').value,
    registrationDate: document.getElementById('dentistRegDate').value,
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    gender: gender,
    dateOfBirth: document.getElementById('dob').value,
    age: document.getElementById('age').value,
    experience: document.querySelectorAll('input[type="number"]')[1].value, // Second number input (Experience)
    councilId: councilId,
    specialization: specialization,
    availableDates: availableDates,
    availableTime: {
      start: document.getElementById('start-time').value,
      end: document.getElementById('end-time').value
    },
    assignedRoom: document.querySelectorAll('input[type="text"]')[5].value, // Sixth text input (Assigned Room)
    email: document.querySelector('input[type="email"]').value,
    contactNumber: document.querySelector('input[type="tel"]').value,
    idProof: document.querySelector('input[type="file"]').files[0]?.name || ''
  };

  // Log JSON data to console
  console.log(JSON.stringify(formData, null, 2));

  // Reset form and available dates
  document.getElementById('dentistForm').reset();
  availableDates = [];
  document.getElementById('available-dates-list').innerHTML = '';
});

// Dentist edit available dates code
// Array to store available dates for the Edit modal
let availableDates2 = [];

// Function to add available date and note for the Edit modal
function addAvailableDate2() {
  const dateInput = document.getElementById('available-date-2').value;
  const noteInput = document.getElementById('date-note-2').value;

  if (dateInput) {
    availableDates2.push({ date: dateInput, note: noteInput || '' });

    // Display added dates
    const datesList = document.getElementById('available-dates-list-2');
    const dateElement = document.createElement('div');
    dateElement.className = 'badge bg-secondary p-2';
    dateElement.textContent = `${dateInput} ${noteInput ? `(${noteInput})` : ''}`;
    datesList.appendChild(dateElement);

    // Clear inputs
    document.getElementById('available-date-2').value = '';
    document.getElementById('date-note-2').value = '';
  } else {
    alert('Please select a date.');
  }
}

// Function to calculate age based on DOB for the Edit modal
function calculateDentistAge() {
  const dobInput = document.getElementById('editDob').value;
  if (dobInput) {
    const dob = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    document.getElementById('editAge').value = age;
  }
}

// Handle form submission for the Edit modal
document.getElementById('editDentistForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Validate gender and specialization
  const gender = document.getElementById('editGender').value;
  const specialization = document.getElementById('editSpecialization').value;
  if (!gender || !specialization) {
    alert('Please select a valid Gender and Specialization.');
    return;
  }

  // Collect form data
  const formData = {
    dentistId: document.getElementById('editDentistId').value,
    registrationDate: document.getElementById('editRegistrationDate').value,
    firstName: document.getElementById('editFirstName').value,
    lastName: document.getElementById('editLastName').value,
    gender: gender,
    dateOfBirth: document.getElementById('editDob').value,
    age: document.getElementById('editAge').value,
    experience: document.getElementById('editExperience').value,
    contactNumber: document.getElementById('editContact').value,
    email: document.getElementById('editEmail').value,
    idProof: document.getElementById('editIdProof').files[0]?.name || '',
    councilNumber: document.getElementById('editCouncilNumber').value,
    specialization: specialization,
    availableDates: availableDates2,
    assignedRoom: document.getElementById('editRoomNumber').value,
    availableTime: {
      start: document.getElementById('start-times').value,
      end: document.getElementById('end-times').value
    }
  };

  // Log JSON data to console
  console.log(JSON.stringify(formData, null, 2));

  // Reset form and available dates
  document.getElementById('editDentistForm').reset();
  availableDates2 = [];
  document.getElementById('available-dates-list-2').innerHTML = '';
});