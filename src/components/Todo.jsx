import React from 'react';
import TodoList from './children/Todolist';
import { useState } from 'react';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
  
    const handleAddTask = (task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    };
  
    const handleDeleteTask = (index) => {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks.splice(index, 1);
        return updatedTasks;
      });
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <TodoList
          tasks={tasks}
          handleAddTask={handleAddTask}
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    );
  };
  
  export default Todo;