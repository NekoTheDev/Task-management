export interface User {
  id: number;
  name: string;
  avatar: string;
  color: string;
}

export interface Tag {
  id: number;
  label: string;
  color: string;
}

export type Status = "todo" | "in-progress" | "done";

export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: User;
  tags: Tag[];
  dueDate: string;
  createdAt: string;
}

export interface Filters {
  authors: number[];
  tags: string[];
  priorities: Priority[];
}
