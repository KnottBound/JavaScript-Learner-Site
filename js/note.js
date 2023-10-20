const btnNoteEl = document.getElementById('btnnote')
const appEl = document.getElementById('app')

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnNoteEl)
});

function createNoteEl(id, content) {
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.placeholder = "Empty Note"
    element.value = content

    element.addEventListener("dblclick", ()=> {
        const warning = confirm("Do you want to delete this note?")
        if(warning) {
            deleteNote(id, element);
        }
    })

    element.addEventListener("input", ()=> {
        updateNote(id, element.value)
    })

    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((notes) => notes.id != id);
    saveNoteLocalStorage(notes);
    appEl.removeChild(element);
}

function updateNote(id, content) {
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0]; 
    target.content = content;
    saveNoteLocalStorage(notes);
};

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    };
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnNoteEl);

    notes.push(noteObj);

    saveNoteLocalStorage(notes);
}

function saveNoteLocalStorage(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app")|| "[]");
}

btnNoteEl.addEventListener("click", addNote)