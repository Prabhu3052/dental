
  const menuItems = document.querySelectorAll(".menu");
  const sections = document.querySelectorAll(".content-section");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      // Remove active class from all menu items
      menuItems.forEach(i => i.classList.remove("active"));

      // Add active class to clicked menu
      item.classList.add("active");

      // Hide all sections
      sections.forEach(section => section.classList.add("d-none"));

      // Show the selected section
      const target = item.getAttribute("data-section");
      document.getElementById(target).classList.remove("d-none");
    });
  });








  // Dropdown + input + condition tags logic
/* function setupFullConditionLogic(selectId, inputId, containerClass, hiddenInputId) {
  const select = document.getElementById(selectId);
  const input = document.getElementById(inputId);
  const container = document.querySelector("." + containerClass);
  const hiddenInput = document.getElementById(hiddenInputId);
  const added = new Set();

  function updateHiddenConditions() {
    const allValues = [...container.children].map(tag => tag.dataset.value);
    hiddenInput.value = allValues.join(",");
  }

  function addCondition(value) {
    const trimmedValue = value.trim();
    const normalized = trimmedValue.toLowerCase();
    const exists = [...container.children].some(
      tag => tag.dataset.value.toLowerCase() === normalized
    );
    if (!trimmedValue || exists) return;

    const tag = document.createElement("span");
    tag.className = "badge d-flex align-items-center";
    tag.style.paddingRight = "0.5rem";
    tag.style.backgroundColor = "#0077b6";
    tag.dataset.value = trimmedValue;
    tag.innerHTML = `
      ${trimmedValue}
      <button type="button" class="btn-close btn-close-white ms-2" aria-label="Remove"></button>
    `;

    tag.querySelector("button").onclick = () => {
      tag.remove();
      added.delete(normalized);
      updateHiddenConditions();
    };

    container.appendChild(tag);
    added.add(normalized);
    updateHiddenConditions();
  }

  select?.addEventListener("change", () => {
    addCondition(select.value);
    select.selectedIndex = 0;
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
      e.preventDefault();
      addCondition(input.value);
      input.value = "";
    }
  });
}

// Calls for full logic
setupFullConditionLogic("condition-select-1", "custom-condition-1", "condition-1", "conditionsHidden-1");
setupFullConditionLogic("condition-select-2", "custom-condition-2", "condition-2", "conditionsHidden-2"); */



function setupSimpleConditionLogic(selectId, containerClass) {
  const select = document.getElementById(selectId);
  const container = document.querySelector("." + containerClass);

  function addCondition(value) {
    const trimmedValue = value.trim();
    const normalized = trimmedValue.toLowerCase();
    const exists = [...container.children].some(
      tag => tag.dataset.value.toLowerCase() === normalized
    );
    if (!trimmedValue || exists) return;

    const tag = document.createElement("span");
    tag.className = "badge d-flex align-items-center";
    tag.style.paddingRight = "0.5rem";
    tag.style.backgroundColor = "#0077b6";
    tag.dataset.value = trimmedValue;
    tag.innerHTML = `
      ${trimmedValue}
      <button type="button" class="btn-close btn-close-white ms-2" aria-label="Remove"></button>
    `;

    tag.querySelector("button").onclick = () => {
      tag.remove();
    };

    container.appendChild(tag);
  }

  select?.addEventListener("change", () => {
    addCondition(select.value);
    select.selectedIndex = 0;
  });
}

// Call for dropdown-only logic
setupSimpleConditionLogic("condition-select-3", "condition-3");
setupSimpleConditionLogic("condition-select-4", "condition-4");
setupSimpleConditionLogic("condition-select-5", "condition-5");




  // Sample data for demonstration (add more fields as needed)
// --- Condition Tags Logic ---
function setupFullConditionLogic(selectId, inputId, containerClass, hiddenInputId) {
  const select = document.getElementById(selectId);
  const input = document.getElementById(inputId);
  const container = document.querySelector("." + containerClass);
  const hiddenInput = document.getElementById(hiddenInputId);
  const added = new Set();

  function updateHiddenConditions() {
    const allValues = [...container.children].map(tag => tag.dataset.value);
    hiddenInput.value = allValues.join(",");
  }

  function addCondition(value) {
    const trimmedValue = value.trim();
    const normalized = trimmedValue.toLowerCase();
    const exists = [...container.children].some(
      tag => tag.dataset.value.toLowerCase() === normalized
    );
    if (!trimmedValue || exists) return;

    const tag = document.createElement("span");
    tag.className = "badge d-flex align-items-center";
    tag.style.paddingRight = "0.5rem";
    tag.style.backgroundColor = "#0077b6";
    tag.dataset.value = trimmedValue;
    tag.innerHTML = `
      ${trimmedValue}
      <button type="button" class="btn-close btn-close-white ms-2" aria-label="Remove"></button>
    `;

    tag.querySelector("button").onclick = () => {
      tag.remove();
      added.delete(normalized);
      updateHiddenConditions();
    };

    container.appendChild(tag);
    added.add(normalized);
    updateHiddenConditions();
  }

  select?.addEventListener("change", () => {
    addCondition(select.value);
    select.selectedIndex = 0;
  });

  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim()) {
      e.preventDefault();
      addCondition(input.value);
      input.value = "";
    }
  });
}

// Initialize condition logic for condition sets
setupFullConditionLogic("condition-select-1", "custom-condition-1", "condition-1", "conditionsHidden-1");
// Add more if you have more condition groups
// setupFullConditionLogic("condition-select-2", "custom-condition-2", "condition-2", "conditionsHidden-2");


let currentStep = 1;

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const saveBtn = document.getElementById("saveBtn");

// Show the specified step in the multi-step form
const showStep = (step) => {
  document.querySelectorAll(".step").forEach(el => el.classList.add("d-none"));
  document.querySelector(".step-" + step).classList.remove("d-none");
  currentStep = step;

  prevBtn.classList.toggle("d-none", step === 1);
  nextBtn.classList.toggle("d-none", step === 4);
  saveBtn.classList.toggle("d-none", step !== 4);
};

nextBtn.addEventListener("click", () => {
  if(currentStep < 4) showStep(currentStep + 1);
});

prevBtn.addEventListener("click", () => {
  if(currentStep > 1) showStep(currentStep - 1);
});

// Show the first step initially
showStep(currentStep);

// On modal show, auto-generate Patient ID and registration date, show step 1
document.getElementById("addPatientModal").addEventListener("show.bs.modal", () => {
  document.getElementById("patientId").value = "PAT" + Date.now();
  document.getElementById("regDate").value = new Date().toISOString().split("T")[0];
  showStep(1);

  // Clear previous condition tags and hidden input
  const condContainer = document.querySelector(".condition-1");
  condContainer.innerHTML = "";
  document.getElementById("conditionsHidden-1").value = "";
});

// --- Auto-calculate Age from DOB ---
document.getElementById("dob").addEventListener("change", (e) => {
  const dob = new Date(e.target.value);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  document.getElementById("age").value = age >= 0 ? age : "";
});

// --- Save Patient Handler ---
saveBtn.addEventListener("click", () => {
  try {
    const newPatient = {
      id: document.getElementById("patientId").value,
      regDate: document.getElementById("regDate").value,
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      age: document.getElementById("age").value,
      contact: document.getElementById("contact").value.trim(),
      emergencyContact: document.getElementById("emergencyContact").value.trim(),
      bloodGroup: document.getElementById("bloodGroup").value,
      pregnantNursing: document.getElementById("pregnancy").value,
      bleedingDisorders: document.getElementById("bleedingDisorder").value,
      smoking: document.getElementById("smoking").value,
      specialNeeds: document.getElementById("specialNeeds").value.trim(),
      insuranceProvider: document.getElementById("insuranceProvider").value.trim(),
      policyNumber: document.getElementById("policyNumber").value.trim(),
      validity: document.getElementById("validity").value,
      coverageDetails: document.getElementById("coverageDetails").value.trim(),
      consentGiven: document.getElementById("consentCheck").checked,
      // Save the existing conditions from hidden input
      existingConditions: document.getElementById("conditionsHidden-1").value || "",
    };

    // Retrieve existing stored patients or start fresh
    const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    storedPatients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(storedPatients));

    // Add to patients table
    const tbody = document.getElementById("patientsTableBody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${newPatient.id}</td>
      <td>${newPatient.firstName} ${newPatient.lastName}</td>
      <td>${newPatient.gender}</td>
      <td>${newPatient.age}</td>
      <td>${newPatient.contact}</td>
    `;
    tbody.appendChild(row);

    // Reset form and close modal
    patientForm.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById("addPatientModal"));
    modal.hide();
  } catch (error) {
    console.error("Error saving patient:", error);
    alert("Failed to save patient. Please check your inputs.");
  }
});

// --- Load patients on page load ---
window.addEventListener("DOMContentLoaded", () => {
  const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
  const tbody = document.getElementById("patientsTableBody");

  storedPatients.forEach((p) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.firstName} ${p.lastName}</td>
      <td>${p.gender}</td>
      <td>${p.age}</td>
      <td>${p.contact}</td>
    `;
    tbody.appendChild(row);
  });
});

// --- View patient on row double click ---
document.getElementById("patientsTableBody").addEventListener("dblclick", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;

  const clickedId = row.cells[0].textContent; // Patient ID is first cell
  const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
  const p = storedPatients.find((pat) => pat.id === clickedId);
  if (!p) return;

  // Populate view modal fields
  document.getElementById("viewPatientId").textContent = p.id;
  document.getElementById("viewName").textContent = `${p.firstName} ${p.lastName}`;
  document.getElementById("viewGender").textContent = p.gender;
  document.getElementById("viewAge").textContent = p.age;
  document.getElementById("viewContact").textContent = p.contact || "-";
  document.getElementById("viewEmergencyContact").textContent = p.emergencyContact || "-";

  // ID Proof file name (if you want, link or just text)
  document.getElementById("viewIdProofLink").textContent = p.idProofFileName || "-";
  document.getElementById("viewIdProofLink").href = "#"; // Adjust if you have real URLs

  // Show existing conditions nicely
  document.getElementById("viewConditions").textContent = p.existingConditions || "-";

  // Other fields (insurance, consent, etc.)
  document.getElementById("viewInsuranceProvider").textContent = p.insuranceProvider || "-";
  document.getElementById("viewPolicyNumber").textContent = p.policyNumber || "-";
  document.getElementById("viewInsuranceValidity").textContent = p.validity || "-";
  document.getElementById("viewCoverage").textContent = p.coverageDetails || "-";

  document.getElementById("viewConsentCheckbox").textContent = p.consentGiven ? "Yes" : "No";
  document.getElementById("viewConsentFileLink").textContent = p.consentFormFileName || "-";
  document.getElementById("viewConsentFileLink").href = "#"; // Adjust as needed

  document.getElementById("viewBloodGroup").textContent = p.bloodGroup || "-";
  document.getElementById("viewSpecialNeeds").textContent = p.specialNeeds || "-";
  document.getElementById("viewPregnantNursing").textContent = p.pregnantNursing || "-";
  document.getElementById("viewBleedingDisorders").textContent = p.bleedingDisorders || "-";
  document.getElementById("viewSmoking").textContent = p.smoking || "-";

  // Show the modal
  const viewModal = new bootstrap.Modal(document.getElementById("viewPatientModal"));
  viewModal.show();
});


let teeth = [
  // Upper Jaw (1–16)
  {id: 1, type: 'Wisdom', treatment: '', status: ''},
  {id: 2, type: 'Molars', treatment: '', status: ''},
  {id: 3, type: 'Molars', treatment: '', status: ''},
  {id: 4, type: 'Premolars', treatment: '', status: ''},
  {id: 5, type: 'Premolars', treatment: '', status: ''},
  {id: 6, type: 'Canines', treatment: '', status: ''},
  {id: 7, type: 'Incisors', treatment: '', status: ''},
  {id: 8, type: 'Incisors', treatment: '', status: ''},
  {id: 9, type: 'Incisors', treatment: '', status: ''},
  {id: 10, type: 'Incisors', treatment: '', status: ''},
  {id: 11, type: 'Canines', treatment: '', status: ''},
  {id: 12, type: 'Premolars', treatment: '', status: ''},
  {id: 13, type: 'Premolars', treatment: '', status: ''},
  {id: 14, type: 'Molars', treatment: '', status: ''},
  {id: 15, type: 'Molars', treatment: '', status: ''},
  {id: 16, type: 'Wisdom', treatment: '', status: ''},

  // Lower Jaw (17–32)
  {id: 17, type: 'Wisdom', treatment: '', status: ''},
  {id: 18, type: 'Molars', treatment: '', status: ''},
  {id: 19, type: 'Molars', treatment: '', status: ''},
  {id: 20, type: 'Premolars', treatment: '', status: ''},
  {id: 21, type: 'Premolars', treatment: '', status: ''},
  {id: 22, type: 'Canines', treatment: '', status: ''},
  {id: 23, type: 'Incisors', treatment: '', status: ''},
  {id: 24, type: 'Incisors', treatment: '', status: ''},
  {id: 25, type: 'Incisors', treatment: '', status: ''},
  {id: 26, type: 'Incisors', treatment: '', status: ''},
  {id: 27, type: 'Canines', treatment: '', status: ''},
  {id: 28, type: 'Premolars', treatment: '', status: ''},
  {id: 29, type: 'Premolars', treatment: '', status: ''},
  {id: 30, type: 'Molars', treatment: '', status: ''},
  {id: 31, type: 'Molars', treatment: '', status: ''},
  {id: 32, type: 'Wisdom', treatment: '', status: ''}
];

const mouth = document.getElementById('mouth');
const addToothTypeSelect = document.getElementById('addToothType');
const addToothCountSelect = document.getElementById('addToothCount');
const addToothPositionSelect = document.getElementById('addToothPosition');
const btnAddTeeth = document.getElementById('btnAddTeeth');
const jawRadios = document.querySelectorAll('input[name="jaw"]');

let selectedToothId = null;

function renderMouth() {
  mouth.innerHTML = '';
  for (let i = 0; i < teeth.length; i++) {
    const tooth = teeth[i];
    const toothDiv = document.createElement('div');
    toothDiv.classList.add('tooth', tooth.type);
    toothDiv.dataset.id = tooth.id;

    const numSpan = document.createElement('span');
    numSpan.classList.add('tooth-number');
    numSpan.textContent = tooth.id;
    toothDiv.appendChild(numSpan);

    const dot = document.createElement('div');
    dot.classList.add('status-dot');
    if (tooth.status === 'ongoing') dot.classList.add('status-ongoing');
    else if (tooth.status === 'completed') dot.classList.add('status-completed');
    toothDiv.appendChild(dot);

    toothDiv.appendChild(document.createTextNode(tooth.type[0]));

    if (selectedToothId === tooth.id) toothDiv.classList.add('selected');

    toothDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedToothId = tooth.id;
      renderMouth();
      showTreatmentDetails(tooth);
    });

    toothDiv.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      if (confirm(`Delete tooth #${tooth.id} (${tooth.type})?`)) {
        deleteTooth(tooth.id);
      }
    });

    mouth.appendChild(toothDiv);
  }
}

const noSelectionDiv = document.getElementById('noSelection');
const treatmentInfoDiv = document.getElementById('treatmentInfo');
const infoId = document.getElementById('infoId');
const infoType = document.getElementById('infoType');
const infoTreatment = document.getElementById('infoTreatment');
const infoStatus = document.getElementById('infoStatus');

function showTreatmentDetails(tooth) {
  noSelectionDiv.style.display = 'none';
  treatmentInfoDiv.style.display = 'block';
  infoId.textContent = tooth.id;
  infoType.textContent = tooth.type;
  infoTreatment.textContent = tooth.treatment || 'No treatment';
  infoStatus.textContent = tooth.status || 'None';
}

function deleteTooth(id) {
  teeth = teeth.filter(t => t.id !== id);
  if (selectedToothId === id) {
    selectedToothId = null;
    noSelectionDiv.style.display = 'block';
    treatmentInfoDiv.style.display = 'none';
  }
  renderMouth();
  updateAddPositionOptions();
}

function addTeeth(type, count, position) {
  let maxId = teeth.reduce((max, t) => Math.max(max, t.id), 0);
  for (let i = 0; i < count; i++) {
    maxId++;
    teeth.splice(position + i, 0, { id: maxId, type, treatment: '', status: '' });
  }
  renderMouth();
  updateAddPositionOptions();
}

function updateAddPositionOptions() {
  const selectedType = addToothTypeSelect.value;
  const selectedJaw = [...jawRadios].find(r => r.checked).value;
  addToothPositionSelect.innerHTML = '';

  const startIdx = selectedJaw === 'upper' ? 0 : 16;
  const endIdx = selectedJaw === 'upper' ? 16 : teeth.length;

  const indexes = teeth
    .map((t, i) => (i >= startIdx && i < endIdx && t.type === selectedType) ? i : -1)
    .filter(i => i !== -1);

  if (indexes.length === 0) {
    addToothPositionSelect.innerHTML = `
      <option value="${startIdx}">Start (Position ${startIdx})</option>
      <option value="${endIdx}">End (Position ${endIdx})</option>
    `;
  } else {
    indexes.forEach(idx => {
      addToothPositionSelect.innerHTML += `
        <option value="${idx}">Before tooth #${teeth[idx].id} (pos ${idx})</option>
        <option value="${idx + 1}">After tooth #${teeth[idx].id} (pos ${idx + 1})</option>
      `;
    });
  }
}

addToothTypeSelect.addEventListener('change', updateAddPositionOptions);
jawRadios.forEach(r => r.addEventListener('change', updateAddPositionOptions));

btnAddTeeth.addEventListener('click', () => {
  const type = addToothTypeSelect.value;
  const count = parseInt(addToothCountSelect.value);
  const position = parseInt(addToothPositionSelect.value);
  addTeeth(type, count, position);
});

document.body.addEventListener('click', () => {
  selectedToothId = null;
  renderMouth();
  noSelectionDiv.style.display = 'block';
  treatmentInfoDiv.style.display = 'none';
});

updateAddPositionOptions();
renderMouth();


  // Sample data for demonstration (add more fields as needed)
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

  // Open View Modal when table row is clicked
  document.querySelectorAll("#appointmentsTableBody  tr").forEach((row, index) => {
    row.addEventListener("dblclick", () => {
      const a = appointments[index];

     document.getElementById("viewAppointmentId").textContent = a.appointmentId || "-";
document.getElementById("viewPatientName").textContent = a.patientName || "-";
document.getElementById("viewDateTime").textContent = a.dateTime || "-";
document.getElementById("viewDentist").textContent = a.preferredDentist || "-";
document.getElementById("viewReferal").textContent = a.referral || "-";
document.getElementById("viewDepartment").textContent = a.department || "-";
document.getElementById("viewStatus").textContent = a.status || "-";
document.getElementById("viewSource").textContent = a.bookingSource || "-";
document.getElementById("viewCreated").textContent = a.createdBy || "-";
document.getElementById("viewNotes").textContent = a.notes || "-";


      const viewModal = new bootstrap.Modal(document.getElementById("viewAppointmentModal"));
      viewModal.show();
    });
  });



 // Open Edit Modal from View Modal
  document.getElementById("openAppointmentEditModalBtn").addEventListener("click", () => {
    const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewAppointmentModal"));
    viewModal.hide();

    const editModal = new bootstrap.Modal(document.getElementById("editAppointmentModal"));
    const patientId = document.getElementById("viewPatientId").textContent;
    document.getElementById("patientId").value = patientId;

    // Populate other fields into the edit modal as needed...

    editModal.show();
  });


  

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



  let treatmentCurrentStep = 1;

const treatmentPrevBtn = document.getElementById("treatmentPrevBtn");
const treatmentNextBtn = document.getElementById("treatmentNextBtn");
const treatmentSubmitBtn = document.getElementById("treatmentSubmitBtn");

const treatmentShowStep = (step) => {
  document.querySelectorAll(".treatmentStep").forEach(el => el.classList.add("d-none"));
  const stepEl = document.querySelector(".treatmentStep-" + step);
  if (stepEl) stepEl.classList.remove("d-none");

  treatmentCurrentStep = step;

  treatmentPrevBtn.style.display = step === 1 ? "none" : "inline-block";
  treatmentNextBtn.style.display = step === 2 ? "none" : "inline-block";
  treatmentSubmitBtn.style.display = step === 2 ? "inline-block" : "none";
};

treatmentNextBtn.addEventListener("click", () => {
  if (treatmentCurrentStep < 2) treatmentShowStep(treatmentCurrentStep + 1);
});

treatmentPrevBtn.addEventListener("click", () => {
  if (treatmentCurrentStep > 1) treatmentShowStep(treatmentCurrentStep - 1);
});

// Initialize first step on modal show
document.getElementById("addTreatmentModal").addEventListener("shown.bs.modal", () => {
  treatmentShowStep(1);
});






  //billing js

  const billing = [
  {
    invoiceId: "INV12345",
    registrationDate: "2024-10-15",
    patientId: "PAT001",
    patientName: "John Doe",
    appointmentId: "APT1001",
    totalAmount: "₹5,000",
    amountPaid: "₹4,000",
    paymentMode: "Credit Card",
    paymentStatus: "Partial",
    insuranceClaim: "Claimed"
  }
];


// Attach event to each row (assumes 1:1 mapping with dentist array)
document.querySelectorAll("#billingTableBody tr").forEach((row, index) => {
  row.addEventListener("dblclick", () => {
    const b = billing[index];

   document.getElementById("viewInvoice").textContent = b.invoiceId|| "-";
    document.getElementById("viewDate").textContent = b.registrationDate || "-";
    document.getElementById("viewPatient").textContent = b.patientId || "-";
    document.getElementById("viewPatientNames").textContent = b.patientName || "-";
    document.getElementById("viewAppointment").textContent = b.appointmentId || "-";
    document.getElementById("viewTotal").textContent = b.totalAmount || "-";
    document.getElementById("viewPaid").textContent = b.amountPaid || "-";
    document.getElementById("viewMode").textContent = b.paymentMode || "-";
    document.getElementById("viewPaymentStatus").textContent = b.paymentStatus || "-";
    document.getElementById("viewInsuranceClaim").textContent = b.insuranceClaim || "-";

    const viewDentistModal = new bootstrap.Modal(document.getElementById("viewBillingModal"));
    viewDentistModal.show();
  });
});


 // Open Edit Modal from View Modal
  document.getElementById("openBillingEditModalBtn").addEventListener("click", () => {
    const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewBillingModal"));
    viewModal.hide();

    const editModal = new bootstrap.Modal(document.getElementById("editBillingModal"));


    // Populate other fields into the edit modal as needed...

    editModal.show();
  });


  //treatment js

