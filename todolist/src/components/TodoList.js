import Todo from "./Todo.js";
const TodoList = ({ todos }) => {
  return (
    <div className="todo-container">
      <ul id="todoList" className="todo-list">
        {todos.map((todo) => (
          <Todo text={todo.text} key={todo.id}></Todo>
        ))}
      </ul>
    </div>
  );
};
export default TodoList;
