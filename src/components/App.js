import { logDOM } from "@testing-library/react";
import React, { useState } from "react";
// import Listitem from "./Listitem";

const App = () => {
  const [text, setText] = useState("");
  // assigning the localstorage data to list item if data exist
  let localData = localStorage.getItem("data");
  const [listItem, setListItem] = useState(localData?(localStorage.getItem("data")).split(","):[]);

  // to check that it was edited one or not
  let [editable, setEditable] = useState(false);
  let [editableIndex, setEditableIndex] = useState(0);

  // function to add the item in the todo list
  const addTodo = (event) => {
    event.preventDefault();
    let newItems;
    if (editable && text) {
      newItems = [...listItem];
      newItems[editableIndex] = text;
      setEditable(false);
      setListItem([...newItems]);
    } else if (text) {
      newItems = [...listItem, text];
      setListItem(newItems);
    }
    setText("");
    // Saving the data in the local storage
    localStorage.setItem("data", newItems);
  };

  // function to delete the item
  const deleteItem = (index) => {
    const newList = listItem.filter((element, ind) => {
      if (ind !== index) {
        return element;
      }
    });
    setListItem(newList);
    // Saving the data in the local storage
    localStorage.setItem("data", newList);
  };

  // function to edit the item details
  const editItem = (index) => {
    setText(listItem[index]);
    setEditable(true);
    setEditableIndex(index);
    // Saving the data in the local storage
    localStorage.setItem("data", listItem);
  };

  return (
    <>
      {/* wrapping the whole app inside this div */}
      <div className="h-screen w-full flex items-center justify-center">
        {/* main div for the to do app */}
        <div className="border border-black p-10 gap-4 flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-2xl">To Do App</h1>

          {/* input fields for the todo */}
          <form onSubmit={addTodo} className="flex gap-4">
            <input
              className="border border-black px-2 py-1"
              placeholder="Write your TODO"
              value={text}
              onChange={(event) => setText(event.target.value)}
            ></input>
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
          </form>

          {/* displaying all the items */}
          {listItem.map((element, index) => {
            return (
              <div
                className="w-full flex items-center justify-between gap-4"
                key={index}
              >
                <p>{element}</p>
                <div className="flex items-center justify-center gap-4">
                  <button onClick={() => editItem(index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => {
                      deleteItem(index);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default App;
