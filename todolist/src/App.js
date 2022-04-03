import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);
  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") return;
    setTodolist((currentArray) => [todo, ...currentArray]); //처음 인수는 현재 state
    setTodo("");
  };
  return (
    <div>
      <h1>Todo List : {todolist.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Write your to do"
          value={todo}
          onChange={onChange}
        ></input>
        <button>Add To Do</button>
      </form>
      <hr></hr>
      {todolist.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
}

export default App;
