import React, { useState } from 'react';

const TodoList = ({ tasks, handleAddTask, handleDeleteTask }) => {
  const [task, setTask] = useState('');
  const [likes, setLikes] = useState([]);

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (task !== '') {
      handleAddTask(task);
      setTask('');
      setLikes((prevLikes) => [...prevLikes, 0]);
    }
  };

  const handleLikeClick = (index) => {
    setLikes((prevLikes) => {
      const updatedLikes = [...prevLikes];
      updatedLikes[index] += 1;
      return updatedLikes;
    });
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter a task"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleAddButtonClick}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Add Task
        </button>
      </div>
      {tasks.map((task, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
          <span>{task}</span>
          <button
            onClick={() => handleDeleteTask(index)}
            className="ml-2 text-red-500 hover:text-red-700 py-1 px-2 rounded text-sm"
          >
            Delete
          </button>
          <button
            onClick={() => handleLikeClick(index)}
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Like {likes[index]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;