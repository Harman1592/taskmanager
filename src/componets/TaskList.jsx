import React from 'react';
import TaskCard from './TaskCard.jsx';

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <span>ID</span>
        <span>Title</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          taskNumber={index + 1}
        />
      ))}
    </div>
  );
}

export default TaskList;