const treatments = [
  {
    treatmentId: "TRT-1023",
    patientName: "John Doe",
    dentistName: "Dr. Anita Sharma",
    treatmentType: "Root Canal Therapy",
    status: "Ongoing",
    dateTime: "2025-05-27 10:30 AM",
    appointmentId: "APPT001",
    patientId: "PAT001",
    dentistId: "DENT001",
    bookedBy: "Receptionist",
    diagnosis: "Severe infection in tooth #12",
    prescription: "Amoxicillin 500mg",
    reportsUrl: "uploads/report_trt1023.pdf",
    followUp: "Yes - 1 week later",
    toothNotes: "Tooth #12 cleaned and medicated",
    nextVisit: "2025-06-03"
  },
  {
    treatmentId: "TRT-1024",
    patientName: "Emily Watson",
    dentistName: "Dr. Raj Patel",
    treatmentType: "Tooth Extraction",
    status: "Completed",
    dateTime: "2025-05-26 02:00 PM",
    appointmentId: "APPT002",
    patientId: "PAT002",
    dentistId: "DENT002",
    bookedBy: "Online Portal",
    diagnosis: "Severe decay beyond restoration",
    prescription: "Ibuprofen 400mg",
    reportsUrl: "uploads/report_trt1024.pdf",
    followUp: "None required",
    toothNotes: "Tooth #18 extracted cleanly",
    nextVisit: "-"
  }
];





// Add event listeners to table rows to open the treatment modal
document.querySelectorAll("#treatmentTable tr").forEach((row, index) => {
  row.addEventListener("dblclick", () => {
    const t = treatments[index];

    document.getElementById("viewTreatmentId").textContent = t.treatmentId;
    document.getElementById("viewAppointmentId").textContent = t.appointmentId;
    document.getElementById("viewPatientId").textContent = t.patientId;
    document.getElementById("viewTreatmentDentistId").textContent = t.dentistId;
    document.getElementById("viewBookedBy").textContent = t.bookedBy;
    document.getElementById("viewTreatmentType").textContent = t.treatmentType;
    document.getElementById("viewDiagnosis").textContent = t.diagnosis;
    document.getElementById("viewPrescription").textContent = t.prescription;
    document.getElementById("viewReportsLink").href = t.reportsUrl || "#";
    document.getElementById("viewFollowUp").textContent = t.followUp || "-";
    document.getElementById("viewToothNotes").textContent = t.toothNotes || "-";
    document.getElementById("viewTreatmentStatus").textContent = t.status;
    document.getElementById("viewNextVisit").textContent = t.nextVisit || "-";

    const treatmentModal = new bootstrap.Modal(document.getElementById("viewTreatmentModal"));
    treatmentModal.show();
  });
});

//Edit Modal treatment tab
  document.getElementById("editTreatmentBtn").addEventListener("click", () => {
    const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewTreatmentModal"));
    viewModal.hide();

    const editModal = new bootstrap.Modal(document.getElementById("editTreatmentModal"));
    editModal.show();
  });

   function showDashboardTab(tabName, event) {
    document.querySelectorAll('.dashboard-tab-content').forEach(div => div.classList.add('d-none'));
    document.querySelector('#tab-' + tabName).classList.remove('d-none');
    document.querySelectorAll('#dashboardTabs .nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
  }



let allTeeth = [
  // Upper Jaw (1–16)
  {id: 1, type: 'Wisdom', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 2, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 3, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 4, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 5, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 6, type: 'Canines', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 7, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 8, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 9, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 10, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 11, type: 'Canines', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 12, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 13, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 14, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 15, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 16, type: 'Wisdom', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  // Lower Jaw (17–32)
  {id: 17, type: 'Wisdom', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 18, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 19, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 20, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 21, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 22, type: 'Canines', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 23, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 24, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 25, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 26, type: 'Incisors', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 27, type: 'Canines', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 28, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 29, type: 'Premolars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 30, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 31, type: 'Molars', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
  {id: 32, type: 'Wisdom', treatment: '', status: '', treatmentDate: '', treatmentTime: ''},
];

const mouthEl = document.getElementById('teethGrid');
const noSelectionEl = document.getElementById('noToothSelected');
const treatmentInfoEl = document.getElementById('singleToothDetails');
const editForm = document.getElementById('singleEditForm');
const cancelBtn = document.getElementById('cancelSingleEdit');

const editMultipleBtn = document.getElementById('multiEditBtn');
const editMultipleForm = document.getElementById('multiEditForm');
const cancelMultipleBtn = document.getElementById('cancelMultiEdit');

const multiSelectToggle = document.getElementById('enableMultiSelect');

let activeToothId = null;
let editMode = false;
let selectedMultiIds = new Set();

// Helper format functions
function formatDate(dateStr) {
  return dateStr || '';
}
function formatTime(timeStr) {
  return timeStr || '';
}

// Render teeth grid
function renderTeeth() {
  mouthEl.innerHTML = '';
  allTeeth.forEach(tooth => {
    const toothDiv = document.createElement('div');
    toothDiv.classList.add('tooth');
    toothDiv.classList.add(tooth.type.toLowerCase()); // e.g. 'molars', 'wisdom' lowercase
    toothDiv.id = `tooth-${tooth.id}`;
    toothDiv.title = `Tooth ${tooth.id} (${tooth.type})\nTreatment: ${tooth.treatment || 'None'}`;

    toothDiv.appendChild(document.createTextNode(tooth.type[0]));

    const numSpan = document.createElement('span');
    numSpan.classList.add('tooth-number');
    numSpan.textContent = tooth.id;
    toothDiv.appendChild(numSpan);

    if(tooth.status) {
      toothDiv.classList.add(tooth.status.toLowerCase()); // e.g. 'ongoing', 'completed'
    }


    // *** Add this here ***
  if(tooth.id === activeToothId) {
    toothDiv.classList.add('active');
  } else {
    toothDiv.classList.remove('active');
  }

    // Checkbox for multi-select
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('tooth-checkbox');
    checkbox.dataset.toothId = tooth.id;
    checkbox.style.display = multiSelectToggle.checked ? 'inline-block' : 'none';

    checkbox.checked = selectedMultiIds.has(tooth.id);

    checkbox.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.toothId);
      if(e.target.checked){
        selectedMultiIds.add(id);
      } else {
        selectedMultiIds.delete(id);
      }
      updateMultiEditButton();
      clearSingleSelection();
      renderInfoPanel();
    });

    toothDiv.appendChild(checkbox);

 toothDiv.addEventListener('click', (e) => {
  if (editMode) return; // ignore clicks when editing
  if (e.target === checkbox) return;

  if (multiSelectToggle.checked) {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
  } else {
    activeToothId = tooth.id;
    renderTeeth(); // re-render to show 'active' class
    renderInfoPanel();
  }
});


    toothDiv.addEventListener('dblclick', (e) => {
      if(multiSelectToggle.checked) return; // disable editing in multi-select mode
      activeToothId = tooth.id;
      enterEditMode();
    });

    // Status dot
    const dot = document.createElement('div');
    dot.classList.add('status-dot');
    if (tooth.status.toLowerCase() === 'ongoing') dot.classList.add('status-ongoing');
    else if (tooth.status.toLowerCase() === 'completed') dot.classList.add('status-completed');
    toothDiv.appendChild(dot);

    mouthEl.appendChild(toothDiv);
  });
}

// Render info panel
function renderInfoPanel() {
  if(multiSelectToggle.checked){
    if(selectedMultiIds.size > 0){
      noSelectionEl.style.display = 'none';
      treatmentInfoEl.style.display = 'none';
      editForm.style.display = 'none';
      editMultipleForm.style.display = 'block';
    } else {
      noSelectionEl.style.display = 'block';
      treatmentInfoEl.style.display = 'none';
      editForm.style.display = 'none';
      editMultipleForm.style.display = 'none';
    }
  } else {
    if(activeToothId === null){
      noSelectionEl.style.display = 'block';
      treatmentInfoEl.style.display = 'none';
      editForm.style.display = 'none';
      editMultipleForm.style.display = 'none';
    } else {
      noSelectionEl.style.display = 'none';
      editForm.style.display = 'none';
      editMultipleForm.style.display = 'none';
      treatmentInfoEl.style.display = 'block';

      const tooth = allTeeth.find(t => t.id === activeToothId);
      if(!tooth) return;
      document.getElementById('detailToothId').textContent = tooth.id;
      document.getElementById('detailToothType').textContent = tooth.type;
      document.getElementById('detailTreatment').textContent = tooth.treatment || 'None';
      document.getElementById('detailStatus').textContent = tooth.status || 'None';
      document.getElementById('detailDate').textContent = formatDate(tooth.treatmentDate);
      document.getElementById('detailTime').textContent = formatTime(tooth.treatmentTime);
    }
  }
}

function enterEditMode() {
  if(activeToothId === null) return;

  editMode = true;
  treatmentInfoEl.style.display = 'none';
  noSelectionEl.style.display = 'none';
  editMultipleForm.style.display = 'none';
  editForm.style.display = 'block';

  const tooth = allTeeth.find(t => t.id === activeToothId);
  if(!tooth) return;

  document.getElementById('editToothId').textContent = tooth.id;
  document.getElementById('editToothType').textContent = tooth.type;
  document.getElementById('treatmentEditInput').value = tooth.treatment;
  document.getElementById('statusEditSelect').value = tooth.status;
  document.getElementById('dateEditInput').value = tooth.treatmentDate;
  document.getElementById('timeEditInput').value = tooth.treatmentTime;
}

function exitEditMode() {
  editMode = false;
  editForm.style.display = 'none';
  renderInfoPanel();
}

function clearSingleSelection() {
  activeToothId = null;
}

function updateMultiEditButton() {
  editMultipleBtn.style.display = selectedMultiIds.size > 0 ? 'inline-block' : 'none';
}

multiSelectToggle.addEventListener('change', () => {
  selectedMultiIds.clear();
  activeToothId = null;
  updateMultiEditButton();
  renderTeeth();
  renderInfoPanel();
});

// Cancel single edit
cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  exitEditMode();
});

// Save single tooth edit
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(activeToothId === null) return;

  const tooth = allTeeth.find(t => t.id === activeToothId);
  if(!tooth) return;

  tooth.treatment = document.getElementById('treatmentEditInput').value.trim();
  tooth.status = document.getElementById('statusEditSelect').value;
  tooth.treatmentDate = document.getElementById('dateEditInput').value;
  tooth.treatmentTime = document.getElementById('timeEditInput').value;

  exitEditMode();
  renderTeeth();
});

