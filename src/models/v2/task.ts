export interface Task {
  id?: string;
  title: string;
  labels: Label[];
  priority: number;
  deadline?: string;
  description?: string;
  todos: Todo[];
  timestamp: string;
  progress: number;
  todosCount: number;
  todosCompletedCount: number;
  isCompleted: boolean;
}

export interface Todo {
  completed: boolean;
  todo: string;
}

export interface Label {
  label: string;
  color: string;
}
