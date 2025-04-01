import "../assets/css/modalTask.css";
import CloseIcon from "../assets/img/x.svg";

const ModalTask = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return(
    <div className="modalContainer">
      <div className="subModalContainer">
        <div className="closeContainer">
          <img className="close" onClick={onClose} src={CloseIcon} alt="" />
          <p>Done task</p>
          {children}
        </div>

        <div className="addListContainer">
          <div className="subAddListContainer">
            <div className="addList">
              <p>Title:</p>
              <div className="inputTitle">
                <p className="item">asds</p>
              </div>
            </div>

            <div className="addList">
              <p>Duedate:</p>
              <div className="inputTitle">
                <p className="item">asds</p>
              </div>
            </div>

            <div className="addList">
              <p>List items :</p>
              <div className="listItem">
                <li className="item">asdas</li>
              </div>
            </div>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="doneButton">Undo</button>
          <button className="deleteButton">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ModalTask;