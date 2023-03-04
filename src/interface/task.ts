export interface ToDoItem {
    id: string,
    createdAt: Date,
    title: string,
    details: string,
    due: any,
    isCompleted: boolean,
    list: any
  }
  
export interface ToDoResponse {
    count: number,
    previous: any,
    next: any,
    results: ToDoItem[]
  }