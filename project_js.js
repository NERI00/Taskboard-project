let textInputElement = document.getElementById("text-box")
let dateInputElement = document.getElementById("date-box")
let timeInputElement = document.getElementById("time-box")

let notesOutputContainer = document.getElementById("note")

const addNote = () => {
    if (textInputElement.value === '' || dateInputElement.value === '' || timeInputElement.value === '') {
        alert("please fill all the note and try again.")
        return
    }

    let newId = Math.floor(Math.random() * 10000)
    let newNote = {
        id: newId,
        
        text: textInputElement.value,
        date: dateInputElement.value,
        time: timeInputElement.value
    }

    let jsonArr = localStorage.getItem("notes-list")
    let notesList = JSON.parse(jsonArr)

    if (notesList === null) {
        notesList = []
    }

    //neri fav line
    notesList.unshift(newNote)

    let toJson = JSON.stringify(notesList)
    localStorage.setItem("notes-list", toJson)

    loadNotes()

    textInputElement.value = ''
    dateInputElement.value = ''
    timeInputElement.value = ''
}

const loadNotes = () => {
    let jsonArr = localStorage.getItem("notes-list")
    let notesList = JSON.parse(jsonArr)

    if (notesList === null) {
        return
    }
    let noteContainer = ``
    for (let note of notesList) {
        noteContainer += `<div id="output-note-container" class="note">
                            <div id="text-output">${note.text}</div>
                            <div class="time-date-output" id="time-date-output">${note.date}<br>${note.time}</div>
                            <button type="button" id="delete-note" class="close" aria-label="Close" onclick="deleteNote(${note.id})">
                                <span aria-hidden="true">&times;</span>
                            </button>
                         </div>`
    }
    notesOutputContainer.innerHTML = noteContainer
}

const deleteNote = (id) => {
    let jsonArr = localStorage.getItem("notes-list")
    let notesList = JSON.parse(jsonArr)

    let findNotes = notesList.filter(el => el.id !== id)
    notesList = findNotes

    let toJson = JSON.stringify(notesList)
    localStorage.setItem("notes-list", toJson)

    loadNotes()
}


