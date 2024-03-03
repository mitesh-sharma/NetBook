import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className='col-md-3'>
      <div className={`card my-3 border-${props.mode === 'light'? 'dark':'light'} position-relative bg-${props.mode === 'light'? 'light':'dark'}`}>
        <div className="d-flex justify-content-end">
          <i className={`fa-solid fa-pen m-2 text-${props.mode === 'light'? 'dark':'light'}`} onClick={() => { updateNote(note); }}></i>
          <i className={`fa-solid fa-trash-can m-2 text-${props.mode === 'light'? 'dark':'light'}`} onClick={async () => { await deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}></i>
        </div>
        <div className="card-body">
          <h5 className={`card-title h3 text-${props.mode === 'light'? 'dark':'light'}`}>{note.title}</h5>
          <p className={`card-text text-${props.mode === 'light'? 'dark':'light'}`}>{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
