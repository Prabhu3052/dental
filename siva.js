
const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
  const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));

  let teeth = [
    { id: 1, type: 'Incisor', treatment: '', status: '', date: null },
    { id: 2, type: 'Canine', treatment: '', status: '', date: null },
    // ... initial teeth can be added here
  ];

  let multiSelectedTeeth = new Set();
  let multiSelectMode = false;

  function renderTeeth() {
    const container = document.getElementById('toothSections');
    container.innerHTML = '';

    const types = [...new Set(teeth.map(t => t.type))];
    types.forEach(type => {
      const section = document.createElement('div');
      section.className = 'mb-4';
      const title = document.createElement('h5');
      title.textContent = type + ' Teeth';
      section.appendChild(title);

      const toothRow = document.createElement('div');
      toothRow.className = 'tooth-row';

      teeth.filter(t => t.type === type).forEach(tooth => {
        const toothDiv = document.createElement('div');
        toothDiv.className = 'tooth';
        toothDiv.textContent = tooth.id;
        toothDiv.title = tooth.treatment || 'No treatment info';
        // Status Dot
        const dot = document.createElement('div');
        dot.className = 'status-dot status-none';
        if (tooth.status === 'Ongoing') dot.classList.replace('status-none', 'status-ongoing');
        else if (tooth.status === 'Completed') dot.classList.replace('status-none', 'status-completed');
        toothDiv.appendChild(dot);
        toothRow.appendChild(toothDiv);
      });

      section.appendChild(toothRow);
      container.appendChild(section);
    });
  }

  function showConfirm(message, onConfirm) {
    document.getElementById('confirmModalBody').textContent = message;
    confirmCallback = onConfirm;
    confirmModal.show();
  }

  function showInfo(message) {
    document.getElementById('infoModalBody').textContent = message;
    infoModal.show();
  }

  let confirmCallback = null;

  document.getElementById('btnAddTooth').addEventListener('click', () => {
    teeth.push({
      id: teeth.length + 1,
      type: "Extra Tooth",
      treatment: "",
      status: "",
      date: null,
    });
    renderTeeth();
  });

  document.getElementById('btnDeleteTooth').addEventListener('click', () => {
    if (teeth.length <= 1) {
      showInfo("Cannot delete the last tooth.");
      return;
    }
    showConfirm("Are you sure you want to delete the last tooth?", () => {
      teeth.pop();
      renderTeeth();
      confirmModal.hide();
    });
  });

  document.getElementById('btnConfirmAction').addEventListener('click', () => {
    if (confirmCallback) confirmCallback();
  });

  document.getElementById('btnCancelConfirm').addEventListener('click', () => {
    confirmCallback = null;
  });

  // Initial render
  renderTeeth();
















  