// Html elements
let sNotes = document.querySelector("#savedNotes"); // The unordered list <ul>
let sBtn = document.querySelector("#sBtn"); // The save button <button>
let cBtn = document.querySelector("#clrAll"); // The clear all button <button>
let tInputArea = document.querySelector("#tArea"); // The text area input <textarea>

// Array for note storage
let noteStorage = [];

// Function for grabbing text
function getNote () {
    // Grabs the string from the text area.
    let noteText = tInputArea.value;
    // Resets the text area to blank after saving string.
    tInputArea.value = "";
    // Returns the note in the text area (string).
    return noteText;
}

// Function for save button
function saveNote() {
    // Retrieves and stores note text.
    noteText = getNote();
    // Adds note to the storage array and saves to local storage.
    storeNote(noteText);
    // Loops through array and renders notes from it.
    renderNotes();
}

// Function for saving notes to array
// Pass in note to save (string)
function storeNote (note) {
    // Add note (string) to array.
    noteStorage.push(note);
    // Call function to save array to local storage.
    storeArray();
}

// Function for finding a note in the array
// Pass a note (string)
function findNote (note) {
    // Compares and element to the note passed.
    const matchesNote = (arEl) => arEl === note;
    // Grabs the index of the first element that matches the passed note.
    let noteInd = noteStorage.findIndex(matchesNote);
    // Returns note index in array (integer)
    return noteInd;
}

// Function for removing notes from array
function removeNote (note) {
    // Calls findNote function to get Index of note (integer).
    const noteInd = findNote(note);
    console.log(noteInd);
    // Splice starts at note Index and remove one element (the note).
    noteStorage.splice(noteInd, 1);
    // Call function to save array to local storage.
    storeArray();
}

// Function for saving the array
function storeArray () {
    // Saves the note array to local storage.
    localStorage.setItem("notes", JSON.stringify(noteStorage));
}

// Function for loading stored array
function loadArray () {
    // Saves array from local storage.
    let loadArray = JSON.parse(localStorage.getItem("notes"));
    // Checks if local storage array is empty.
    if (loadArray === null) {
        return;
    } else {
        noteStorage = loadArray;
    };
}

// Function for rendering notes
function renderNotes () {
    // Clear out the existing ul element on page load.
    sNotes.innerHTML = "";
    // Loops through the array and creates a new li for each item
    for (let note of noteStorage) {
        // Creates a floating, unassigned list item.
        let newNote = document.createElement("li");
        // Sets identifying class for floating li.
        newNote.setAttribute("class", "note");
        // Creates a floating, unassigned span.
        let noteSpan = document.createElement("span");
        // Saves the current note string to the floating span.
        noteSpan.textContent = note;
        // Assigns the floating span to the floating li.
        newNote.appendChild(noteSpan);
        // Call function to create new button and assign it to li.
        newNote.appendChild(addDelBtn());
        // Assigns the floating li to the list element.
        sNotes.appendChild(newNote);
    };
}

// Function for handling note deletion
function delBtn (event) {
    // Passes the delete button's sibling (note span) to removeNote.
    removeNote(event.target.previousSibling.textContent);
    // Removes the parent element from the DOM.
    event.target.parentElement.remove();
}

// Function for adding delete button to notes
function addDelBtn () {
    // Creates an floating, unassigned button.
    let newBtn = document.createElement("button");
    // Adds text to unassigned button.
    newBtn.textContent = "Delete Note";
    // Adds attribute to unassigned button.
    newBtn.setAttribute("type", "button");
    // Adds delete event function.
    newBtn.addEventListener("click", delBtn);
    // Returns the the floating, unassigned button object.
    return newBtn;
}

// Function for clearing all notes and saving empty array
function clrAll () {
    let conClr = confirm("Are you sure you want to clear your notes? There's not way to get them back if you do.")
    if (conClr === true) {
        noteStorage = [];
        storeArray();
        renderNotes();
    } else {}
}

// Function Calls
loadArray(); // Loads any existing notes into note array on page load.
renderNotes(); // Renders notes from note array upon page load.

// Event Listeners
sBtn.addEventListener("click", saveNote);
cBtn.addEventListener("click", clrAll);