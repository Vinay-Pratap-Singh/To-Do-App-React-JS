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
      <div style={{}} className="h-screen w-full flex items-center justify-center bg-gray-600 overscroll-none">
        {/* div for the to do app */}
        <div className="h-[80vh] w-[330px] p-6 gap-4 flex flex-col items-center bg-gray-800 shadow rounded-lg overflow-y-auto overflow-x-hidden">
          <h1 className="font-bold text-2xl text-white">To Do App</h1>

          {/* input fields for the todo */}
          <form onSubmit={addTodo} className="flex gap-4">
            <input
              className="border px-2 py-1 text-sm font-bold flex-1"
              placeholder="Write your TODO"
              value={text}
              onChange={(event) => setText(event.target.value)}
            ></input>
            <button className="bg-gray-700 hover:bg-black px-4 rounded-sm text-white font-bold hover:font-extrabold hover:text-green-500">
              <i className="fa-solid fa-plus"></i>
            </button>
          </form>

          {/* displaying all the items */}
          {listItem.map((element, index) => {
            return (
              <div
                className="w-full flex items-center justify-between gap-4 px-2 py-1 bg-transparent text-white border"
                key={index}
              >
                <p>{element}</p>
                <div className="flex items-center justify-center gap-4">
                  <button onClick={() => editItem(index)}>
                    <i className="fa-solid fa-pen-to-square hover:text-green-500"></i>
                  </button>
                  <button
                    onClick={() => {
                      deleteItem(index);
                    }}
                  >
                    <i className="fa-solid fa-trash hover:text-red-500"></i>
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