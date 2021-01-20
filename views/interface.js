var noteBook = []
var id = 0;

document.getElementById("create-note").onclick = function() {
    var note = new Note;
    id++;
    var noteID = id;
    var text = document.getElementById("myText").value;
    note.create(text);
    var noteTitle = note.getNoteTitle();
    addToNoteBook(noteID, noteTitle, text);

    var a = document.createElement('a');
    a.appendChild(document.createTextNode(noteTitle));

    var li = document.createElement('li');
    li.appendChild(a);
    li.setAttribute("id", noteID);
    li.setAttribute("onclick", `showFullNotes(${noteID})`)

    var list = document.getElementById("list")
    list.appendChild(li);
}

function showFullNotes(id){
  var content = document.getElementById("content")
  var fullContent = findNote(id)
  var z = document.createElement('p');
  z.innerHTML = fullContent
  content.appendChild(z);
  
};

function addToNoteBook(noteId, title, content) {
  noteBook.push({'id': id, 'title': title, 'content':content })
}

function findNote(id){
  for(var i = 0; i < noteBook.length; i++) {
    if (noteBook[i]['id'] == id) {
      return noteBook[i]['content']
    }
  }
}

// [{id: id, text: text, title: title}]