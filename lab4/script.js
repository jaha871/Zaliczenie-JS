document.addEventListener("DOMContentLoaded", function () {
  const addNoteForm = document.getElementById("addNoteForm");
  const notesContainer = document.getElementById("notesContainer");

  addNoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const noteTitle = addNoteForm.querySelector(".noteTitle").value;
    const noteContent = addNoteForm.querySelector(".noteContent").value;
    const noteColor = addNoteForm.querySelector(".noteColor").value;
    const pinNote = addNoteForm.querySelector(".pinNote").checked;
    const noteTags = addNoteForm.querySelector(".noteTags").value.split(",");

    const note = {
      title: noteTitle,
      content: noteContent,
      color: noteColor,
      pin: pinNote,
      date: new Date().toLocaleString(),
      tags: noteTags,
    };

    saveNoteToLocalStorage(note);
    displayNotes();
    addNoteForm.reset();
  });

  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function createNoteElement(note, index) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("note-title");
    titleElement.textContent = note.title;

    const contentElement = document.createElement("div");
    contentElement.classList.add("note-content");
    contentElement.textContent = note.content;

    const tagsElement = document.createElement("div");
    tagsElement.textContent = "Tagi: " + (note.tags || []).join(", ");

    const dateElement = document.createElement("div");
    const time = new Date();
    dateElement.textContent = time.toLocaleString();
    
    const actionsElement = document.createElement("div");
    actionsElement.classList.add("note-actions");

    const deleteButton = createButton("Usuń", "delete-btn", () => {
      deleteNote(index);
    });

    const pinButton = createButton(
      note.pin ? "Odepnij" : "Przypnij",
      "pin-btn",
      () => {
        togglePin(index);
      }
    );

    actionsElement.appendChild(deleteButton);
    actionsElement.appendChild(pinButton);

    noteElement.appendChild(titleElement);
    noteElement.appendChild(contentElement);
    noteElement.appendChild(tagsElement);
    noteElement.appendChild(dateElement);
    noteElement.appendChild(actionsElement);

    return noteElement;
  }

  function createButton(text, className, clickHandler) {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
  }

  function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = "";

    const pinnedNotes = notes.filter((note) => note.pin);
    const unpinnedNotes = notes.filter((note) => !note.pin);

    pinnedNotes.forEach(function (note, index) {
      const noteElement = createNoteElement(note, index);
      notesContainer.appendChild(noteElement);
    });

    unpinnedNotes.forEach(function (note, index) {
      const noteElement = createNoteElement(note, index + pinnedNotes.length);
      notesContainer.appendChild(noteElement);
    });
  }
  displayNotes();

  function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
  }

  function togglePin(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[index].pin = !notes[index].pin;

    notes.sort((a, b) => b.pin - a.pin);
    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes();
  }

  function searchNotes() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesContainer = document.getElementById("notesContainer");

    notesContainer.innerHTML = "";

    const filteredNotes = notes.filter((note) => {
      const noteValues = {
        title: note.title.toLowerCase(),
        content: note.content.toLowerCase(),
        tags: (note.tags || []).join(" ").toLowerCase(),
      };

      return Object.values(noteValues).some((value) =>
        value.includes(searchTerm)
      );
    });

    filteredNotes.forEach(function (note, index) {
      const noteElement = createNoteElement(note, index);
      notesContainer.appendChild(noteElement);
    });
  }

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", searchNotes);
});
