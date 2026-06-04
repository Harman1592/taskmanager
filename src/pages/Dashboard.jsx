import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';

import Navbar from '../components/Navbar.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import TaskList from '../components/TaskList.jsx';
import Pagination from '../components/Pagination.jsx';
import AddTask from '../components/AddTask.jsx';

import { useTaskContext } from '../context/TaskContext.jsx';
import usePagination from '../hooks/pagination.js';



function Dashboard() {
  const { tasks, loading, error } = useTaskContext();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all'
          ? true
          : filter === 'completed'
          ? task.completed
          : !task.completed;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    reset,
  } = usePagination(filteredTasks);

  useEffect(() => {
    reset();
  }, [search, filter, reset]);

  return (
    <>
      <Navbar
        onAddClick={() => setShowAdd(true)}
      />

      <div className="dashboard-container">
        <h2 className="dashboard-title">
          Tasks
        </h2>

        <SearchFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {loading && (
          <div className="loader">
            Loading tasks...
          </div>
        )}

        {error && (
          <div className="error-msg">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="task-count">
              {filteredTasks.length} task
              {filteredTasks.length !== 1
                ? 's'
                : ''}{' '}
              found
            </p>

            <TaskList tasks={paginatedItems} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </>
        )}
      </div>

      {showAdd && (
        <AddTask
          onClose={() => setShowAdd(false)}
        />
      )}
    </>
  );
}

export default Dashboard;