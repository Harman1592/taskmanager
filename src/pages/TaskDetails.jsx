import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import { useTaskContext } from '../context/TaskContext.jsx';



function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    tasks,
    loading,
  } = useTaskContext();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="details-container">
          <div className="loader">
            Loading...
          </div>
        </div>
      </>
    );
  }

  const task = tasks.find(
    (task) => String(task.id) === String(id)
  );

  if (!task) {
    return (
      <>
        <Navbar />

        <div className="details-container">
          <div className="not-found">
            Task not found
          </div>

          <button
            className="back-btn"
            onClick={() =>
              navigate('/dashboard')
            }
          >
            ← Back to Dashboard
          </button>
        </div>
      </>
    );
  }

  const createdDate = task.createdAt
    ? new Date(
        task.createdAt
      ).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <>
      <Navbar />

      <div className="details-container">
        <button
          className="back-btn"
          onClick={() =>
            navigate('/dashboard')
          }
        >
          ← Back
        </button>

        <div className="details-card">
          <div className="details-header">
            <span className="details-id">
              #{task.id}
            </span>

            <span
              className={`badge ${
                task.completed
                  ? 'done'
                  : 'pending'
              }`}
            >
              {task.completed
                ? 'Completed'
                : 'Pending'}
            </span>
          </div>

          <h2 className="details-title">
            {task.title}
          </h2>

          <div className="details-row">
            <span className="details-label">
              Description
            </span>

            <span className="details-value">
              {task.description || task.title}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">
              Status
            </span>

            <span className="details-value">
              {task.completed
                ? 'Completed'
                : 'Pending'}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">
              Created
            </span>

            <span className="details-value">
              {createdDate}
            </span>
          </div>

          <div className="details-row">
            <span className="details-label">
              User ID
            </span>

            <span className="details-value">
              {task.userId}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;