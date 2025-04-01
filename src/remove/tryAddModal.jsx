import React, { useState } from "react";

const AddTaskModal = ({ closeModal, addTask }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [listItem, setListItem] = useState("");

  const handleAdd = () => {
    if (!title || !date || !listItem) {
      alert("Please fill all fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      date,
      list: listItem.split(",").map((item) => item.trim()),
    };

    addTask(newTask);
    closeModal();
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2>Add New Task</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="List items (comma separated)" value={listItem} onChange={(e) => setListItem(e.target.value)} />
        <br />
        <button onClick={handleAdd} style={buttonStyle}>Add</button>
        <button onClick={closeModal} style={{ ...buttonStyle, backgroundColor: "red" }}>Close</button>
      </div>
    </div>
  );
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContent = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "300px",
  textAlign: "center",
};

const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "blue",
  color: "white",
};

export default AddTaskModal;
