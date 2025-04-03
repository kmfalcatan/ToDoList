import { useState, useEffect } from "react";
import "../assets/css/todoList.css";
import { Sun, Moon } from "lucide-react";
import Edit from "../assets/img/edit.svg"
import Delete from "../assets/img/trash.svg"
import { motion, AnimatePresence } from "framer-motion";

function ToDoList() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [showDescription, setShowDescription] = useState(false);
  const [expanded, setExpanded] = useState(false); // State for expanding textarea
  const [subTask, setSubTask] = useState(""); // State for subtask input

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#F8FAFC";
    document.body.style.color = darkMode ? "#E2E8F0" : "#1E293B";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
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
        <input className={`input ${darkMode ? "dark" : "light"}`} type="text" placeholder="Enter your new task..." />
        <button className={`button ${darkMode ? "dark" : "light"}`}>Add</button>
      </div>

      {/* Priority & Date */}
      <div className="categoryContainer">
        <input className={`input1 ${darkMode ? "dark" : "light"}`} type="datetime-local" />
        <select className={`input1 ${darkMode ? "dark" : "light"}`}>
          <option value="" disabled>
            Choose a priority
          </option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Description */}
      <div className="descriptionContainer">
        {/* Animate Input Field Expanding */}
        <AnimatePresence>
          {showDescription && (
            <motion.textarea
              className={`inputDescription ${darkMode ? "dark" : "light"}`}
              placeholder="Enter description..."
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

      <div className="filterContainer">
        <p className="filter">All(99)</p>
        <p className="filter">Pending(99)</p>
        <p className="filter">Complete(99)</p>
        <p className="filter">Over Due(99)</p>
        <p className="filter">Delete(99)</p>
      </div>

      <div className="taskContainer">
        <motion.div
          className="subTaskContainer"
          style={{
            height: expanded ? "auto" : "3rem",
            transition: "height 0.3s ease",
          }}
        >
          <div className="checkBoxContainer">
            <div className="nameContainer">
              <div className="subCheckBoxContainer">
                <input className="checkBox" type="checkBox" />
              </div>

              <div className="nameTaskContainer">
                <p>Assigndsadsmasda</p>
                <p className="data">02/29/2025</p>
              </div>
            </div>

            <div className="nameContainer">
              <div className="editContainer">
                <img className="editButton" src={Edit} alt="" />
              </div>

              <div className="editContainer">
                <img className="editButton" src={Delete} alt="" />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                className="subTaskInput"
                value={subTask}
                onChange={(e) => setSubTask(e.target.value)}
                placeholder="Enter your subtask..."
                initial={{ opacity: 0, height: "0rem" }}
                animate={{ opacity: 1, height: "5rem" }}
                exit={{ opacity: 0, height: "0rem" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="description1">Description:</p>
                <p className="description2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto, at libero earum aliquam accusantium beatae est modi obcaecati. Aspernatur quod possimus nesciunt ad porro odio ratione magnam. Amet, deleniti rem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed esse, nulla assumenda libero magnam neque ad! Minima eos provident aspernatur similique esse, delectus ea officiis cumque eaque pariatur blanditiis iure!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button to Expand/Collapse Subtask */}
          <button className="expandButton" onClick={toggleExpand}>
            {expanded ? "Collapse Subtask" : "Expand Subtask"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default ToDoList;
