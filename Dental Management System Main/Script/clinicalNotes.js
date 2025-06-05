
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