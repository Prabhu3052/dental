
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




  // Modal open logic with patient ID and reg date autofill
  document.querySelector(".add_button").addEventListener("click", () => {

    // Auto-fill patient ID and date
    document.getElementById("patientId").value = "PT-" + Date.now();
    document.getElementById("regDate").value = new Date().toLocaleDateString();
  });

  // Age calculation from DOB
  document.getElementById("dob").addEventListener("change", function () {
    const dob = new Date(this.value);
    const diff = Date.now() - dob.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    document.getElementById("age").value = isNaN(age) ? '' : age;
  });

  // Form step navigation
  let currentStep = 1;
  const steps = document.querySelectorAll(".step");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const saveBtn = document.getElementById("saveBtn");

  function showStep(step) {
    steps.forEach((el, idx) => {
      el.classList.toggle("d-none", idx !== step - 1);
    });
    prevBtn.classList.toggle("d-none", step === 1);
    nextBtn.classList.toggle("d-none", step === steps.length);
    saveBtn.classList.toggle("d-none", step !== steps.length);

    // Tab indicators (optional)
    document.getElementById("step1-tab")?.classList.toggle("active", step === 1);
    document.getElementById("step2-tab")?.classList.toggle("active", step === 2);
    document.getElementById("step3-tab")?.classList.toggle("active", step === 3);
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length) {
      currentStep++;
      showStep(currentStep);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  showStep(currentStep);

  // Dropdown + input + condition tags logic
function setupConditionLogic(selectId, inputId, containerClass, hiddenInputId = null) {
  const select = document.getElementById(selectId);
  const input = document.getElementById(inputId);
  const container = document.querySelector("." + containerClass);
  const hiddenInput = hiddenInputId ? document.getElementById(hiddenInputId) : null;
  const added = new Set();

  function updateHiddenConditions() {
    const allValues = [...container.children].map(tag => tag.dataset.value);
    if (hiddenInput) {
      hiddenInput.value = allValues.join(",");
    }
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

// Call it for each modal
setupConditionLogic("condition-select-1", "custom-condition-1", "condition-1", "conditionsHidden-1");
setupConditionLogic("condition-select-2", "custom-condition-2", "condition-2", "conditionsHidden-2");






  // Sample data for demonstration (add more fields as needed)
  const patients = [
    {
      id: "PAT001",
      regDate: "2025-05-20",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      dob: "1990-01-01",
      age: 35,
      contact: "+91-9876543210",
      emergencyContact: "+91-9123456789",
      idProofUrl: "uploads/id_proof_john.pdf",
      allergies: "Pollen",
      existingConditions: "Diabetes",
      surgeries: "Appendectomy",
      dentalHistory: "Braces, Fillings",
      insuranceProvider: "Max Bupa",
      policyNumber: "POL123456",
      insuranceValidity: "2026-12-31",
      coverage: "Full",
      consentGiven: true,
      consentFormUrl: "uploads/consent_john.pdf",
      bloodGroup: "B+",
      specialNeeds: "None",
      pregnantNursing: "No",
      bleedingDisorders: "No",
      smoking: "Occasionally"
    }
  ];

  // Open View Modal when table row is clicked
  document.querySelectorAll("#patientsTableBody tr").forEach((row, index) => {
    row.addEventListener("click", () => {
      const p = patients[index];

      document.getElementById("viewPatientId").textContent = p.id;
      document.getElementById("viewName").textContent = `${p.firstName} ${p.lastName}`;
      document.getElementById("viewGender").textContent = p.gender;
      document.getElementById("viewAge").textContent = p.age;
      document.getElementById("viewContact").textContent = p.contact;

      document.getElementById("viewEmergencyContact").textContent = p.emergencyContact || "-";
      document.getElementById("viewIdProofLink").href = p.idProofUrl || "#";

      document.getElementById("viewAllergies").textContent = p.allergies || "-";
      document.getElementById("viewConditions").textContent = p.existingConditions || "-";
      document.getElementById("viewSurgeries").textContent = p.surgeries || "-";
      document.getElementById("viewDentalHistory").textContent = p.dentalHistory || "-";

      document.getElementById("viewInsuranceProvider").textContent = p.insuranceProvider || "-";
      document.getElementById("viewPolicyNumber").textContent = p.policyNumber || "-";
      document.getElementById("viewInsuranceValidity").textContent = p.insuranceValidity || "-";
      document.getElementById("viewCoverage").textContent = p.coverage || "-";

      document.getElementById("viewConsentCheckbox").textContent = p.consentGiven ? "Yes" : "No";
      document.getElementById("viewConsentFileLink").href = p.consentFormUrl || "#";

      document.getElementById("viewBloodGroup").textContent = p.bloodGroup || "-";
      document.getElementById("viewSpecialNeeds").textContent = p.specialNeeds || "-";
      document.getElementById("viewPregnantNursing").textContent = p.pregnantNursing || "-";
      document.getElementById("viewBleedingDisorders").textContent = p.bleedingDisorders || "-";
      document.getElementById("viewSmoking").textContent = p.smoking || "-";

      const viewModal = new bootstrap.Modal(document.getElementById("viewPatientModal"));
      viewModal.show();
    });
  });

  // Open Edit Modal from View Modal
  document.getElementById("openEditModalBtn").addEventListener("click", () => {
    const viewModal = bootstrap.Modal.getInstance(document.getElementById("viewPatientModal"));
    viewModal.hide();

    const editModal = new bootstrap.Modal(document.getElementById("editPatientModal"));
    const patientId = document.getElementById("viewPatientId").textContent;
    document.getElementById("patientId").value = patientId;

    // Populate other fields into the edit modal as needed...

    editModal.show();
  });


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
    row.addEventListener("click", () => {
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
  row.addEventListener("click", () => {
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
  row.addEventListener("click", () => {
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
  row.addEventListener("click", () => {
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


  // Tab Navigation
  function showDashboardTab(tabName, event) {
    document.querySelectorAll('.dashboard-tab-content').forEach(div => div.classList.add('d-none'));
    document.querySelector('#tab-' + tabName).classList.remove('d-none');
    document.querySelectorAll('#dashboardTabs .nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
  }

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
    }
  };

  // Initialize all charts
  document.addEventListener('DOMContentLoaded', function() {
    for (const [chartId, config] of Object.entries(chartConfigs)) {
      const ctx = document.getElementById(chartId);
      if (ctx) new Chart(ctx, config);
    }
  });