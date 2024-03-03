import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleCLick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added successfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2 className={`text-${props.mode === 'light'? 'dark':'light'}`}>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className={`form-label text-${props.mode === 'light'? 'dark':'light'}`}>Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className={`form-label text-${props.mode === 'light'? 'dark':'light'}`}>Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className={`form-label text-${props.mode === 'light'? 'dark':'light'}`}>Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className={`btn btn-${props.mode === 'light'? 'primary':'secondary'}`} onClick={handleCLick}>Add Note</button>
                <p className='text-danger mx-3 d-inline'>
                    {(note.title.length<5 || note.description.length<5) ? "Title and description length should be atleast 5 characters" : ""}
                </p>
            </form>
        </div>
    )
}

export default AddNote