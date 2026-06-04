const BASE_URL =
  'https://jsonplaceholder.typicode.com';

export async function fetchTodos() {
  const response = await fetch(
    `${BASE_URL}/todos`
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch tasks'
    );
  }

  return response.json();
}

export async function fetchTodoById(id) {
  const response = await fetch(
    `${BASE_URL}/todos/${id}`
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch task'
    );
  }

  return response.json();
}