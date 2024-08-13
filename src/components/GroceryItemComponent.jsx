import React, { useRef, useState } from "react";

const GroceryItemComponent = ({ item, handleEditItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false); //Track if the Edit Button is Clicked
  const [newItem, setNewItem] = useState(item.name); //Track input field for the updated or new Item
  const [errors, setErrors] = useState("");
  const inputRef = useRef();
  const onEdit = () => {
    if (newItem) {
      handleEditItem(item.id, newItem);
      setIsEditing(false);
      setErrors("");
    } else {
      setErrors("Grocery Items Cannot be Empty");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <li>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
          />
        ) : (
          <span>{item.name}</span>
        )}
        <div>
          <button
            onClick={() => {
              isEditing ? onEdit() : setIsEditing(true);
            }}
            className="btn-edit">
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDeleteItem(item.id)}>
            Delete
          </button>
        </div>
      </li>
      {errors ? <p className="errors">{errors}</p> : null}
    </>
  );
};

export default GroceryItemComponent;