// Show multi-edit form
editMultipleBtn.addEventListener('click', () => {
  if(selectedMultiIds.size === 0) return;

  editForm.style.display = 'none';
  treatmentInfoEl.style.display = 'none';
  noSelectionEl.style.display = 'none';
  editMultipleForm.style.display = 'block';

  document.getElementById('multiTreatmentInput').value = '';
  document.getElementById('multiStatusSelect').value = '';
  document.getElementById('multiDateInput').value = '';
  document.getElementById('multiTimeInput').value = '';
});

// Cancel multi-edit
cancelMultipleBtn.addEventListener('click', (e) => {
  e.preventDefault();
  editMultipleForm.style.display = 'none';
  renderInfoPanel();
});

// Save multi-edit form
editMultipleForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTreatment = document.getElementById('multiTreatmentInput').value.trim();
  const newStatus = document.getElementById('multiStatusSelect').value;
  const newDate = document.getElementById('multiDateInput').value;
  const newTime = document.getElementById('multiTimeInput').value;

  selectedMultiIds.forEach(id => {
    const tooth = allTeeth.find(t => t.id === id);
    if(tooth){
      if(newTreatment !== '') tooth.treatment = newTreatment;
      if(newStatus !== '') tooth.status = newStatus;
      if(newDate !== '') tooth.treatmentDate = newDate;
      if(newTime !== '') tooth.treatmentTime = newTime;
    }
  });

  selectedMultiIds.clear();
  editMultipleForm.style.display = 'none';
  multiSelectToggle.checked = false;
  renderTeeth();
  renderInfoPanel();
  updateMultiEditButton();
});

// Initial render
renderTeeth();
renderInfoPanel();
updateMultiEditButton();



  // Chart Configuration
  const chartConfigs = {
    overviewChart: {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Patients',
          data: [120, 150, 180, 210, 240, 280],
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          fill: true,
          tension: 0.3
        }, {
          label: 'Returning Patients',
          data: [80, 90, 110, 130, 150, 170],
          borderColor: '#1cc88a',
          backgroundColor: 'rgba(28, 200, 138, 0.05)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    },
    overviewAppointmentsChart: {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Cancelled', 'Rescheduled', 'No Show'],
        datasets: [{
          data: [100, 50, 10, 6],
          backgroundColor: ['#1cc88a', '#e74a3b', '#f6c23e', '#858796']
        }]
      },
      options: {
        cutout: '30%',
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    genderChart: {
      type: 'pie',
      data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
          data: [45, 52, 3],
          backgroundColor: ['#36b9cc', '#1cc88a', '#f6c23e']
        }]
      },
      options: {
        cutout: '30%',
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    ageGroupChart: {
      type: 'bar',
      data: {
        labels: ['0-18', '19-35', '36-50', '51+'],
        datasets: [{
          label: 'Patients',
          data: [120, 580, 320, 228],
          backgroundColor: '#4e73df'
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    },
    newPatientsChart: {
      type: 'line',
      data: {
        labels: Array.from({length: 30}, (_, i) => i+1),
        datasets: [{
          label: 'New Patients',
          data: Array.from({length: 30}, () => Math.floor(Math.random() * 10) + 2),
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Day of Month'
            }
          },
          y: {
            title: {
              display: true,
              text: 'New Patients'
            }
          }
        }
      }
    },
    appointmentTrendsChart: {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Appointments',
          data: [18, 22, 19, 25, 21, 12],
          borderColor: '#4e73df',
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    },
    appointmentStatusChart: {
      type: 'pie',
      data: {
        labels: ['Completed', 'Cancelled', 'Rescheduled'],
        datasets: [{
          data: [72, 15, 13],
          backgroundColor: ['#1cc88a', '#e74a3b', '#f6c23e']
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    treatmentTypeChart: {
      type: 'doughnut',
      data: {
        labels: ['Preventive', 'Restorative', 'Cosmetic', 'Surgical'],
        datasets: [{
          data: [35, 40, 15, 10],
          backgroundColor: ['#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b']
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    },
    commonTreatmentsChart: {
      type: 'bar',
      data: {
        labels: ['Cleaning', 'Filling', 'Extraction', 'Whitening', 'Checkup'],
        datasets: [{
          label: 'Procedures',
          data: [320, 280, 150, 90, 400],
          backgroundColor: '#4e73df'
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    },
    treatmentAgeChart: {
      type: 'bar',
      data: {
        labels: ['0-18', '19-35', '36-50', '51+'],
        datasets: [
          {
            label: 'Preventive',
            data: [65, 40, 30, 45],
            backgroundColor: '#1cc88a'
          },
          {
            label: 'Restorative',
            data: [30, 45, 50, 60],
            backgroundColor: '#36b9cc'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    },
    treatmentRevenueChart: {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Preventive',
            data: [2500, 2800, 3200, 2900, 3100, 3500],
            backgroundColor: '#1cc88a'
          },
          {
            label: 'Restorative',
            data: [4200, 4500, 4800, 5100, 5400, 5800],
            backgroundColor: '#36b9cc'
          },
          {
            label: 'Cosmetic',
            data: [1800, 2000, 2200, 2500, 2700, 3000],
            backgroundColor: '#f6c23e'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    },
    dentistAppointmentsChart: {
      type: 'bar',
      data: {
        labels: ['Dr. Smith', 'Dr. Lee', 'Dr. Patel', 'Dr. Garcia'],
        datasets: [{
          label: 'This Month',
          data: [42, 38, 35, 28],
          backgroundColor: '#1cc88a'
        }, {
          label: 'Last Month',
          data: [38, 35, 32, 25],
          backgroundColor: '#36b9cc'
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    },
    dentistRatingsChart: {
      type: 'radar',
      data: {
        labels: ['Expertise', 'Bedside Manner', 'Punctuality', 'Communication', 'Facility'],
        datasets: [
          {
            label: 'Dr. Smith',
            data: [4.8, 4.5, 4.2, 4.7, 4.3],
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.1)'
          },
          {
            label: 'Dr. Lee',
            data: [4.6, 4.8, 4.5, 4.6, 4.4],
            borderColor: '#1cc88a',
            backgroundColor: 'rgba(28, 200, 138, 0.1)'
          }
        ]
      },
      options: {
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 5
          }
        }
      }
    },
    dentistAvailabilityChart: {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Dr. Smith',
            data: [8, 8, 6, 8, 6, 4],
            backgroundColor: '#4e73df'
          },
          {
            label: 'Dr. Lee',
            data: [6, 8, 8, 6, 8, 4],
            backgroundColor: '#1cc88a'
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: 'top'
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Hours Available'
            }
          }
        }
      }
    },
    billingTypeChart:{
       type: 'pie',
  data: {
    labels: ['Insurance', 'Cash', 'Online Payment'],
    datasets: [{
      data: [45, 30, 25],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
    },
    monthlyBillingChart:{
       type: 'bar',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Billing (in ₹)',
      data: [12000, 15000, 10000, 17000],
      backgroundColor: '#4e73df'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true
  }
    }
  };

  // Initialize all charts
  document.addEventListener('DOMContentLoaded', function() {
    for (const [chartId, config] of Object.entries(chartConfigs)) {
      const ctx = document.getElementById(chartId);
      if (ctx) new Chart(ctx, config);
    }
  });



document.addEventListener('DOMContentLoaded', function () {
    const upperJaws = [
        document.getElementById('addUpperJaw'),
        document.getElementById('editUpperJaw')
    ];
    const lowerJaws = [
        document.getElementById('addLowerJaw'),
        document.getElementById('editLowerJaw')
    ];

    const problemInputs = [
        document.getElementById('addProblemInput'),
        document.getElementById('editProblemInput')
    ];
    const addBtns = [
        document.getElementById('addBtnOne'),
        document.getElementById('addBtnTwo')
    ];
    const replaceBtns = [
        document.getElementById('replaceBtnOne'),
        document.getElementById('replaceBtnTwo')
    ];
    const clearCurrentBtns = [
        document.getElementById('clearCurrentBtnOne'),
        document.getElementById('clearCurrentBtnTwo')
    ];
    const clearAllBtns = [
        document.getElementById('clearAllBtnOne'),
        document.getElementById('clearAllBtnTwo')
    ];
    const problemLists = [
        document.getElementById('addProblemList'),
        document.getElementById('editProblemList')
    ];

    let selectedTooth = null;
    const toothProblems = {};

    for (let i = 1; i <= 32; i++) {
        toothProblems[i] = [];
    }

    upperJaws.forEach(jaw => {
        if (jaw) {
            for (let i = 1; i <= 16; i++) {
                createTooth(i, jaw);
            }
        }
    });

    lowerJaws.forEach(jaw => {
        if (jaw) {
            for (let i = 17; i <= 32; i++) {
                createTooth(i, jaw);
            }
        }
    });

    function createTooth(number, container) {
        const tooth = document.createElement('div');
        tooth.className = 'tooth';
        tooth.dataset.number = number;

        const numberSpan = document.createElement('span');
        numberSpan.className = 'tooth-number';
        numberSpan.textContent = number;

        const problemSpan = document.createElement('span');
        problemSpan.className = 'tooth-problem';

        tooth.appendChild(numberSpan);
        tooth.appendChild(problemSpan);
        container.appendChild(tooth);

        tooth.addEventListener('click', function () {
            selectTooth(this);
        });

        tooth.addEventListener('mouseover', function () {
            if (toothProblems[number].length > 0) {
                const problems = toothProblems[number];
                let tooltip = `Tooth ${number} Problems:\n`;
                problems.forEach((prob, index) => {
                    tooltip += `${index + 1}. ${prob.text} (${formatTime(prob.time)})\n`;
                });
                this.title = tooltip;
            } else {
                this.title = `Tooth ${number} - No problems recorded`;
            }
        });
    }

    function selectTooth(toothElement) {
        if (selectedTooth) {
            selectedTooth.classList.remove('selected');
        }

        selectedTooth = toothElement;
        selectedTooth.classList.add('selected');

        problemInputs.forEach(input => input && input.focus());

        updateToothAppearance();
        updateAllHistoryDisplays();
    }

    function updateToothAppearance() {
        if (!selectedTooth) return;

        const toothNumber = selectedTooth.dataset.number;
        const problems = toothProblems[toothNumber];
        const problemSpan = selectedTooth.querySelector('.tooth-problem');

        if (problems.length > 0) {
            selectedTooth.classList.add('has-problem');
            problemSpan.textContent = problems[problems.length - 1].text;
        } else {
            selectedTooth.classList.remove('has-problem');
            problemSpan.textContent = '';
        }
    }

    function updateAllHistoryDisplays() {
        problemLists.forEach(list => updateHistoryDisplay(list));
    }

    function updateHistoryDisplay(problemList) {
        if (!selectedTooth) {
            problemList.innerHTML = '<div class="no-problems">No tooth selected</div>';
            return;
        }

        const toothNumber = selectedTooth.dataset.number;
        const problems = toothProblems[toothNumber];

        if (problems.length === 0) {
            problemList.innerHTML = '<div class="no-problems">No problems recorded for this tooth</div>';
            return;
        }

        let html = '';
        problems.forEach((prob, index) => {
            html += `<div class="problem-item">
                <div class="problem-text">
                    <span class="problem-number">${index + 1}.</span>
                    ${prob.text}
                </div>
                <div class="problem-meta">
                    <span class="problem-time">${formatTime(prob.time)}</span>
                    <button class="delete-problem" data-index="${index}">✕</button>
                </div>
            </div>`;
        });

        problemList.innerHTML = html;

        problemList.querySelectorAll('.delete-problem').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                deleteProblem(index);
            });
        });
    }

    function deleteProblem(index) {
        if (!selectedTooth) return;

        const toothNumber = selectedTooth.dataset.number;
        toothProblems[toothNumber].splice(index, 1);

        updateToothAppearance();
        updateAllHistoryDisplays();
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    addBtns.forEach((btn, idx) => {
        btn.addEventListener('click', function () {
            const input = problemInputs[idx];
            if (!selectedTooth) {
                alert('Please select a tooth first');
                return;
            }
            const problemText = input.value.trim();
            if (!problemText) {
                alert('Please enter a problem description');
                return;
            }
            const toothNumber = selectedTooth.dataset.number;
            toothProblems[toothNumber].push({
                text: problemText,
                time: new Date().getTime()
            });
            updateToothAppearance();
            updateAllHistoryDisplays();
            input.value = '';
            input.focus();
        });
    });

    replaceBtns.forEach((btn, idx) => {
        btn.addEventListener('click', function () {
            const input = problemInputs[idx];
            if (!selectedTooth) {
                alert('Please select a tooth first');
                return;
            }
            const toothNumber = selectedTooth.dataset.number;
            const problems = toothProblems[toothNumber];
            if (problems.length === 0) {
                alert('No problems to replace for this tooth');
                return;
            }
            const problemText = input.value.trim();
            if (!problemText) {
                alert('Please enter a problem description');
                return;
            }
            problems[problems.length - 1] = {
                text: problemText,
                time: new Date().getTime()
            };
            updateToothAppearance();
            updateAllHistoryDisplays();
            input.value = '';
            input.focus();
        });
    });

    clearCurrentBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!selectedTooth) {
                alert('Please select a tooth first');
                return;
            }
            if (confirm('Are you sure you want to clear all problems for this tooth?')) {
                const toothNumber = selectedTooth.dataset.number;
                toothProblems[toothNumber] = [];
                updateToothAppearance();
                updateAllHistoryDisplays();
            }
        });
    });

    clearAllBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Are you sure you want to clear ALL problems for ALL teeth?')) {
                for (let i = 1; i <= 32; i++) {
                    toothProblems[i] = [];
                }
                updateAllHistoryDisplays();
                document.querySelectorAll('.tooth').forEach(tooth => {
                    tooth.classList.remove('has-problem');
                    tooth.querySelector('.tooth-problem').textContent = '';
                });
            }
        });
    });

    problemInputs.forEach((input, idx) => {
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                addBtns[idx].click();
            }
        });
    });
});






