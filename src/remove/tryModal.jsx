import React from "react";

const TaskModal = ({ task, modalType, markAsDone, undoTask, removeTask, removeDoneTask, closeModal }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
        }}
      >
        <h2>{task.title}</h2>
        <p><strong>Date:</strong> {task.date}</p>
        <ul>
          {task.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {modalType === "todo" ? (
          <>
            <button onClick={() => markAsDone(task.id)}>✔ Done</button>
            <button
              onClick={() => removeTask(task.id)}
              style={{ marginLeft: "5px", backgroundColor: "red", color: "white" }}
            >
              ❌ Remove
            </button>
          </>
        ) : (
          <>
            <button onClick={() => undoTask(task.id)}>↩ Undo</button>
            <button
              onClick={() => removeDoneTask(task.id)}
              style={{ marginLeft: "5px", backgroundColor: "red", color: "white" }}
            >
              🗑 Remove
            </button>
          </>
        )}
        <br />
        <button onClick={closeModal} style={{ marginTop: "10px" }}>Close</button>
      </div>
    </div>
  );
};

export default TaskModal;
