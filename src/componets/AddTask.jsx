import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext.jsx';

function AddTask({ onClose }) {
  const { addTask } = useTaskContext();

  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Task title is required');
      return;
    }

    addTask({
      title: trimmedTitle,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Task</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Enter task title..."
            className={error ? 'input-error' : ''}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            autoFocus
          />

          {error && (
            <span className="err-msg">
              {error}
            </span>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="action-btn cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="action-btn save"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;