// Second 

// User managemdnt user permission

function openUserPermissionModal(id, name, role) {
  document.getElementById('permStaffName').innerText = name;
  document.getElementById('permStaffRole').innerText = role;

  // Reset and load permissions (if dynamic)
  // You can also load checkbox status via AJAX here

  const modal = new bootstrap.Modal(document.getElementById('userPermissionModal'));
  modal.show();
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
  const cellKey = selectedCell.dataset.id; // Always use dataset.id for key

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
  selectedCell.textContent = `${cellKey} (${saveData[cellKey].length}) - ${latestNote}`;

  // ✅ Retain original cell key for future clicks
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


// Appoinment status color
 function updateStatusColor(selectElem) {
    const value = selectElem.value;
    const emoji = selectElem.options[selectElem.selectedIndex].textContent.split(' ')[0];
    console.log("Status changed to:", value, "Emoji:", emoji);

    // Optional: Set background color based on status
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

  // Attendance page 
const tableBody = document.getElementById("attendanceTableBody");
  let currentCheckoutCell = null;

  function addAttendance() {
    const name = document.getElementById("addName").value;
    const role = document.getElementById("addRole").value;
    const leave = document.getElementById("leaveStatus").value;

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    let checkIn = "-";
    let status = "Present";

    // Set status and check-in logic
    if (leave === "informed") {
      status = "On Leave";
    } else if (leave === "not_informed") {
      status = "Absent";
    } else {
      checkIn = time;
      const hour = now.getHours();
      if (hour >= 9) status = "Late";
    }

    // Create new row
    const row = document.createElement("tr");

    // Add columns
    row.innerHTML = `
      <td>${date}</td>
      <td>${name}</td>
      <td>${role}</td>
      <td>${checkIn}</td>
      <td class="checkout-cell">
        ${
          leave === "informed" || leave === "not_informed"
            ? "-" // No checkout button for leave or absent
            : `<button class="btn btn-outline-secondary btn-sm" onclick="openCheckoutModal(this)">
                Check Out
              </button>`
        }
      </td>
      <td>${status}</td>
    `;

    tableBody.appendChild(row);
  }

  function openCheckoutModal(button) {
    currentCheckoutCell = button.closest("tr").children[4];
    updateCheckoutTime();
    new bootstrap.Modal(document.getElementById("checkoutModal")).show();
  }

  function updateCheckoutTime() {
    const now = new Date();
    document.getElementById("checkoutTime").textContent = now.toLocaleTimeString();
  }

  function confirmCheckout() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    if (currentCheckoutCell) {
      currentCheckoutCell.textContent = time;
    }
    bootstrap.Modal.getInstance(document.getElementById("checkoutModal")).hide();
  }

  // Live timer in modal
  setInterval(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
    if (modal && modal._isShown) {
      updateCheckoutTime();
    }
  }, 1000);

  // Attendance color change dropdown
   function changeStatusColor() {
    const select = document.getElementById('attendanceStatus');
    const circle = document.getElementById('statusCircle');
    const val = select.value;

    // Reset to default gray if no selection
    let color = '#6c757d';

    switch(val) {
      case 'present':
        color = '#0d6efd'; // Bootstrap blue
        break;
      case 'absent':
        color = '#dc3545'; // Bootstrap red
        break;
      case 'late':
        color = '#fd7e14'; // Bootstrap orange
        break;
      case 'onleave':
        color = '#198754'; // Bootstrap green
        break;
    }

    circle.style.backgroundColor = color;
    select.style.backgroundColor = color + '33'; // light transparent bg color
    select.style.color = '#000'; // text color white on colored bg
  }

  // Clinical notes js code
    let clinicalNotes = [];
  let editingIndex = null;

  function addClinicalNote() {
    const date = document.getElementById("noteDate").value;
    const category = document.getElementById("noteCategory").value;
    const patient = document.getElementById("notePatient").value.trim();
    const text = document.getElementById("noteText").value.trim();

    if (!date || !text) {
      alert("Date and Note content are required.");
      return;
    }

    const now = new Date().toLocaleTimeString();

    const noteObj = {
      date,
      category,
      patient: patient || "N/A",
      text,
      time: now,
    };

    if (editingIndex !== null) {
      clinicalNotes[editingIndex] = noteObj;
      editingIndex = null;
    } else {
      clinicalNotes.push(noteObj);
    }

    clearNoteInputs();
    renderClinicalNotes();
  }

  function clearNoteInputs() {
    document.getElementById("noteDate").value = "";
    document.getElementById("noteCategory").value = "Diagnosis";
    document.getElementById("notePatient").value = "";
    document.getElementById("noteText").value = "";
  }

  function renderClinicalNotes() {
    const tbody = document.getElementById("clinicalNotesTable");
    const search = document.getElementById("noteSearch").value.toLowerCase();
    tbody.innerHTML = "";

    clinicalNotes
      .filter(note =>
        note.text.toLowerCase().includes(search) ||
        note.patient.toLowerCase().includes(search) ||
        note.category.toLowerCase().includes(search)
      )
      .forEach((note, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${note.date}</td>
          <td>${note.category}</td>
          <td>${note.patient}</td>
          <td>${note.text}</td>
          <td>${note.time}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" onclick="editClinicalNote(${index})"><i class="bi bi-pencil-square text-dark"></i></button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteClinicalNote(${index})"><i class="bi bi-trash"></i></button>
          </td>
        `;
        tbody.appendChild(tr);
      });
  }

  function editClinicalNote(index) {
    const note = clinicalNotes[index];
    document.getElementById("noteDate").value = note.date;
    document.getElementById("noteCategory").value = note.category;
    document.getElementById("notePatient").value = note.patient;
    document.getElementById("noteText").value = note.text;
    editingIndex = index;
  }

  function deleteClinicalNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
      clinicalNotes.splice(index, 1);
      renderClinicalNotes();
    }
  }
  // Inventory management 

  let mnginventory = [];

  function addInventoryItem() {
    const name = document.getElementById("itemName").value.trim();
    const category = document.getElementById("itemCategory").value;
    const qty = parseInt(document.getElementById("itemQty").value.trim());
    const expiry = document.getElementById("itemExpiry").value;

    if (!name || !category || isNaN(qty) || qty <= 0) {
      alert("Please enter valid item details.");
      return;
    }

    const now = new Date();
    const item = {
      id: Date.now(),
      name,
      category,
      qty,
      expiry,
      addedOn: now.toLocaleString()
    };

    mnginventory.push(item);
    rendermngInventory();
    clearInputs();
  }

  function rendermngInventory() {
  const tbody = document.getElementById("inventoryTable");
  tbody.innerHTML = "";

  const searchQuery = document.getElementById("inventorySearch")?.value?.toLowerCase() || "";

  mnginventory
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery) ||
      (item.expiry && item.expiry.includes(searchQuery)) ||
      (item.addedOn && item.addedOn.toLowerCase().includes(searchQuery))
    )
    .forEach(item => {
      const tr = document.createElement("tr");

      let status = "N/A ⚪";
      if (item.expiry) {
        const today = new Date().toISOString().split("T")[0];
        if (item.expiry < today) status = "Expired ❌";
        else status = "Valid ✅";
      }

      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.qty}</td>
        <td>${item.expiry || "-"}</td>
        <td>${item.addedOn}</td>
        <td>${status}</td>
        <td>
          <button class="btn btn-sm btn-outline-warning me-1" onclick="editItem(${item.id})"><i class="bi bi-pencil-square text-dark"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteItem(${item.id})"><i class="bi bi-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

  function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemCategory").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemExpiry").value = "";
  }

  function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
      mnginventory = mnginventory.filter(item => item.id !== id);
      rendermngInventory();
    }
  }

  function editItem(id) {
    const item = mnginventory.find(i => i.id === id);
    if (!item) return;

    // Prefill fields
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemCategory").value = item.category;
    document.getElementById("itemQty").value = item.qty;
    document.getElementById("itemExpiry").value = item.expiry;

    // Remove original from array
    mnginventory = mnginventory.filter(i => i.id !== id);
    rendermngInventory();
  }

  // Pharmacy page js code
  // Pharmacy Module - Enhanced with Advanced Features
document.addEventListener('DOMContentLoaded', function() {
  // Font Awesome for icons
  const faScript = document.createElement('script');
  faScript.src = 'https://kit.fontawesome.com/a076d05399.js';
  document.head.appendChild(faScript);
  
  // Chart.js for reports
  const chartScript = document.createElement('script');
  chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  document.head.appendChild(chartScript);
  
  // Pharmacy Data Store
  const pharmacyData = {
    inventory: JSON.parse(localStorage.getItem('pharmacyInventory')) || [],
    purchases: JSON.parse(localStorage.getItem('pharmacyPurchases')) || [],
    sales: JSON.parse(localStorage.getItem('pharmacySales')) || [],
    currentSale: [],
    settings: {
      discountRate: 0.05,
      taxRate: 0.00
    }
  };
  
  // DOM Elements
  const elements = {
    inventoryForm: document.getElementById('pharmacy-form-inventory'),
    purchaseForm: document.getElementById('pharmacy-form-purchase'),
    salesForm: document.getElementById('pharmacy-form-sales'),
    inventoryTable: document.getElementById('pharmacy-table-inventory').querySelector('tbody'),
    purchaseTable: document.getElementById('pharmacy-table-purchase').querySelector('tbody'),
    salesTable: document.getElementById('pharmacy-table-sales').querySelector('tbody'),
    purchaseSelect: document.getElementById('pharmacy-purchase-select'),
    salesSelect: document.getElementById('pharmacy-sales-select'),
    toast: new bootstrap.Toast(document.getElementById('pharmacy-toast')),
    reportOutput: document.getElementById('pharmacy-report-output'),
    searchInput: document.getElementById('pharmacy-search'),
    inventoryPagination: document.getElementById('pharmacy-inventory-pagination')
  };
  
  // Initialize the pharmacy module
  function initPharmacy() {
    // Set default dates
    document.getElementById('pharmacy-expiry').valueAsDate = new Date();
    document.getElementById('pharmacy-purchase-date').valueAsDate = new Date();
    
    // Load initial data
    refreshInventoryTable();
    updatePurchaseDropdown();
    updateSalesDropdown();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show welcome message
    showToast('Pharmacy module initialized successfully!', 'success');
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Form submissions
    elements.inventoryForm.addEventListener('submit', handleInventorySubmit);
    elements.purchaseForm.addEventListener('submit', handlePurchaseSubmit);
    elements.salesForm.addEventListener('submit', handleSalesSubmit);
    
    // Button clicks
    document.getElementById('pharmacy-btn-generate-report').addEventListener('click', generateReport);
    document.getElementById('pharmacy-btn-export-inventory').addEventListener('click', exportInventory);
    document.getElementById('pharmacy-btn-clear-purchase').addEventListener('click', clearPurchaseTable);
    document.getElementById('pharmacy-btn-clear-sales').addEventListener('click', clearCurrentSale);
    document.getElementById('pharmacy-btn-checkout').addEventListener('click', processCheckout);
    document.getElementById('pharmacy-btn-print-receipt').addEventListener('click', printReceipt);
    document.getElementById('pharmacy-btn-print-receipt-modal').addEventListener('click', printReceiptFromModal);
    document.getElementById('pharmacy-btn-export-report').addEventListener('click', exportReport);
    document.getElementById('pharmacy-btn-print-report').addEventListener('click', printReport);
    
    // Search functionality
    elements.searchInput.addEventListener('input', handleSearch);
    document.getElementById('pharmacy-search-btn').addEventListener('click', handleSearch);
  }
  
  // Inventory Management
  function handleInventorySubmit(e) {
    e.preventDefault();
    
    const medicine = {
      id: generateId(),
      name: document.getElementById('pharmacy-name').value.trim(),
      brand: document.getElementById('pharmacy-brand').value.trim(),
      batch: document.getElementById('pharmacy-batch').value.trim(),
      expiry: document.getElementById('pharmacy-expiry').value,
      quantity: parseInt(document.getElementById('pharmacy-qty').value),
      price: parseFloat(document.getElementById('pharmacy-price').value),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const editIndex = parseInt(document.getElementById('pharmacy-edit-index').value);
    
    if (editIndex >= 0) {
      // Update existing medicine
      medicine.id = pharmacyData.inventory[editIndex].id;
      pharmacyData.inventory[editIndex] = medicine;
      showToast('Medicine updated successfully!', 'success');
    } else {
      // Add new medicine
      pharmacyData.inventory.push(medicine);
      showToast('Medicine added to inventory!', 'success');
    }
    
    // Save and refresh
    saveInventory();
    elements.inventoryForm.reset();
    document.getElementById('pharmacy-edit-index').value = '-1';
    document.getElementById('pharmacy-save-btn').innerHTML = '<i class="fas fa-save me-1"></i>Save';
    refreshInventoryTable();
    updatePurchaseDropdown();
    updateSalesDropdown();
  }
  
  function editMedicine(index) {
    const medicine = pharmacyData.inventory[index];
    document.getElementById('pharmacy-name').value = medicine.name;
    document.getElementById('pharmacy-brand').value = medicine.brand;
    document.getElementById('pharmacy-batch').value = medicine.batch;
    document.getElementById('pharmacy-expiry').value = medicine.expiry;
    document.getElementById('pharmacy-qty').value = medicine.quantity;
    document.getElementById('pharmacy-price').value = medicine.price;
    document.getElementById('pharmacy-edit-index').value = index;
    document.getElementById('pharmacy-save-btn').innerHTML = '<i class="fas fa-save me-1"></i>Update';
    document.getElementById('pharmacy-name').focus();
  }
  
  function deleteMedicine(index) {
    if (confirm('Are you sure you want to delete this medicine?')) {
      pharmacyData.inventory.splice(index, 1);
      saveInventory();
      refreshInventoryTable();
      updatePurchaseDropdown();
      updateSalesDropdown();
      showToast('Medicine deleted!', 'warning');
    }
  }
  
  function refreshInventoryTable() {
    elements.inventoryTable.innerHTML = '';
    
    pharmacyData.inventory.forEach((medicine, index) => {
      const expiryDate = new Date(medicine.expiry);
      const today = new Date();
      const isExpired = expiryDate < today;
      const isLowStock = medicine.quantity < 10;
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${medicine.id}</td>
        <td>${medicine.name}</td>
        <td>${medicine.brand}</td>
        <td>${medicine.batch}</td>
        <td class="${isExpired ? 'text-danger fw-bold' : ''}">${formatDate(medicine.expiry)}</td>
        <td class="${isLowStock ? 'text-warning fw-bold' : ''}">${medicine.quantity}</td>
        <td>₹${medicine.price.toFixed(2)}</td>
        <td>
          <span class="badge ${isExpired ? 'bg-danger' : isLowStock ? 'bg-warning' : 'bg-success'}">
            ${isExpired ? 'Expired' : isLowStock ? 'Low Stock' : 'In Stock'}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="editMedicine(${index})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteMedicine(${index})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      elements.inventoryTable.appendChild(row);
    });
    
    updatePagination();
  }
  
  // Purchase Management
  function handlePurchaseSubmit(e) {
    e.preventDefault();
    
    const medicineId = elements.purchaseSelect.value;
    const medicine = pharmacyData.inventory.find(m => m.id === medicineId);
    
    if (!medicine) return;
    
    const purchase = {
      id: generateId(),
      medicineId: medicine.id,
      medicineName: medicine.name,
      batch: medicine.batch,
      quantity: parseInt(document.getElementById('pharmacy-purchase-qty').value),
      unitPrice: medicine.price,
      total: parseInt(document.getElementById('pharmacy-purchase-qty').value) * medicine.price,
      date: document.getElementById('pharmacy-purchase-date').value,
      createdAt: new Date().toISOString()
    };
    
    // Add to purchases
    pharmacyData.purchases.push(purchase);
    savePurchases();
    
    // Update inventory quantity
    medicine.quantity += purchase.quantity;
    medicine.updatedAt = new Date().toISOString();
    saveInventory();
    
    // Refresh tables and dropdowns
    refreshPurchaseTable();
    refreshInventoryTable();
    updateSalesDropdown();
    
    // Reset form
    elements.purchaseForm.reset();
    document.getElementById('pharmacy-purchase-date').valueAsDate = new Date();
    
    showToast('Purchase recorded successfully!', 'success');
  }
  
  function refreshPurchaseTable() {
    elements.purchaseTable.innerHTML = '';
    let grandTotal = 0;
    
    pharmacyData.purchases.forEach((purchase, index) => {
      grandTotal += purchase.total;
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${purchase.medicineName}</td>
        <td>${purchase.batch}</td>
        <td>${purchase.quantity}</td>
        <td>₹${purchase.unitPrice.toFixed(2)}</td>
        <td>₹${purchase.total.toFixed(2)}</td>
        <td>${formatDate(purchase.date)}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="deletePurchase(${index})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      elements.purchaseTable.appendChild(row);
    });
    
    document.getElementById('pharmacy-purchase-total').textContent = `₹${grandTotal.toFixed(2)}`;
  }
  
  function deletePurchase(index) {
    if (confirm('Are you sure you want to delete this purchase record?')) {
      // Restore inventory quantity before deleting
      const purchase = pharmacyData.purchases[index];
      const medicine = pharmacyData.inventory.find(m => m.id === purchase.medicineId);
      
      if (medicine) {
        medicine.quantity -= purchase.quantity;
        medicine.updatedAt = new Date().toISOString();
        saveInventory();
        refreshInventoryTable();
        updateSalesDropdown();
      }
      
      pharmacyData.purchases.splice(index, 1);
      savePurchases();
      refreshPurchaseTable();
      showToast('Purchase record deleted!', 'warning');
    }
  }
  
  // Sales Management
  function handleSalesSubmit(e) {
    e.preventDefault();
    
    const medicineId = elements.salesSelect.value;
    const medicine = pharmacyData.inventory.find(m => m.id === medicineId);
    
    if (!medicine) return;
    
    const quantity = parseInt(document.getElementById('pharmacy-sales-qty').value);
    
    if (quantity > medicine.quantity) {
      showToast(`Not enough stock! Only ${medicine.quantity} available.`, 'danger');
      return;
    }
    
    // Check if already in current sale
    const existingItemIndex = pharmacyData.currentSale.findIndex(item => item.medicineId === medicineId);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      pharmacyData.currentSale[existingItemIndex].quantity += quantity;
      pharmacyData.currentSale[existingItemIndex].total = 
        pharmacyData.currentSale[existingItemIndex].quantity * medicine.price;
    } else {
      // Add new item
      pharmacyData.currentSale.push({
        id: generateId(),
        medicineId: medicine.id,
        medicineName: medicine.name,
        batch: medicine.batch,
        quantity: quantity,
        unitPrice: medicine.price,
        total: quantity * medicine.price,
        createdAt: new Date().toISOString()
      });
    }
    
    refreshSalesTable();
    elements.salesForm.reset();
  }
  
  function refreshSalesTable() {
    elements.salesTable.innerHTML = '';
    let subtotal = 0;
    
    pharmacyData.currentSale.forEach((item, index) => {
      subtotal += item.total;
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.medicineName}</td>
        <td>${item.batch}</td>
        <td>${item.quantity}</td>
        <td>₹${item.unitPrice.toFixed(2)}</td>
        <td>₹${item.total.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromSale(${index})">
            <i class="fas fa-times"></i>
          </button>
        </td>
      `;
      elements.salesTable.appendChild(row);
    });
    
    const discount = subtotal * pharmacyData.settings.discountRate;
    const total = subtotal - discount;
    
    document.getElementById('pharmacy-sales-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('pharmacy-sales-discount').textContent = `₹${discount.toFixed(2)}`;
    document.getElementById('pharmacy-sales-total').textContent = `₹${total.toFixed(2)}`;
  }
  
  function removeFromSale(index) {
    pharmacyData.currentSale.splice(index, 1);
    refreshSalesTable();
  }
  
  function processCheckout() {
    if (pharmacyData.currentSale.length === 0) {
      showToast('No items in the sale!', 'warning');
      return;
    }
    
    const customerName = document.getElementById('pharmacy-customer-name').value.trim() || 'Walk-in Customer';
    const saleId = generateId();
    const now = new Date().toISOString();
    
    // Create sale record
    const subtotal = pharmacyData.currentSale.reduce((sum, item) => sum + item.total, 0);
    const discount = subtotal * pharmacyData.settings.discountRate;
    const total = subtotal - discount;
    
    const saleRecord = {
      id: saleId,
      items: [...pharmacyData.currentSale],
      customer: customerName,
      subtotal: subtotal,
      discount: discount,
      total: total,
      date: now,
      createdAt: now
    };
    
    // Update inventory quantities
    pharmacyData.currentSale.forEach(saleItem => {
      const medicine = pharmacyData.inventory.find(m => m.id === saleItem.medicineId);
      if (medicine) {
        medicine.quantity -= saleItem.quantity;
        medicine.updatedAt = now;
      }
    });
    
    // Save data
    pharmacyData.sales.push(saleRecord);
    saveSales();
    saveInventory();
    
    // Generate receipt
    generateReceipt(saleRecord);
    
    // Reset current sale
    clearCurrentSale();
    
    // Refresh displays
    refreshInventoryTable();
    updateSalesDropdown();
    
    showToast('Sale completed successfully!', 'success');
  }
  
  function generateReceipt(saleRecord) {
    const receiptContent = document.getElementById('pharmacy-receipt-content');
    receiptContent.innerHTML = `
      <div class="text-center mb-4">
        <h4>Pharmacy Receipt</h4>
        <p class="mb-1">Sale #${saleRecord.id}</p>
        <p class="mb-1">${formatDate(saleRecord.date, true)}</p>
      </div>
      
      <div class="mb-3">
        <p><strong>Customer:</strong> ${saleRecord.customer}</p>
      </div>
      
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${saleRecord.items.map(item => `
            <tr>
              <td>${item.medicineName} (${item.batch})</td>
              <td>${item.quantity}</td>
              <td>₹${item.unitPrice.toFixed(2)}</td>
              <td>₹${item.total.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
            <td>₹${saleRecord.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end"><strong>Discount (${(pharmacyData.settings.discountRate * 100)}%):</strong></td>
            <td>₹${saleRecord.discount.toFixed(2)}</td>
          </tr>
          <tr class="table-active">
            <td colspan="3" class="text-end"><strong>Total:</strong></td>
            <td>₹${saleRecord.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      
      <div class="text-center mt-4">
        <p>Thank you for your purchase!</p>
        <p>Please bring this receipt for any returns or exchanges</p>
      </div>
    `;
    
    // Show receipt modal
    const receiptModal = new bootstrap.Modal(document.getElementById('pharmacy-receipt-modal'));
    receiptModal.show();
  }
  
  function printReceiptFromModal() {
    const printContent = document.getElementById('pharmacy-receipt-content').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    
    // Reinitialize the modal
    const receiptModal = new bootstrap.Modal(document.getElementById('pharmacy-receipt-modal'));
    receiptModal.show();
  }
  
  // Reports
  function generateReport() {
    const reportType = document.getElementById('pharmacy-report-type').value;
    const startDate = document.getElementById('pharmacy-report-start').value;
    const endDate = document.getElementById('pharmacy-report-end').value;
    
    let reportData = [];
    let title = '';
    let headers = [];
    
    switch (reportType) {
      case 'sales':
        title = 'Sales Report';
        headers = ['Date', 'Sale ID', 'Customer', 'Items', 'Subtotal', 'Discount', 'Total'];
        
        reportData = pharmacyData.sales
          .filter(sale => filterByDate(sale.date, startDate, endDate))
          .map(sale => ({
            date: formatDate(sale.date),
            id: sale.id,
            customer: sale.customer,
            items: sale.items.reduce((count, item) => count + item.quantity, 0),
            subtotal: sale.subtotal,
            discount: sale.discount,
            total: sale.total
          }));
        break;
        
      case 'inventory':
        title = 'Inventory Report';
        headers = ['ID', 'Name', 'Brand', 'Batch', 'Expiry', 'Qty', 'Price', 'Status'];
        
        reportData = pharmacyData.inventory.map(medicine => {
          const expiryDate = new Date(medicine.expiry);
          const today = new Date();
          const isExpired = expiryDate < today;
          const isLowStock = medicine.quantity < 10;
          const status = isExpired ? 'Expired' : isLowStock ? 'Low Stock' : 'In Stock';
          
          return {
            id: medicine.id,
            name: medicine.name,
            brand: medicine.brand,
            batch: medicine.batch,
            expiry: formatDate(medicine.expiry),
            quantity: medicine.quantity,
            price: medicine.price,
            status: status
          };
        });
        break;
        
      case 'purchase':
        title = 'Purchase Report';
        headers = ['Date', 'Medicine', 'Batch', 'Qty', 'Unit Price', 'Total'];
        
        reportData = pharmacyData.purchases
          .filter(purchase => filterByDate(purchase.date, startDate, endDate))
          .map(purchase => ({
            date: formatDate(purchase.date),
            medicine: purchase.medicineName,
            batch: purchase.batch,
            quantity: purchase.quantity,
            unitPrice: purchase.unitPrice,
            total: purchase.total
          }));
        break;
        
      case 'expiry':
        title = 'Expiry Report';
        headers = ['Name', 'Brand', 'Batch', 'Expiry', 'Qty', 'Price', 'Days Left'];
        
        reportData = pharmacyData.inventory
          .map(medicine => {
            const expiryDate = new Date(medicine.expiry);
            const today = new Date();
            const daysLeft = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
            
            return {
              name: medicine.name,
              brand: medicine.brand,
              batch: medicine.batch,
              expiry: formatDate(medicine.expiry),
              quantity: medicine.quantity,
              price: medicine.price,
              daysLeft: daysLeft
            };
          })
          .filter(medicine => medicine.daysLeft < 30) // Show items expiring in next 30 days
          .sort((a, b) => a.daysLeft - b.daysLeft);
        break;
    }
    
    // Update report title
    document.getElementById('pharmacy-report-title').textContent = title;
    
    // Update report table headers
    const tableHead = document.getElementById('pharmacy-report-table-head');
    tableHead.innerHTML = headers.map(header => `<th>${header}</th>`).join('');
    
    // Update report table body
    const tableBody = document.getElementById('pharmacy-report-table-body');
    tableBody.innerHTML = reportData.map(item => {
      return `<tr>${
        Object.values(item).map(value => 
          `<td>${typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}</td>`
        ).join('')
      }</tr>`;
    }).join('');
    
    // Update summary
    updateReportSummary(reportType, reportData);
    
    // Update chart
    updateReportChart(reportType, reportData);
  }
  
  function updateReportSummary(reportType, data) {
    const summaryElement = document.getElementById('pharmacy-report-summary');
    let summaryHTML = '';
    
    switch (reportType) {
      case 'sales':
        const totalSales = data.reduce((sum, sale) => sum + sale.total, 0);
        const totalDiscount = data.reduce((sum, sale) => sum + sale.discount, 0);
        const totalpharItems = data.reduce((sum, sale) => sum + sale.items, 0);
        
        summaryHTML = `
          <p><strong>Total Sales:</strong> ₹${totalSales.toFixed(2)}</p>
          <p><strong>Total Discount:</strong> ₹${totalDiscount.toFixed(2)}</p>
          <p><strong>Total Items Sold:</strong> ${totalpharItems}</p>
          <p><strong>Number of Transactions:</strong> ${data.length}</p>
        `;
        break;
        
      case 'inventory':
        const totalItems = data.length;
        const totalValue = data.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const expiredItems = data.filter(item => item.status === 'Expired').length;
        const lowStockItems = data.filter(item => item.status === 'Low Stock').length;
        
        summaryHTML = `
          <p><strong>Total Medicines:</strong> ${totalItems}</p>
          <p><strong>Total Inventory Value:</strong> ₹${totalValue.toFixed(2)}</p>
          <p><strong>Expired Items:</strong> ${expiredItems}</p>
          <p><strong>Low Stock Items:</strong> ${lowStockItems}</p>
        `;
        break;
        
      case 'purchase':
        const totalPurchases = data.reduce((sum, purchase) => sum + purchase.total, 0);
        const totalQuantity = data.reduce((sum, purchase) => sum + purchase.quantity, 0);
        
        summaryHTML = `
          <p><strong>Total Purchases:</strong> ₹${totalPurchases.toFixed(2)}</p>
          <p><strong>Total Quantity:</strong> ${totalQuantity}</p>
          <p><strong>Number of Purchases:</strong> ${data.length}</p>
        `;
        break;
        
      case 'expiry':
        const expiringSoon = data.filter(item => item.daysLeft < 7).length;
        const criticalItems = data.filter(item => item.daysLeft < 0).length;
        const totalExpiringValue = data.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        
        summaryHTML = `
          <p><strong>Items Expiring Soon (≤7 days):</strong> ${expiringSoon}</p>
          <p><strong>Already Expired Items:</strong> ${criticalItems}</p>
          <p><strong>Total Value of Expiring Items:</strong> ₹${totalExpiringValue.toFixed(2)}</p>
        `;
        break;
    }
    
    summaryElement.innerHTML = summaryHTML;
  }
  
  function updateReportChart(reportType, data) {
    const ctx = document.getElementById('pharmacy-report-chart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (window.pharmacyChart) {
      window.pharmacyChart.destroy();
    }
    
    let chartConfig = {};
    
    switch (reportType) {
      case 'sales':
        // Group sales by date
        const salesByDate = {};
        data.forEach(sale => {
          if (!salesByDate[sale.date]) {
            salesByDate[sale.date] = 0;
          }
          salesByDate[sale.date] += sale.total;
        });
        
        chartConfig = {
          type: 'bar',
          data: {
            labels: Object.keys(salesByDate),
            datasets: [{
              label: 'Daily Sales',
              data: Object.values(salesByDate),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Daily Sales Report'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Amount (₹)'
                }
              }
            }
          }
        };
        break;
        
      case 'inventory':
        const statusCounts = {
          'In Stock': data.filter(item => item.status === 'In Stock').length,
          'Low Stock': data.filter(item => item.status === 'Low Stock').length,
          'Expired': data.filter(item => item.status === 'Expired').length
        };
        
        chartConfig = {
          type: 'pie',
          data: {
            labels: Object.keys(statusCounts),
            datasets: [{
              data: Object.values(statusCounts),
              backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(255, 99, 132, 0.5)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Inventory Status'
              }
            }
          }
        };
        break;
        
      case 'purchase':
        // Group purchases by medicine
        const purchasesByMedicine = {};
        data.forEach(purchase => {
          if (!purchasesByMedicine[purchase.medicine]) {
            purchasesByMedicine[purchase.medicine] = 0;
          }
          purchasesByMedicine[purchase.medicine] += purchase.quantity;
        });
        
        // Take top 10 medicines
        const sortedMedicines = Object.entries(purchasesByMedicine)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);
        
        chartConfig = {
          type: 'horizontalBar',
          data: {
            labels: sortedMedicines.map(item => item[0]),
            datasets: [{
              label: 'Quantity Purchased',
              data: sortedMedicines.map(item => item[1]),
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
              title: {
                display: true,
                text: 'Top 10 Purchased Medicines'
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Quantity'
                }
              }
            }
          }
        };
        break;
        
      case 'expiry':
        chartConfig = {
          type: 'line',
          data: {
            labels: data.map(item => item.name),
            datasets: [{
              label: 'Days Until Expiry',
              data: data.map(item => item.daysLeft),
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
              fill: false
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Days Until Expiry'
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Days Left'
                }
              }
            }
          }
        };
        break;
    }
    
    window.pharmacyChart = new Chart(ctx, chartConfig);
  }
  
  // Utility Functions
  function saveInventory() {
    localStorage.setItem('pharmacyInventory', JSON.stringify(pharmacyData.inventory));
  }
  
  function savePurchases() {
    localStorage.setItem('pharmacyPurchases', JSON.stringify(pharmacyData.purchases));
  }
  
  function saveSales() {
    localStorage.setItem('pharmacySales', JSON.stringify(pharmacyData.sales));
  }
  
  function updatePurchaseDropdown() {
    elements.purchaseSelect.innerHTML = '<option value="" selected disabled>Select Medicine</option>';
    
    pharmacyData.inventory.forEach(medicine => {
      const option = document.createElement('option');
      option.value = medicine.id;
      option.textContent = `${medicine.name} (${medicine.brand}) - Stock: ${medicine.quantity}`;
      elements.purchaseSelect.appendChild(option);
    });
  }
  
  function updateSalesDropdown() {
    elements.salesSelect.innerHTML = '<option value="" selected disabled>Select Medicine</option>';
    
    pharmacyData.inventory
      .filter(medicine => medicine.quantity > 0) // Only show medicines with stock
      .forEach(medicine => {
        const option = document.createElement('option');
        option.value = medicine.id;
        option.textContent = `${medicine.name} (${medicine.brand}) - ₹${medicine.price.toFixed(2)} (${medicine.quantity} available)`;
        elements.salesSelect.appendChild(option);
      });
  }
  
  function clearPurchaseTable() {
    if (confirm('Are you sure you want to clear all purchase records?')) {
      pharmacyData.purchases = [];
      savePurchases();
      refreshPurchaseTable();
      showToast('Purchase records cleared!', 'warning');
    }
  }
  
  function clearCurrentSale() {
    if (pharmacyData.currentSale.length === 0 || confirm('Are you sure you want to clear the current sale?')) {
      pharmacyData.currentSale = [];
      refreshSalesTable();
      document.getElementById('pharmacy-customer-name').value = '';
    }
  }
  
  function printReceipt() {
    if (pharmacyData.currentSale.length === 0) {
      showToast('No items in the sale to print!', 'warning');
      return;
    }
    
    // Create a temporary sale record for the receipt
    const tempSale = {
      id: 'TEMP-' + generateId(),
      items: [...pharmacyData.currentSale],
      customer: document.getElementById('pharmacy-customer-name').value.trim() || 'Walk-in Customer',
      subtotal: parseFloat(document.getElementById('pharmacy-sales-subtotal').textContent.replace('₹', '')),
      discount: parseFloat(document.getElementById('pharmacy-sales-discount').textContent.replace('₹', '')),
      total: parseFloat(document.getElementById('pharmacy-sales-total').textContent.replace('₹', '')),
      date: new Date().toISOString()
    };
    
    generateReceipt(tempSale);
  }
  
  function exportInventory() {
    const headers = ['ID', 'Name', 'Brand', 'Batch', 'Expiry', 'Quantity', 'Price', 'Status'];
    const data = pharmacyData.inventory.map(medicine => {
      const expiryDate = new Date(medicine.expiry);
      const today = new Date();
      const isExpired = expiryDate < today;
      const isLowStock = medicine.quantity < 10;
      const status = isExpired ? 'Expired' : isLowStock ? 'Low Stock' : 'In Stock';
      
      return [
        medicine.id,
        medicine.name,
        medicine.brand,
        medicine.batch,
        formatDate(medicine.expiry),
        medicine.quantity,
        medicine.price,
        status
      ];
    });
    
    exportToCSV('Pharmacy_Inventory', headers, data);
  }
  
  function exportReport() {
    const reportType = document.getElementById('pharmacy-report-type').value;
    let headers = [];
    let data = [];
    let filename = '';
    
    switch (reportType) {
      case 'sales':
        filename = 'Pharmacy_Sales_Report';
        headers = ['Date', 'Sale ID', 'Customer', 'Items', 'Subtotal', 'Discount', 'Total'];
        
        data = pharmacyData.sales.map(sale => [
          formatDate(sale.date),
          sale.id,
          sale.customer,
          sale.items.reduce((count, item) => count + item.quantity, 0),
          sale.subtotal,
          sale.discount,
          sale.total
        ]);
        break;
        
      case 'inventory':
        filename = 'Pharmacy_Inventory_Report';
        headers = ['ID', 'Name', 'Brand', 'Batch', 'Expiry', 'Qty', 'Price', 'Status'];
        
        data = pharmacyData.inventory.map(medicine => {
          const expiryDate = new Date(medicine.expiry);
          const today = new Date();
          const isExpired = expiryDate < today;
          const isLowStock = medicine.quantity < 10;
          const status = isExpired ? 'Expired' : isLowStock ? 'Low Stock' : 'In Stock';
          
          return [
            medicine.id,
            medicine.name,
            medicine.brand,
            medicine.batch,
            formatDate(medicine.expiry),
            medicine.quantity,
            medicine.price,
            status
          ];
        });
        break;
        
      case 'purchase':
        filename = 'Pharmacy_Purchase_Report';
        headers = ['Date', 'Medicine', 'Batch', 'Qty', 'Unit Price', 'Total'];
        
        data = pharmacyData.purchases.map(purchase => [
          formatDate(purchase.date),
          purchase.medicineName,
          purchase.batch,
          purchase.quantity,
          purchase.unitPrice,
          purchase.total
        ]);
        break;
        
      case 'expiry':
        filename = 'Pharmacy_Expiry_Report';
        headers = ['Name', 'Brand', 'Batch', 'Expiry', 'Qty', 'Price', 'Days Left'];
        
        data = pharmacyData.inventory.map(medicine => {
          const expiryDate = new Date(medicine.expiry);
          const today = new Date();
          const daysLeft = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
          
          return [
            medicine.name,
            medicine.brand,
            medicine.batch,
            formatDate(medicine.expiry),
            medicine.quantity,
            medicine.price,
            daysLeft
          ];
        })
        .filter(medicine => medicine[6] < 30) // Only items expiring in next 30 days
        .sort((a, b) => a[6] - b[6]);
        break;
    }
    
    exportToCSV(filename, headers, data);
  }
  
  function printReport() {
    const printContent = document.getElementById('pharmacy-panel-reports').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    
    // Reinitialize the chart after printing
    generateReport();
  }
  
  function exportToCSV(filename, headers, data) {
    let csv = headers.join(',') + '\n';
    
    data.forEach(row => {
      csv += row.map(item => `"${item}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${formatDate(new Date().toISOString(), true)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function handleSearch() {
    const searchTerm = elements.searchInput.value.toLowerCase();
    
    if (!searchTerm) {
      refreshInventoryTable();
      return;
    }
    
    const filtered = pharmacyData.inventory.filter(medicine => 
      medicine.name.toLowerCase().includes(searchTerm) ||
      medicine.brand.toLowerCase().includes(searchTerm) ||
      medicine.batch.toLowerCase().includes(searchTerm) ||
      medicine.id.toLowerCase().includes(searchTerm)
    );
    
    elements.inventoryTable.innerHTML = '';
    
    filtered.forEach((medicine, index) => {
      const expiryDate = new Date(medicine.expiry);
      const today = new Date();
      const isExpired = expiryDate < today;
      const isLowStock = medicine.quantity < 10;
      
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${medicine.id}</td>
        <td>${medicine.name}</td>
        <td>${medicine.brand}</td>
        <td>${medicine.batch}</td>
        <td class="${isExpired ? 'text-danger fw-bold' : ''}">${formatDate(medicine.expiry)}</td>
        <td class="${isLowStock ? 'text-warning fw-bold' : ''}">${medicine.quantity}</td>
        <td>₹${medicine.price.toFixed(2)}</td>
        <td>
          <span class="badge ${isExpired ? 'bg-danger' : isLowStock ? 'bg-warning' : 'bg-success'}">
            ${isExpired ? 'Expired' : isLowStock ? 'Low Stock' : 'In Stock'}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="editMedicine(${pharmacyData.inventory.findIndex(m => m.id === medicine.id)})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteMedicine(${pharmacyData.inventory.findIndex(m => m.id === medicine.id)})">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      elements.inventoryTable.appendChild(row);
    });
  }
  
  function updatePagination() {
    // In a real app, you would implement pagination here
    // For simplicity, we'll just show item count
    elements.inventoryPagination.innerHTML = `
      <li class="page-item disabled">
        <span class="page-link">Showing ${pharmacyData.inventory.length} items</span>
      </li>
    `;
  }
  
  function showToast(message, type = 'success') {
    const toast = document.getElementById('pharmacy-toast');
    toast.querySelector('.toast-body').textContent = message;
    
    // Remove all color classes
    toast.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info');
    
    // Add the appropriate class based on type
    switch (type) {
      case 'success':
        toast.classList.add('text-bg-success');
        break;
      case 'error':
      case 'danger':
        toast.classList.add('text-bg-danger');
        break;
      case 'warning':
        toast.classList.add('text-bg-warning');
        break;
      default:
        toast.classList.add('text-bg-info');
    }
    
    elements.toast.show();
  }
  
  function generateId() {
    return 'PH' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  
  function formatDate(dateString, includeTime = false) {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return date.toLocaleDateString('en-US', options);
  }
  
  function filterByDate(dateString, startDate, endDate) {
    if (!startDate && !endDate) return true;
    
    const date = new Date(dateString);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && end) {
      return date >= start && date <= end;
    } else if (start) {
      return date >= start;
    } else if (end) {
      return date <= end;
    }
    
    return true;
  }
  
  // Make functions available globally for HTML onclick handlers
  window.editMedicine = editMedicine;
  window.deleteMedicine = deleteMedicine;
  window.deletePurchase = deletePurchase;
  window.removeFromSale = removeFromSale;
  window.printReceipt = printReceipt;
  
  // Initialize the pharmacy module
  initPharmacy();
});