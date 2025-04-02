import { useState, useEffect } from "react";
import "../assets/css/todoList.css";
import Add from "../assets/img/plus (1).svg";
import ModalTask from "./modalTask";
import ModalAdd from "./modalAdd";

export default function ToDoApp() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [doneTasks, setDoneTasks] = useState(
    JSON.parse(localStorage.getItem("doneTasks")) || []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDone, setIsTaskDone] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  }, [doneTasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const markTaskAsDone = (task) => {
    if (doneTasks.some((t) => t.id === task.id)) {
      setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
      setTasks([...tasks, task]);
    } else {
      setTasks(tasks.filter((t) => t.id !== task.id));
      setDoneTasks([...doneTasks, task]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
  };

  const openTaskModal = (task, isDone = false) => {
    setSelectedTask(task);
    setIsTaskDone(isDone);
    setIsModalOpen(true);
  };

  // Toggle Done List visibility using CSS class
  const toggleDoneTasks = () => {
    document.querySelector(".doneList").classList.toggle("show");
  };

  return (
    <div className="subTodoListContainer">
      <div className="todoList">
        <div className="headerContainer">
          <p>To-Do List</p>
        </div>

        <div className="seeDoneTaskButton">
          <button className="doneButton1" onClick={toggleDoneTasks}>
            See Done Tasks
          </button>
        </div>

        <div className="taskContainer">
          <div onClick={() => setIsModalAddOpen(true)} className="addContainer">
            <img className="addImage" src={Add} alt="Add Task" />
          </div>

          {tasks.length === 0 ? <p></p> : null}
          {tasks.map((task) => (
            <div key={task.id} onClick={() => openTaskModal(task, false)} className="subTaskContainer">
              <div className="titleContainer">
                <p className="title">{task.title}</p>
              </div>
              <div className="task">
                {task.list.map((subTask, index) => (
                  <li key={index} className="subTask">{subTask}</li>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="doneList">
        <div className="headerContainer">
          <p>Done tasks</p>
        </div>

        <div className="seeDoneTaskButton">
          <button className="doneButton1" onClick={toggleDoneTasks}>
            Hide Done Tasks
          </button>
        </div>

        <div className="doneTaskContainer">
          {doneTasks.length === 0 ? <p>No completed tasks.</p> : null}
          {doneTasks.map((task) => (
            <div key={task.id} onClick={() => openTaskModal(task, true)} className="subDoneTaskContainer">
              <div className="titleContainer">
                <p className="title">{task.title}</p>
              </div>
              <div className="task">
                {task.list.map((subTask, index) => (
                  <li key={index} className="subTask">{subTask}</li>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ModalTask
          isOpen={isModalOpen}
          task={selectedTask}
          markTaskAsDone={markTaskAsDone}
          deleteTask={deleteTask}
          isTaskDone={isTaskDone}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isModalAddOpen && (
        <ModalAdd
          isOpen={isModalAddOpen}
          addTask={addTask}
          onClose={() => setIsModalAddOpen(false)}
        />
      )}
    </div>
  );
}
