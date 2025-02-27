/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import GroceryItemComponent from "./GroceryItemComponent";

const GroceryComponent = () => {
  const inputRef = useRef();
  const [item, setItem] = useState(""); //Input  Field Tracker
  const [groceryItems, setGroceryItems] = useState([]); //Store Items Added
  const [errors, setErrors] = useState("");

  const handleAddItem = () => {
    if (item) {
      setGroceryItems([...groceryItems, { id: uuid(), name: item }]);
      setItem("");
      setErrors("");
    } else {
      setErrors("Grocery Item Cannot be Empty");
      inputRef.current.focus();
    }
  };

  const handleEditItem = (id, newItem) => {
    const updatedGroceryItems = groceryItems.map((item) => {
      if (item.id === id) {
        return { ...item, name: newItem };
      }

      return item;
    });
    setGroceryItems(updatedGroceryItems);
  };

  const handleDeleteItem = (removeId) => {
    const filteredItems = groceryItems.filter((item) => item.id !== removeId);
    setGroceryItems(filteredItems);
  };

  const handleClearItem = () => {
    setGroceryItems([]);
  };

  return (
    <div className="grocery-buddy">
      <h1>Grocery Buddy</h1>
      <div className="input-section">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter an Item ..."
            value={item}
            onChange={(event) => setItem(event.target.value)}
          />
          <button onClick={handleAddItem} className="btn-add">
            Add Item
          </button>
        </div>
        <div> {errors ? <p className="errors">{errors}</p> : null}</div>
      </div>
      <ul className="grocery-list">
        {groceryItems.map((item) => (
          <GroceryItemComponent
            key={item.id}
            item={item}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
      {groceryItems.length > 0 ? (
        <button onClick={handleClearItem} className="btn-clear">
          Clear Items
        </button>
      ) : null}
    </div>
  );
};

export default GroceryComponent;
