const fs = require('fs')

const getNote = function(){
    return "Your notes"
}

const addNote = function(title , body){
    // fs.writeFileSync()
    const notes =loadNotes();
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // });
    const duplicateNote = notes.find((note)=>{
        return note.title === title
    })
    // if(duplicateNotes.length == 0){
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNote(notes);
    }else{
        console.log("dont add duplicates");
    }
    // const notes =loadNotes();
    console.log("The notes are ",notes);

}

const saveNote = function(notes){
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json' , dataJSON);

}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

const removeNote = function(title){
    const notes = loadNotes();
    const differentNotes = notes.filter(function(note){
        return note.title !== title;
    })
    if(differentNotes.length == 0) return console.log("size is zero");
    saveNote(differentNotes);
    
}
const listnotes=()=>{
    const notes = loadNotes();
    notes.forEach((note)=>{
        console.log(note);
    })
    // console.log(notes);
}


module.exports ={
    addNote :addNote, 
    getNote :getNote,
    removeNote:removeNote,
    listnotes:listnotes
}