import { ToDoAccess } from '../data-layer/todo-access'

const toDoAccess = new ToDoAccess()

export async function getAllTodos(userId) {
  return toDoAccess.getAllToDos(userId)
}

export async function createTodo(toDoItem) {
  return toDoAccess.createToDo(toDoItem)
}

export async function deleteTodo(todoId) {
  return toDoAccess.deleteToDoItem(todoId)
}
