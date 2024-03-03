import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className='col-md-3'>
      <div className="card my-3 position-relative">
        <div className="d-flex justify-content-end">
          <i className="fa-solid fa-pen m-2" onClick={() => { updateNote(note); }}></i>
          <i className="fa-solid fa-trash-can m-2" onClick={async () => { await deleteNote(note._id); props.showAlert("Deleted successfully", "success") }}></i>
        </div>
        <div className="card-body">
          <h5 className="card-title h3">{note.title}</h5>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
