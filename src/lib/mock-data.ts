import type { Department, Task, User, Comment } from '@/lib/types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Admin User', email: 'admin@taskflow.com', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Alice Johnson', email: 'alice@taskflow.com', role: 'employee', departmentId: 'd1', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Bob Williams', email: 'bob@taskflow.com', role: 'employee', departmentId: 'd1', avatar: 'https://i.pravatar.cc/150?u=u3' },
  { id: 'u4', name: 'Charlie Brown', email: 'charlie@taskflow.com', role: 'employee', departmentId: 'd2', avatar: 'https://i.pravatar.cc/150?u=u4' },
  { id: 'u5', name: 'Diana Prince', email: 'diana@taskflow.com', role: 'employee', departmentId: 'd3', avatar: 'https://i.pravatar.cc/150?u=u5' },
];

export const mockDepartments: Department[] = [
  { id: 'd1', name: 'Engineering' },
  { id: 'd2', name: 'Marketing' },
  { id: 'd3', name: 'Human Resources' },
  { id: 'd4', name: 'Sales' },
];

const comments: { [key: string]: Comment[] } = {
  t1: [
    { id: 'c1', text: 'Started working on the component structure.', userId: 'u2', userName: 'Alice Johnson', userAvatar: 'https://i.pravatar.cc/150?u=u2', createdAt: '2024-07-28' },
  ],
  t2: [
    { id: 'c2', text: 'The issue was with the database connection string. It has been resolved and deployed.', userId: 'u3', userName: 'Bob Williams', userAvatar: 'https://i.pravatar.cc/150?u=u3', createdAt: '2024-07-29' },
    { id: 'c3', text: 'Great work, Bob!', userId: 'u1', userName: 'Admin User', userAvatar: 'https://i.pravatar.cc/150?u=u1', createdAt: '2024-07-29' },
  ],
  t4: [
    { id: 'c4', text: 'Waiting for the final list of new hires from management.', userId: 'u5', userName: 'Diana Prince', userAvatar: 'https://i.pravatar.cc/150?u=u5', createdAt: '2024-07-25' },
  ]
};

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Develop new login page UI',
    description: 'Create a responsive and user-friendly login page based on the new design mocks.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0],
    status: 'Doing',
    employeeId: 'u2',
    departmentId: 'd1',
    comments: comments['t1'],
  },
  {
    id: 't2',
    title: 'Fix API integration bug',
    description: 'The user endpoint is returning a 500 error on invalid inputs. Needs investigation and fix.',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
    status: 'Completed',
    employeeId: 'u3',
    departmentId: 'd1',
    comments: comments['t2'],
  },
  {
    id: 't3',
    title: 'Design new marketing campaign materials',
    description: 'Create visuals for the upcoming Q4 marketing campaign, including social media posts and email templates.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],
    status: 'To Do',
    employeeId: 'u4',
    departmentId: 'd2',
    comments: [],
  },
  {
    id: 't4',
    title: 'Onboard new hires',
    description: 'Prepare and conduct onboarding sessions for the three new software engineers joining next week.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 8)).toISOString().split('T')[0],
    status: 'Holding',
    employeeId: 'u5',
    departmentId: 'd3',
    comments: comments['t4'],
  },
  {
    id: 't5',
    title: 'Refactor user authentication flow',
    description: 'Improve the performance and security of the user authentication module.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 12)).toISOString().split('T')[0],
    status: 'To Do',
    employeeId: 'u2',
    departmentId: 'd1',
    comments: [],
  },
  {
    id: 't6',
    title: 'Prepare Q3 Sales Report',
    description: 'Compile and analyze sales data for the third quarter.',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    status: 'Doing',
    employeeId: 'u3',
    departmentId: 'd4',
    comments: [],
  },
];
