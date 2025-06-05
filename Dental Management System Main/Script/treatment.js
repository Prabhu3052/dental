
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



  const teethTemplate = () => ([
  ...Array.from({ length: 32 }, (_, i) => {
    const id = i + 1;
    const typeMap = {
      1: 'Wisdom', 2: 'Molar', 3: 'Molar', 4: 'Premolar', 5: 'Premolar',
      6: 'Canine', 7: 'Incisor', 8: 'Incisor', 9: 'Incisor', 10: 'Incisor',
      11: 'Canine', 12: 'Premolar', 13: 'Premolar', 14: 'Molar', 15: 'Molar', 16: 'Wisdom'
    };
    const type = id <= 16 ? typeMap[id] : typeMap[33 - id];
    return { id, type, treatment: '', status: '', treatmentDateTime: '' };
  })
]);

document.querySelectorAll('.treatment-container').forEach(container => {
  const teethData = teethTemplate();
  const selectedTeethIds = new Set();
  let editingTeeth = [];

  const chart = container.querySelector('.treatment-chart');
  const toggle = container.querySelector('.multi-select-toggle');
  const editBtn = container.querySelector('.edit-selected-btn');
  const detailBox = container.querySelector('.tooth-detail-box');
  const noInfo = container.querySelector('.no-tooth-info');
  const editForm = container.querySelector('.treatment-edit-form');

  const detailId = container.querySelector('.detail-id');
  const detailType = container.querySelector('.detail-type');
  const detailTreatment = container.querySelector('.detail-treatment');
  const detailStatus = container.querySelector('.detail-status');
  const detailDatetime = container.querySelector('.detail-treatment-datetime');

  const editId = container.querySelector('.edit-tooth-id');
  const editType = container.querySelector('.edit-tooth-type');
  const statusSelect = container.querySelector('.treatment-status-select');
  const description = container.querySelector('.treatment-description');
  const dateTimeInput = container.querySelector('.treatment-datetime-input');
  const saveBtn = container.querySelector('.save-treatment-btn');
  const cancelBtn = container.querySelector('.cancel-treatment-btn');

const renderChart = () => {
  chart.innerHTML = `
    <div class="col-md-12 mb-3 upper-jaw"></div>
    <div class="col-md-12 lower-jaw"></div>
  `;
  const upperRow = chart.querySelector('.upper-jaw');
  const lowerRow = chart.querySelector('.lower-jaw');


  

  teethData.forEach((tooth, index) => {
    const toothEl = document.createElement('div');
    toothEl.className = `col-2 col-sm-1 text-center treatment-tooth ${tooth.type.toLowerCase()}`;
    
    // Clear innerHTML, then add elements individually:
    // 1. Tooth type first letter
    const typeSpan = document.createElement('div');
    typeSpan.innerHTML = `<small>${tooth.type[0]}</small>`;
    toothEl.appendChild(typeSpan);
    
    // 2. Tooth number (requested addition)
    const numberSpan = document.createElement('span');
    numberSpan.classList.add('tooth-number');
    numberSpan.textContent = tooth.id;
    toothEl.appendChild(numberSpan);
    
    // 3. Status dot if status exists (requested addition)
    if (tooth.status) {
      const dot = document.createElement('span');
      dot.classList.add('treatment-status-dot', `status-${tooth.status.toLowerCase().replace(/\s+/g, '-')}`);
      toothEl.appendChild(dot);
    }

    // 4. Tooltip div
    const tooltipDiv = document.createElement('div');
    tooltipDiv.className = `tooth-tooltip ${tooth.id <= 16 ? 'tooltip-top' : 'tooltip-bottom'}`;
    tooltipDiv.innerHTML = `
      <strong>${tooth.type}</strong><br>
      Treatment: ${tooth.treatment || 'None'}<br>
      Status: ${tooth.status || 'None'}<br>
      ${tooth.treatmentDateTime ? `Date: ${new Date(tooth.treatmentDateTime).toLocaleString()}` : ''}
    `;
    toothEl.appendChild(tooltipDiv);

    if (selectedTeethIds.has(tooth.id)) toothEl.classList.add('multi-selected');

    toothEl.addEventListener('click', () => {
      if (toggle.checked) {
        selectedTeethIds.has(tooth.id)
          ? selectedTeethIds.delete(tooth.id)
          : selectedTeethIds.add(tooth.id);
        renderChart();
        updateView();
      } else {
        selectedTeethIds.clear();
        selectedTeethIds.add(tooth.id);
        showDetails(tooth);
      }
    });

    toothEl.addEventListener('dblclick', e => {
      e.preventDefault();
      selectedTeethIds.clear();
      selectedTeethIds.add(tooth.id);
      openEditForm([tooth]);
    });

    (index < 16 ? upperRow : lowerRow).appendChild(toothEl);
  });
};



  const updateView = () => {
    editBtn.disabled = selectedTeethIds.size === 0;
    if (selectedTeethIds.size === 1) {
      const t = teethData.find(t => t.id === [...selectedTeethIds][0]);
      showDetails(t);
    } else {
      detailBox.style.display = 'none';
      noInfo.style.display = selectedTeethIds.size ? 'none' : 'block';
    }
  };

  const showDetails = t => {
    detailId.textContent = t.id;
    detailType.textContent = t.type;
    detailTreatment.textContent = t.treatment || '(no treatment)';
    detailStatus.textContent = t.status || '(no status)';
    detailDatetime.textContent = t.treatmentDateTime ? new Date(t.treatmentDateTime).toLocaleString() : '(no date/time)';
    detailBox.style.display = 'block';
    noInfo.style.display = 'none';
    editForm.style.display = 'none';
    editBtn.disabled = false;
  };

  const openEditForm = (teeth) => {
    editingTeeth = teeth;
    editForm.style.display = 'block';
    detailBox.style.display = 'none';
    noInfo.style.display = 'none';

    if (teeth.length === 1) {
      const t = teeth[0];
      editId.textContent = t.id;
      editType.textContent = t.type;
      statusSelect.value = t.status || '';
      description.value = t.treatment || '';
      dateTimeInput.value = t.treatmentDateTime || '';
    } else {
      editId.textContent = teeth.map(t => t.id).join(', ');
      editType.textContent = [...new Set(teeth.map(t => t.type))].join(', ');
      statusSelect.value = '';
      description.value = '';
      dateTimeInput.value = '';
    }
  };

  saveBtn.addEventListener('click', () => {
    if (!statusSelect.value) {
      alert('Select a treatment status');
      return;
    }

    editingTeeth.forEach(t => {
      const tooth = teethData.find(td => td.id === t.id);
      tooth.status = statusSelect.value;
      tooth.treatment = description.value.trim();
      tooth.treatmentDateTime = dateTimeInput.value;
    });

    editForm.style.display = 'none';
    renderChart();
    updateView();
  });

  cancelBtn.addEventListener('click', () => {
    editForm.style.display = 'none';
    updateView();
  });

  editBtn.addEventListener('click', () => {
    const teeth = teethData.filter(t => selectedTeethIds.has(t.id));
    openEditForm(teeth);
  });

  toggle.addEventListener('change', () => {
    selectedTeethIds.clear();
    renderChart();
    updateView();
  });

  renderChart();
  updateView();
});
