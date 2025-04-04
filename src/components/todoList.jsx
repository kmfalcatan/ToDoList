import { useState, useEffect } from "react";
import "../assets/css/todoList.css";
import { Sun, Moon } from "lucide-react";
import Edit from "../assets/img/edit.svg";
import Delete from "../assets/img/trash.svg";
import Undo from "../assets/img/arrow-back.svg";
import { motion, AnimatePresence } from "framer-motion";

function ToDoList() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [showDescription, setShowDescription] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [filter, setFilter] = useState("All");

  const [taskInput, setTaskInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDate, setEditTaskDate] = useState("");
  const [editTaskDescription, setEditTaskDescription] = useState("");
  
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#F8FAFC";
    document.body.style.color = darkMode ? "#E2E8F0" : "#1E293B";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleDescription = () => setShowDescription((prev) => !prev);

  const handleAddTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      name: taskInput,
      dueDate: dateInput,
      priority: priorityInput,
      description: descriptionInput,
      completed: false,
      deleted: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
    setDateInput("");
    setPriorityInput("");
    setDescriptionInput("");
    setShowDescription(false);
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, deleted: true } : task
      )
    );
  };

  const handleUndo = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, deleted: false, completed: false } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return !task.deleted;
    if (filter === "Pending") return !task.completed && !task.deleted;
    if (filter === "Complete") return task.completed && !task.deleted;
    if (filter === "Overdue") {
      if (!task.dueDate) return false;
      return new Date(task.dueDate) < new Date() && !task.completed && !task.deleted;
    }
    if (filter === "Trash") return task.deleted; // Ensure this includes tasks marked as deleted
    return true;
  });

  const formatDateTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString();
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditTaskName(task.name);
    setEditTaskDate(task.dueDate || "");
    setEditTaskDescription(task.description || "");
    // Trigger expansion to 8rem height when editing
    setExpandedTaskId(task.id);
  };

  const handleSaveEdit = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              name: editTaskName,
              dueDate: editTaskDate,
              description: editTaskDescription, // Ensure description is updated
            }
          : task
      )
    );
    setEditingTaskId(null); // Clear editing mode
  };

  return (
    <div className="SubTodoListContainer">
      <div className="todoList">
        <div className="titleContainer">
          <p>To-Do List</p>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="modeContainer">
        <div
          className={`toggle-container ${darkMode ? "dark" : "light"}`}
          onClick={toggleDarkMode}
        >
          <motion.div
            className={`toggle-switch ${darkMode ? "dark" : "light"}`}
            animate={{ x: darkMode ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {darkMode ? <Moon size={20} color="white" /> : <Sun size={20} color="black" />}
          </motion.div>
        </div>
      </div>

      {/* Task Input */}
      <div className="inputContainer">
        <input
          className={`input ${darkMode ? "dark" : "light"}`}
          type="text"
          placeholder="Enter your new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className={`button ${darkMode ? "dark" : "light"}`} onClick={handleAddTask}>
          Add
        </button>
      </div>

      {/* Priority & Date */}
      <div className="categoryContainer">
        <input
          className={`input1 ${darkMode ? "dark" : "light"}`}
          type="datetime-local"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="descriptionContainer">
        <AnimatePresence>
          {showDescription && (
            <motion.textarea
              className={`inputDescription ${darkMode ? "dark" : "light"}`}
              placeholder="Enter description..."
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              initial={{ opacity: 0, height: "0rem", scale: 1 }}
              animate={{ opacity: 1, height: "5rem", scale: 1 }}
              exit={{ opacity: 0, height: "0rem", scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        <p className="description" onClick={toggleDescription}>
          {showDescription ? "Remove Description" : "Add Description"}
        </p>
      </div>

      {/* Filter */}
      <div className="filterContainer">
        {["All", "Pending", "Complete", "Overdue", "Trash"].map((type) => (
          <p
            key={type}
            className={`filter ${filter === type ? "active" : ""}`}
            onClick={() => setFilter(type)}
          >
            {type} (
              {tasks.filter((t) => {
                if (type === "All") return !t.deleted;
                if (type === "Pending") return !t.completed && !t.deleted;
                if (type === "Complete") return t.completed && !t.deleted;
                if (type === "Overdue") return t.dueDate && new Date(t.dueDate) < new Date() && !t.completed && !t.deleted;
                if (type === "Trash") return t.deleted;
                return false;
              }).length}
            )
          </p>
        ))}
      </div>

   {/* Task List */}
<div className="taskContainer">
  {filteredTasks.map((task) => {
    const now = new Date();
    const due = task.dueDate ? new Date(task.dueDate) : null;
    let status = "pending";

    if (task.deleted) status = "deleted";
    else if (task.completed) status = "complete";
    else if (due && due < now) status = "overdue";

    return (
      <motion.div
        key={task.id}
        className={`subTaskContainer ${status} ${task.description ? "withDescription" : "noDescription"}`}
        style={{
          height: expandedTaskId === task.id ? "auto" : "3rem",
          transition: "height 0.3s ease",
        }}
      >
        <div className="checkBoxContainer">
          <div className="nameContainer">
            {status !== "deleted" && (
              <div className="subCheckBoxContainer">
                <input
                  className="checkBox"
                  type="checkbox"
                  checked={status === "complete"}
                  onChange={() => handleToggleComplete(task.id)}
                />
              </div>
            )}

            <div className="nameTaskContainer">
              {editingTaskId === task.id ? (
                <input
                  className={`editTaskInput ${darkMode ? "dark" : "light"}`}
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                />
              ) : (
                <p style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.name}
                </p>
              )}
              {editingTaskId === task.id ? (
                <input
                  className={`editDateInput ${darkMode ? "dark" : "light"}`}
                  type="datetime-local"
                  value={editTaskDate}
                  onChange={(e) => setEditTaskDate(e.target.value)}
                />
              ) : (
                <p className="data">{task.dueDate ? formatDateTime(task.dueDate) : "No due date"}</p>
              )}
            </div>
          </div>

          <div className="nameContainer">
            {/* Edit Button */}
            {status !== "deleted" && (
                <div className="editContainer">
                  <img className="editButton" src={Edit} alt="Edit" onClick={() => handleEdit(task)} />
                </div>
              )}

            {/* Undo or Delete Button */}
            {status === "deleted" ? (
              <div className="editContainer">
                <img className="editButton" src={Undo} alt="Undo" onClick={() => handleUndo(task.id)} />
              </div>
            ) : (
              <div className="editContainer">
                <img className="editButton" src={Delete} alt="Delete" onClick={() => handleDelete(task.id)} />
              </div>
            )}
          </div>
        </div>

        {/* Expandable Description */}
        <AnimatePresence>
          {expandedTaskId === task.id && (
            <motion.div
              className="subTaskInput"
              initial={{ opacity: 0, height: "0rem" }}
              animate={{ opacity: 1, height: "5rem" }}
              exit={{ opacity: 0, height: "0rem" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="description1">Description:</p>
              {editingTaskId === task.id ? (
                <textarea
                 className={`editDescriptionInput ${darkMode ? "dark" : "light"}`}
                  value={editTaskDescription}
                  onChange={(e) => setEditTaskDescription(e.target.value)}
                  placeholder="Edit description..."
                />
              ) : (
                <p className="description2" style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.description ? task.description : "No Description"}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="saveContainer">
        {editingTaskId === task.id && (
          <button className={`saveButton ${darkMode ? "dark" : "light"}`} onClick={() => handleSaveEdit(task.id)}>Save</button>
        )}
        </div>

        {/* Expand/Collapse Button */}
        <button
          className="expandButton"
          onClick={() => {
            // Prevent collapsing while editing
            if (editingTaskId === task.id) return;
            setExpandedTaskId(expandedTaskId === task.id ? null : task.id);
          }}
          disabled={editingTaskId === task.id}
        >
          {expandedTaskId === task.id ? "Collapse Subtask" : "Expand Subtask"}
        </button>
      </motion.div>
    );
  })}
</div>

    </div>
  );
}

export default ToDoList;
