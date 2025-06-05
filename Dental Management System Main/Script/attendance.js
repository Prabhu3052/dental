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