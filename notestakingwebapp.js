const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const notesContainer = document.getElementById("notes-container");
const searchBar = document.getElementById("search-bar");
const toggleDarkMode = document.getElementById("toggle-dark-mode");
const prioritySelect = document.getElementById("priority-select");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
function renderNotes(filter = "") {
  notesContainer.innerHTML = "";
  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(filter.toLowerCase())
  );
  filteredNotes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.innerHTML = `
      <p>${note.text}</p>
      <span class="priority">Priority: ${note.priority}</span>
      <div class="actions">
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteDiv);
  });
}

function addNote(e) {
  e.preventDefault();
  const newNote = {
    text: noteInput.value,
    priority: prioritySelect.value,
  };
  notes.push(newNote);
  saveNotes();
  renderNotes();
  noteForm.reset();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function editNote(index) {
  const note = notes[index];
  noteInput.value = note.text;
  prioritySelect.value = note.priority;
  saveNotes(index);
}

function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

noteForm.addEventListener("submit", addNote);
searchBar.addEventListener("input", (e) => renderNotes(e.target.value));
toggleDarkMode.addEventListener("click", toggleMode);

renderNotes();