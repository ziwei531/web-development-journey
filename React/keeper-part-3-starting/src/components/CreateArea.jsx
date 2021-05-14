import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChanges(event) {
    const { name, value } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function submitNotes(event) {
    props.onAdd(note);
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChanges}
          value={note.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          onChange={handleChanges}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNotes}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
