import React, { useState, useEffect } from "react";
import TaskModal from "./tryModal";
import AddTaskModal from "./tryAddModal";

const TodoApp = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [doneTasks, setDoneTasks] = useState(
    JSON.parse(localStorage.getItem("doneTasks")) || []
  );

  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  }, [doneTasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const markAsDone = (taskId) => {
    const completedTask = tasks.find((task) => task.id === taskId);
    if (completedTask) {
      setDoneTasks([...doneTasks, completedTask]);
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
    closeModal();
  };

  const undoTask = (taskId) => {
    const undoneTask = doneTasks.find((task) => task.id === taskId);
    if (undoneTask) {
      setTasks([...tasks, undoneTask]);
      setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
    }
    closeModal();
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    closeModal();
  };

  const removeDoneTask = (taskId) => {
    setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
    closeModal();
  };

  const openModal = (task, type) => {
    setSelectedTask(task);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalType("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📌 To-Do App</h2>
      <button onClick={() => setIsAddModalOpen(true)}>➕ Add Todo</button>

      <h3>📝 To-Do List</h3>
      {tasks.length === 0 ? <p>No tasks yet.</p> : null}
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            marginBottom: "10px",
            cursor: "pointer",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
          }}
          onClick={() => openModal(task, "todo")}
        >
          <h4>{task.title}</h4>
          <p><strong>Date:</strong> {task.date}</p>
          <ul>
            {task.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>✅ Done Tasks</h3>
      {doneTasks.length === 0 ? <p>No completed tasks yet.</p> : null}
      {doneTasks.map((task) => (
        <div
          key={task.id}
          style={{
            marginBottom: "10px",
            cursor: "pointer",
            border: "1px solid green",
            padding: "10px",
            borderRadius: "5px",
            color: "green",
          }}
          onClick={() => openModal(task, "done")}
        >
          <h4>{task.title}</h4>
          <p><strong>Date:</strong> {task.date}</p>
          <ul>
            {task.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          modalType={modalType}
          markAsDone={markAsDone}
          undoTask={undoTask}
          removeTask={removeTask}
          removeDoneTask={removeDoneTask}
          closeModal={closeModal}
        />
      )}

      {isAddModalOpen && <AddTaskModal closeModal={() => setIsAddModalOpen(false)} addTask={addTask} />}
    </div>
  );
};

export default TodoApp;
