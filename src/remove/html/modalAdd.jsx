import { useState } from "react";
import "../assets/css/modalAdd.css";
import CloseIcon from "../assets/img/x.svg";

const AddTaskModal = ({ isOpen, onClose, addTask }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [listItems, setListItems] = useState("");

  const handleAddTask = () => {
    if (!title.trim() || !listItems.trim()) {
      alert("Please enter a title and at least one task item.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      list: listItems.split(",").map((item) => item.trim()), 
    };

    addTask(newTask);
    onClose();
    setTitle("");
    setDueDate("");
    setListItems("");
  };

  if (!isOpen) return null;

  return (
    <div className="modalContainer">
      <div className="subModalContainer">
        <div className="closeContainer">
          <img className="close" onClick={onClose} src={CloseIcon} alt="Close" />
          <p>Add a To-Do</p>
        </div>

        <div className="addListContainer">
          <div className="subAddListContainer">
            <div className="addList">
              <p>Enter your title:</p>
              <input
                className="inputTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="addList">
              <p>Set your Due Date:</p>
              <input
                className="inputTitle"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="addList">
              <p>Enter your list items (comma separated):</p>
              <textarea
                className="listItem"
                value={listItems}
                onChange={(e) => setListItems(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="doneButton" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
