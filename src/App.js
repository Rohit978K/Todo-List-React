import "./styles.css";
import TodoList from "./TodoList";
import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoType, setTodoType] = useState("");

  const todoNameRef = useRef();

  const TODO_STORAGE_KEY = "todoApp.todos";
  const PENDING_STORAGE_KEY = "todoApp.pending";
  const COMPLETED_STORAGE_KEY = "todoApp.completed";

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodo) => {
      return [...prevTodo, { id: uuid(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
    setPendingTodos((prevTodo) => {
      return [...prevTodo, { id: uuid(), name: name, complete: false }];
    });
  };

  const handlePending = () => {
    const pending = todos.filter((todo) => !todo.complete);
    setPendingTodos(pending);
    const showPending = "SHOWPENDING";
    setTodoType(showPending);
  };

  const handleComplete = () => {
    const completed = todos.filter((todo) => todo.complete);
    setCompletedTodos(completed);
    const showCompleted = "SHOWCOMPLETED";
    setTodoType(showCompleted);
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
    if (todo.complete) {
      setCompletedTodos(newTodos);
      const pending = newTodos.filter((todo) => !todo.complete);
      setPendingTodos(pending);
    } else {
      setPendingTodos(newTodos);
      const completed = newTodos.filter((todo) => todo.complete);
      setCompletedTodos(completed);
    }
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(TODO_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);

    const storedPendingTodos = JSON.parse(
      localStorage.getItem(PENDING_STORAGE_KEY)
    );
    if (storedPendingTodos) setPendingTodos(storedPendingTodos);

    const storedCompletedTodos = JSON.parse(
      localStorage.getItem(COMPLETED_STORAGE_KEY)
    );
    if (storedCompletedTodos) setCompletedTodos(storedCompletedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(pendingTodos));
  }, [pendingTodos]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedTodos));
  }, [completedTodos]);

  const Pending = () => {
    return (
      <div>
        pendings
        <TodoList todos={pendingTodos} toggleTodo={toggleTodo} />
        <hr />
      </div>
    );
  };

  const Completed = () => {
    return (
      <div>
        completed
        <TodoList todos={completedTodos} toggleTodo={toggleTodo} />
      </div>
    );
  };
  return (
    <div className="App container">
      <h1>Todo list</h1>
      <div className="form-floating mb-3">
        <input
          id="floatingInput"
          className="form-control"
          ref={todoNameRef}
          type="text"
        />
        <label htmlFor="floatingInput">Enter a todo</label>
      </div>
      <button className="btn btn-primary mx-1" onClick={handleAddTodo}>
        Add todo
      </button>
      <button className="btn btn-warning mx-1" onClick={handlePending}>
        Show Pending
      </button>
      <button className="btn btn-success mx-1" onClick={handleComplete}>
        Show Completed
      </button>
      <h2>{todos.filter((todo) => !todo.complete).length} left to do</h2>
      todos
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <hr />
      if ({todoType === "SHOWPENDING"})
      <Pending />
      else if({todoType === "SHOWCOMPLETED"})
      <Completed />
    </div>
  );
}
