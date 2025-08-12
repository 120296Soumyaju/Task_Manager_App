
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  departmentId?: string;
  avatar?: string;
};

export type Department = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
};

export type TaskStatus = 'To Do' | 'Doing' | 'Holding' | 'Completed';

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  employeeId: string;
  departmentId: string;
  comments: Comment[];
  read: boolean;
};
