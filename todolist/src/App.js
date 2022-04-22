import { useState } from "react";
import "./App.css";
import Form from "./components/Form.js";
import TodoList from "./components/TodoList.js";

function App() {
  const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState([]);
  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        todos={todos}
        inputData={inputData}
        setInputData={setInputData}
        setTodos={setTodos}
      ></Form>
      <TodoList todos={todos} setTodos={setTodos}></TodoList>
    </div>
  );
}

export default App;
