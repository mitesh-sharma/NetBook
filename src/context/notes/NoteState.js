import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "https://netbook-backend.onrender.com"
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)

    //Get all notes
    const getNotes = async () =>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json);
    }

    //Add a Note
    const addNote = async (title, description, tag)=>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}),
        });
        const json = await response.json();
          
        const note = json;
        setNotes(notes.concat(note));
    }

    //Delete a Note
    const deleteNote = async (id)=>{
        //TODO: API call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes);
    }
    //Edit a Note
    const editNote = async (id, title, description, tag)=>{
        //API call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
          });
          // eslint-disable-next-line
          const json = await response.json();
        //Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;