export const getTodosApi = () => {
  try {
    return localStorage.getItem("todos");
  } catch (e) {}
};

export const setTodosApi = (todos: string) => {
  try {
    return localStorage.setItem("todos", todos);
  } catch (e) {}
};
