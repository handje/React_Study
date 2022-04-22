const Todo = ({ text }) => {
  return (
    <div className="todo">
      <li className="todo-item">{text}</li>
      <button className="delete-btn">❌</button>
    </div>
  );
};
export default Todo;
