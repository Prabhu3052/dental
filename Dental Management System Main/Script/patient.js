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
setupFullConditionLogic("condition-select-2", "custom-condition-2", "condition-2", "conditionsHidden-2");






// On modal show, auto-generate Patient ID and registration date, show step 1
document.getElementById("addPatientModal").addEventListener("show.bs.modal", () => {
  document.getElementById("patientId").value = "PAT" + Date.now();
  document.getElementById("regDate").value = new Date().toISOString().split("T")[0];
  showStep(1);

  // Clear previous condition tags and hidden input
  const condContainer = document.querySelector(".condition-1");
  condContainer.innerHTML = "";
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



 document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("patientsTableBody");

    tableBody.addEventListener("dblclick", (e) => {
      const row = e.target.closest("tr");
      if (!row) return;

      // Assuming each <td> holds specific data in order
      const cells = row.querySelectorAll("td");

      // Fill in basic fields (customize based on your column structure)
      document.getElementById("viewPatientId").textContent = cells[0].textContent;
      document.getElementById("viewName").textContent = cells[1].textContent;
      document.getElementById("viewGender").textContent = cells[2].textContent;
      document.getElementById("viewAge").textContent = cells[3].textContent;
      document.getElementById("viewContact").textContent = cells[4].textContent;

      // Fetch additional patient data from dataset or via ID (if you store it)
      // Or populate dummy data for testing:
      document.getElementById("viewEmergencyContact").textContent = "9876543210";
      document.getElementById("viewAllergies").textContent = "None";
      document.getElementById("viewConditions").textContent = "Diabetes";
      document.getElementById("viewSurgeries").textContent = "Appendectomy";
      document.getElementById("viewDentalHistory").textContent = "Cavity fillings";
      document.getElementById("viewInsuranceProvider").textContent = "ABC Insurance";
      document.getElementById("viewPolicyNumber").textContent = "POL123456";
      document.getElementById("viewInsuranceValidity").textContent = "31-Dec-2025";
      document.getElementById("viewCoverage").textContent = "Full Dental";
      document.getElementById("viewConsentCheckbox").textContent = "Yes";
      document.getElementById("viewBloodGroup").textContent = "B+";
      document.getElementById("viewSpecialNeeds").textContent = "None";
      document.getElementById("viewPregnantNursing").textContent = "No";
      document.getElementById("viewBleedingDisorders").textContent = "No";
      document.getElementById("viewSmoking").textContent = "No";

      // Set file links if available
      document.getElementById("viewIdProofLink").href = "#"; // Replace with actual link
      document.getElementById("viewConsentFileLink").href = "#"; // Replace with actual link

      // Show the modal
      const viewModal = new bootstrap.Modal(document.getElementById("viewPatientModal"));
      viewModal.show();
    });
  });


  document.getElementById("openEditModalBtn").addEventListener("click", () => {
  const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewPatientModal"));
  if (viewModal) viewModal.hide();

  const editModal = new bootstrap.Modal(document.getElementById("editPatientModal"));
  editModal.show();
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

  // Global array to store added teeth
  const teethData = [];

  // Add Tooth Logic
  document.getElementById("btnAddTeeth").addEventListener("click", function () {
    const type = document.getElementById("addToothType").value;
    const jaw = document.querySelector("input[name='jaw']:checked").value;
    const position = document.getElementById("addToothPosition").value;

    const toothId = `TOOTH${Date.now()}`;
    const tooth = {
      toothId,
      type,
      jaw,
      position,
      treatment: "",
      status: "pending"
    };

    teethData.push(tooth);

    const li = document.createElement("li");
    li.textContent = `${tooth.type} (${tooth.jaw}, ${tooth.position}) - ${tooth.toothId}`;
    document.getElementById("teethList").appendChild(li);
  });

  // Save Button Logic
  document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById("saveBtn");

    saveBtn.addEventListener("click", function () {
      const data = {
        patientId: document.getElementById("patientId").value,
        regDate: document.getElementById("regDate").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        gender: document.getElementById("gender").value,
        dob: document.getElementById("dob").value,
        age: document.getElementById("age").value,
        idProof: document.getElementById("idProof").files[0]?.name || "",
        contact: document.getElementById("contact").value,
        emergencyContact: document.getElementById("emergencyContact").value,
        existingConditions: Array.from(document.querySelectorAll(".condition-1 span")).map(el => el.innerText.trim()),
        bloodGroup: document.getElementById("bloodGroup").value,
        pregnancy: document.getElementById("pregnancy").value,
        bleedingDisorder: document.getElementById("bleedingDisorder").value,
        smoking: document.getElementById("smoking").value,
        specialNeeds: document.getElementById("specialNeeds").value,
        insuranceProvider: document.getElementById("insuranceProvider").value,
        policyNumber: document.getElementById("policyNumber").value,
        validity: document.getElementById("validity").value,
        coverageDetails: document.getElementById("coverageDetails").value,
        consentForm: document.getElementById("consentForm").files[0]?.name || "",
        consentGiven: document.getElementById("consentCheck").checked,
        teethData: teethData // 🔥 Added here
      };

      console.log("📝 Patient Form Data:", JSON.stringify(data, null, 2));
    });
  });

 document.querySelectorAll('.edit-patient-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const patientId = btn.getAttribute('data-id');
    const firstName = btn.getAttribute('data-firstname');
    const dob = btn.getAttribute('data-dob');
    
    if (document.getElementById("patientId")) {
      document.getElementById("patientId").value = patientId || "";
    }
    if (document.getElementById("firstName")) {
      document.getElementById("firstName").value = firstName || "";
    }
    if (document.getElementById("dob")) {
      document.getElementById("dob").value = dob || "";
    }

    // Call calculateAge after DOB is filled
    calculateAge();

    // Show modal (Bootstrap 5 way)
    const modal = new bootstrap.Modal(document.getElementById('editPatientModal'));
    modal.show();
  });
});
  
  
function calculateAge() {
  const dobInput = document.getElementById("dob");
  const ageInput = document.getElementById("age");

  if (!dobInput || !ageInput) return;

  const dob = new Date(dobInput.value);
  const today = new Date();

  if (!isNaN(dob.getTime())) {
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    ageInput.value = age;
  } else {
    ageInput.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Get the save button
  const saveButton = document.getElementById('saveChangesButton');
  
  if (saveButton) {
      saveButton.addEventListener('click', function(e) {
          // Prevent form submission if it's in a form
          e.preventDefault();
          
          // Collect all form data
          const patientData = {
              patientId: document.getElementById('patientId')?.value || '',
              registrationDate: document.getElementById('registrationDate')?.value || '',
              firstName: document.getElementById('firstName')?.value || '',
              lastName: document.getElementById('lastName')?.value || '',
              gender: document.getElementById('gender')?.value || '',
              dob: document.getElementById('dob')?.value || '',
              age: document.getElementById('age')?.value || '',
              bloodGroup: document.getElementById('bloodGroup')?.value || 'Select...',
              contact: document.getElementById('contact')?.value || '',
              emergencyContact: document.getElementById('emergencyContact')?.value || '',
              idProof: document.getElementById('idProof')?.files[0]?.name || null,
              pregnantNursing: document.querySelector('input[name="pregnantNursing"]:checked')?.value || '',
              bleedingDisorders: document.querySelector('input[name="bleedingDisorders"]:checked')?.value || '',
              smoking: document.querySelector('input[name="smoking"]:checked')?.value || '',
              specialNeeds: document.getElementById('specialNeeds')?.value || '',
              insuranceProvider: document.getElementById('insuranceProvider')?.value || '',
              policyNumber: document.getElementById('policyNumber')?.value || '',
              insuranceValidity: document.getElementById('insuranceValidity')?.value || '',
              coverage: document.getElementById('coverage')?.value || '',
              consentForm: document.getElementById('consentForm')?.files[0]?.name || null,
              consentGiven: document.getElementById('consentCheckbox')?.checked || false
          };

          console.log('Patient Data:', patientData);
          console.log('JSON Format:', JSON.stringify(patientData, null, 2));
          
          // Show success message
          alert('Patient data captured successfully! Check console for details.');
      });
  } else {
      console.error('Save button not found - check element ID');
  }
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("openEditModalBtn").addEventListener("click", () => {
    // Helper to safely get trimmed text content
    const getText = (id) => document.getElementById(id)?.innerText?.trim() || "";

    // Extract data from View Modal
    const patientData = {
      patientId: getText("viewPatientId"),
      fullName: getText("viewName"),
      gender: getText("viewGender").toLowerCase(),
      age: getText("viewAge"),
      contact: getText("viewContact"),
      emergencyContact: getText("viewEmergencyContact"),
      idProofLink: document.getElementById("viewIdProofLink")?.href || "",
      allergies: getText("viewAllergies"),
      conditions: getText("viewConditions"),
      surgeries: getText("viewSurgeries"),
      dentalHistory: getText("viewDentalHistory"),
      insuranceProvider: getText("viewInsuranceProvider"),
      policyNumber: getText("viewPolicyNumber"),
      insuranceValidity: getText("viewInsuranceValidity"),
      coverage: getText("viewCoverage"),
      consentGiven: getText("viewConsentCheckbox") === "Yes",
      consentFormLink: document.getElementById("viewConsentFileLink")?.href || "",
      bloodGroup: getText("viewBloodGroup"),
      specialNeeds: getText("viewSpecialNeeds"),
      pregnantNursing: getText("viewPregnantNursing"),
      bleedingDisorders: getText("viewBleedingDisorders"),
      smoking: getText("viewSmoking"),
    };

    console.log("Edit Modal Loaded with Patient Data:", patientData);

    // Split full name into first and last name
    const nameParts = patientData.fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Populate Edit Modal fields
    document.getElementById("editPatientId").value = patientData.patientId;
    document.getElementById("editFirstName").value = firstName;
    document.getElementById("editLastName").value = lastName;
    document.getElementById("editGender").value = patientData.gender;
    document.getElementById("editAge").value = patientData.age;
    document.getElementById("editContact").value = patientData.contact;
    document.getElementById("editEmergencyContact").value = patientData.emergencyContact;
    document.getElementById("editIdProofLink").href = patientData.idProofLink;
    document.getElementById("editAllergies").value = patientData.allergies;
    document.getElementById("editConditions").value = patientData.conditions;
    document.getElementById("editSurgeries").value = patientData.surgeries;
    document.getElementById("editDentalHistory").value = patientData.dentalHistory;
    document.getElementById("editInsuranceProvider").value = patientData.insuranceProvider;
    document.getElementById("editPolicyNumber").value = patientData.policyNumber;
    document.getElementById("editInsuranceValidity").value = patientData.insuranceValidity;
    document.getElementById("editCoverage").value = patientData.coverage;
    document.getElementById("editConsentCheckbox").checked = patientData.consentGiven;
    document.getElementById("editConsentFileLink").href = patientData.consentFormLink;
    document.getElementById("editBloodGroup").value = patientData.bloodGroup;
    document.getElementById("editSpecialNeeds").value = patientData.specialNeeds;
    document.getElementById("editPregnantNursing").value = patientData.pregnantNursing;
    document.getElementById("editBleedingDisorders").value = patientData.bleedingDisorders;
    document.getElementById("editSmoking").value = patientData.smoking;

    // Show Edit Modal
    const editModal = new bootstrap.Modal(document.getElementById("editPatientModal"));
    editModal.show();
  });
});