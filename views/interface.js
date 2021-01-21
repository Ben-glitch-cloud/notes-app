

let notebook = [];
let id = 0;

document.getElementById("create-note").onclick = function() {
    playAudio('sheep.mp3');
    let note = new Note;
    id++;
    let noteId = id;
    let noteText = document.getElementById("myText").value;
    note.create(noteId, noteText);
    let noteTitle = note.getNoteTitle()
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    addToNoteBook(noteId, noteTitle, noteText, dateTime)
    var entry = document.createElement('button')
    entry.setAttribute("id", noteId);
    entry.setAttribute("onclick", `showFullNoteOnClick(${noteId})`)
    entry.appendChild(document.createTextNode(noteTitle));
    document.getElementById("list").appendChild(entry);
    document.getElementById("myText").value = "";

    

}
function showFullNoteOnClick(noteId){
    let cont = document.getElementById("content")
    cont.innerHTML = ''
    var fullContent = findNote(noteId)
    var found = findNote(noteId)
    let text = found['content']
    let time = found['time']
    let div = document.createElement('div')
    let element = document.createElement('p');
    div.appendChild(element);
    div.setAttribute("class", "tabcontent")
    element.innerHTML =  "<p>"+text+"</p>" + time
    cont.appendChild(div);
};


function addToNoteBook(noteId, title, content, time) {
  notebook.push({'id': noteId, 'title': title, 'content': content, 'time': time })
}


function findNote(id){
  for(var i = 0; i < notebook.length; i++) {
    if (notebook[i]['id'] == id) {
      return notebook[i]
    }
  }
}

function getPostData() {
    return fetch("https://makers-emojify.herokuapp.com/", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"text": ""})})
    .then(response => {
        console.log("1")
        console.log(response.json)
        return response.json();
    })
    .catch((error) => {
        console.log("4");
        console.error('Error:', error);
    });
}

function renderPost(postData) {
    console.log("3")
    console.log(postData)
    let postHeadingHTML = `<h1>${postData.emojified_text}</h1>`;
    return `${postHeadingHTML}`;
}

getPostData().then(post => {
    console.log("2")
    console.log(post);
let rendered = renderPost(post);
document.getElementById("main").innerHTML = rendered;
});    

function playAudio(url) {
  new Audio(url).play();
}