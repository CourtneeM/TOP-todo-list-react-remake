import React, { useEffect, useState } from 'react';

const Header = ({ listName, editListName }) => {
  const [editMode, setEditMode] = useState(false);
  const [newListName, setNewListName] = useState(listName);

  useEffect(() => {
    setNewListName(listName);
  }, [listName]);

  const editName = () => {
    editListName(newListName);
    setEditMode(false);
  }

  const displayEditName = () => {
    return (
      <>
        <input type="text" value={newListName} onChange={e => setNewListName(e.target.value)} />
        <i onClick={editName} className="far fa-check-square"></i>
      </>
    )
  }

  const displayName = () => {
    return (
      <>
        <h1>{newListName}</h1>
        <i onClick={() => setEditMode(true)} className="fas fa-edit"></i>
      </>
    )
  }

  return (
    <header>
      { editMode ? displayEditName() : displayName() }
    </header>
  );
}

export default Header;
