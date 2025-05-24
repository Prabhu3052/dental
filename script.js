function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Logout functionality
document.getElementById('logoutDiv').addEventListener('click', () => {
    alert('Logging out...');
    // Add your actual logout logic here
});

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
        
        // Add active to clicked
        this.classList.add('active');
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});
document.querySelector('.filter-toggle').addEventListener('click', function() {
    document.querySelector('.filter-panel').classList.toggle('active');
});

// Add click event for breadcrumb items
document.querySelectorAll('.breadcrumb-item').forEach(item => {
    if (!item.classList.contains('active')) {
        item.addEventListener('click', function() {
            // Navigate to dashboard when clicked
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
            
            document.querySelector('[data-target="dashboard"]').classList.add('active');
            document.getElementById('dashboard').classList.add('active');
        });
    }
});

// Add New Patient button functionality
document.querySelector('.add-patient-btn').addEventListener('click', function() {
    alert('Add New Patient form will open here');
    // Implement your add patient functionality here
});
// Add New Patient button functionality
document.querySelector('.add-patient-btn').addEventListener('click', function() {
    alert('Add New Patient form will open here');
    // Implement your add patient functionality here
});

// Sample filter functionality
document.querySelector('.btn-primary').addEventListener('click', function() {
    alert('Filters would be applied here in a real implementation');
});
document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.clickable-row');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            const patientId = this.getAttribute('data-patient-id');
            // In a real app, you would fetch detailed data for this patientId
            // Here we're just using the visible data plus some sample details
            const cells = this.cells;
            
            // Update modal with basic info from the row
            document.getElementById('modal-patient-id').textContent = cells[0].textContent;
            document.getElementById('modal-patient-name').textContent = cells[1].textContent;
            document.getElementById('modal-patient-gender').textContent = cells[2].textContent;
            document.getElementById('modal-patient-age').textContent = cells[3].textContent;
            document.getElementById('modal-patient-contact').textContent = cells[4].textContent;
            document.getElementById('modal-patient-blood').textContent = cells[5].textContent;
            document.getElementById('modal-patient-regdate').textContent = cells[6].textContent;
            
            // Sample additional data (in real app this would come from API)
            const sampleData = {
                "DENT-1001": {
                    dob: "15-06-1988",
                    email: "rajesh.kumar@example.com",
                    insurance: "Active (Expires: 15-07-2024)",
                    address: "123 Gandhi Street, Chennai - 600001",
                    history: "Allergic to Penicillin. Root canal treatment in 2020."
                },
                "DENT-1002": {
                    dob: "22-03-1995",
                    email: "priya.sharma@example.com",
                    insurance: "Active (Expires: 20-10-2023)",
                    address: "456 Nehru Road, Bangalore - 560001",
                    history: "No known allergies. Regular dental checkups."
                },
                // Add data for other patients...
            };
            
            // Fill in the additional fields
            const patientData = sampleData[patientId] || {};
            document.getElementById('modal-patient-dob').textContent = patientData.dob || "Not available";
            document.getElementById('modal-patient-email').textContent = patientData.email || "Not provided";
            document.getElementById('modal-patient-insurance').textContent = patientData.insurance || "No insurance";
            document.getElementById('modal-patient-address').textContent = patientData.address || "Address not provided";
            document.getElementById('modal-patient-history').textContent = patientData.history || "No medical history recorded";
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal
    const addPatientModal = new bootstrap.Modal(document.getElementById('addPatientModal'));
    
    // Open modal when Add New Patient button is clicked
    document.querySelector('.add-patient-btn').addEventListener('click', function() {
        // Generate patient ID (in real app this would come from backend)
        const today = new Date();
        const patientId = `DENT-${today.getFullYear()}${(today.getMonth()+1).toString().padStart(2, '0')}${Math.floor(100 + Math.random() * 900)}`;
        document.getElementById('patientId').value = patientId;
        
        // Set registration date to today
        const regDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getFullYear()}`;
        document.getElementById('regDate').value = regDate;
        
        // Reset form
        resetForm();
        addPatientModal.show();
    });
    
    // DOB checkbox functionality
    document.getElementById('dobCheckbox').addEventListener('change', function() {
        const dobInput = document.getElementById('dob');
        const ageInput = document.getElementById('age');
        
        dobInput.disabled = !this.checked;
        ageInput.disabled = this.checked; // Disable age when DOB is enabled
        
        if (!this.checked) {
            dobInput.value = '';
        } else {
            ageInput.value = '';
        }
    });
    
    // Age checkbox functionality
    document.getElementById('ageCheckbox').addEventListener('change', function() {
        const ageInput = document.getElementById('age');
        ageInput.disabled = !this.checked;
        if (!this.checked) {
            ageInput.value = '';
        }
    });
    
    // Calculate age from DOB
    document.getElementById('dob').addEventListener('change', function() {
        if (this.value && document.getElementById('dobCheckbox').checked) {
            const dob = new Date(this.value);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            document.getElementById('age').value = age;
        }
    });
    
    // Sample existing conditions
    const sampleConditions = [
        "Diabetes", "Hypertension", "Asthma", "Heart Disease", 
        "Allergy to Penicillin", "Arthritis", "Epilepsy", "Thyroid Disorder"
    ];
    
    // Condition search functionality
    const conditionSearch = document.getElementById('conditionSearch');
    const conditionsList = document.getElementById('conditionsList');
    const selectedConditions = document.getElementById('selectedConditions');
    
    conditionSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm) {
            conditionsList.innerHTML = '';
            const filtered = sampleConditions.filter(cond => 
                cond.toLowerCase().includes(searchTerm)
                && !Array.from(selectedConditions.children).some(el => 
                    el.textContent.includes(cond)));
            
            if (filtered.length > 0) {
                filtered.forEach(cond => {
                    const item = document.createElement('div');
                    item.className = 'dropdown-item';
                    item.textContent = cond;
                    item.addEventListener('click', function() {
                        addCondition(cond);
                        conditionsList.style.display = 'none';
                        conditionSearch.value = '';
                    });
                    conditionsList.appendChild(item);
                });
                conditionsList.style.display = 'block';
            } else {
                conditionsList.style.display = 'none';
            }
        } else {
            conditionsList.style.display = 'none';
        }
    });
    
    // Add new condition
    document.getElementById('addCondition').addEventListener('click', function() {
        const newCondition = conditionSearch.value.trim();
        if (newCondition && !Array.from(selectedConditions.children).some(el => 
            el.textContent.includes(newCondition))) {
            addCondition(newCondition);
            conditionSearch.value = '';
            conditionsList.style.display = 'none';
        }
    });
    
    function addCondition(condition) {
        const tag = document.createElement('div');
        tag.className = 'condition-tag';
        tag.innerHTML = `${condition} <span class="remove-condition">&times;</span>`;
        tag.querySelector('.remove-condition').addEventListener('click', function() {
            tag.remove();
        });
        selectedConditions.appendChild(tag);
    }
    
    // Multi-step form navigation
    const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const saveBtn = document.getElementById('saveBtn');
let currentStep = 0;

// Initialize modal steps
function showStep(stepIndex) {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index === stepIndex);
    });
    
    // Update button visibility
    prevBtn.style.display = stepIndex === 0 ? 'none' : 'block';
    nextBtn.style.display = stepIndex === steps.length - 1 ? 'none' : 'block';
    saveBtn.style.display = stepIndex === steps.length - 1 ? 'block' : 'none';
}

nextBtn.addEventListener('click', function() {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
    }
});

prevBtn.addEventListener('click', function() {
    currentStep--;
    showStep(currentStep);
});

// Initialize first step
showStep(0);
    
    function updateButtons() {
        if (currentStep === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'block';
            saveBtn.style.display = 'none';
        } else if (currentStep === steps.length - 1) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'none';
            saveBtn.style.display = 'block';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            saveBtn.style.display = 'none';
        }
    }
    
    function validateStep(step) {
        // Basic validation for step 1
        if (step === 0) {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const gender = document.getElementById('gender').value;
            const idProof = document.getElementById('idProof').value;
            const contactNumber = document.getElementById('contactNumber').value;
            
            if (!firstName || !lastName || !gender || !idProof || !contactNumber) {
                alert('Please fill all required fields (marked with *)');
                return false;
            }
        }
        return true;
    }
    
    // Save patient data
    saveBtn.addEventListener('click', function() {
        // In real app, this would send data to backend
        alert('Patient data saved successfully!');
        addPatientModal.hide();
    });
    
    function resetForm() {
        // Reset all form fields
        document.querySelectorAll('#addPatientModal input, #addPatientModal select').forEach(el => {
            if (el.id !== 'patientId' && el.id !== 'regDate') {
                el.value = '';
            }
        });
        document.getElementById('dobCheckbox').checked = false;
        document.getElementById('dob').disabled = true;
        document.getElementById('ageCheckbox').checked = true;
        document.getElementById('age').disabled = false;
        selectedConditions.innerHTML = '';
        conditionsList.innerHTML = '';
        
        // Reset to first step
        steps.forEach(step => step.classList.remove('active'));
        steps[0].classList.add('active');
        currentStep = 0;
        updateButtons();
    }
});