import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext.jsx';

function TaskCard({ task, taskNumber }) {
  const navigate = useNavigate();

  const {
    editTask,
    deleteTask,
    toggleStatus,
  } = useTaskContext();

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) return;

    editTask(task.id, trimmedTitle);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setConfirmDelete(false);
  };

  return (
    <>
      <div className="task-card">
        <span className="task-id">
          #{taskNumber}
        </span>

        <div className="task-title-cell">
          {editing ? (
            <input
              className="edit-input"
              value={editTitle}
              onChange={(e) =>
                setEditTitle(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleEdit();
                }
              }}
              autoFocus
            />
          ) : (
            <span
              className="task-title"
              onClick={() =>
                navigate(`/task/${task.id}`)
              }
            >
              {task.title}
            </span>
          )}
        </div>

        <span
          className={`status-badge ${
            task.completed
              ? 'done'
              : 'pending'
          }`}
        >
          {task.completed
            ? 'Completed'
            : 'Pending'}
        </span>

        <div className="task-actions">
          {editing ? (
            <>
              <button
                type="button"
                className="action-btn save"
                onClick={handleEdit}
              >
                Save
              </button>

              <button
                type="button"
                className="action-btn cancel"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="action-btn toggle"
                onClick={() => toggleStatus(task.id)}
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>

              <button
                type="button"
                className="action-btn edit"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>

              <button
                type="button"
                className="action-btn delete"
                onClick={() => setConfirmDelete(true)}
              >
                Del
              </button>
            </>
          )}
        </div>
      </div>

      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Delete this task?</p>

            <p className="modal-sub">
              "{task.title}"
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="action-btn cancel"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="action-btn delete"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskCard;