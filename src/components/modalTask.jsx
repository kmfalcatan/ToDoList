import "../assets/css/modalTask.css";
import CloseIcon from "../assets/img/x.svg";

const ModalTask = ({ isOpen, onClose, task, markTaskAsDone, deleteTask, isTaskDone }) => {
  if (!isOpen || !task) return null;

  const handleMarkAsDone = () => {
    markTaskAsDone(task);
    onClose();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="modalContainer">
      <div className="subModalContainer">
        <div className="closeContainer">
          <img className="close" onClick={onClose} src={CloseIcon} alt="Close" />
          <p>To-Do List</p>
        </div>

        <div className="addListContainer">
          <div className="subAddListContainer">
            <div className="addList">
              <p>Title:</p>
              <div className="inputTitle">
                <p className="item">{task.title}</p>
              </div>
            </div>

            <div className="addList">
              <p>Duedate:</p>
              <div className="inputTitle">
                <p className="item">{task.dueDate || "No due date"}</p>
              </div>
            </div>

            <div className="addList">
              <p>List items:</p>
              <ul className="listItem">
                {task.list.map((subTask, index) => (
                  <li key={index} className="item">{subTask}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="doneButton" onClick={handleMarkAsDone}>
            {isTaskDone ? "Undo" : "Mark as done"}
          </button>
          <button className="deleteButton" onClick={handleDeleteTask}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ModalTask;
