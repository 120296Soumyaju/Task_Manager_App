"use client";

import { useState, useMemo } from 'react';
import { TaskCard } from '@/components/employee/task-card';
import { mockTasks, mockUsers } from '@/lib/mock-data';
import type { Task, TaskStatus } from '@/lib/types';

const statusOrder: TaskStatus[] = ["To Do", "Doing", "Holding", "Completed"];

export default function EmployeeDashboard() {
  // In a real app, this would come from a user session
  const currentUserId = 'u2'; 
  const currentUser = mockUsers.find(u => u.id === currentUserId);

  const [tasks, setTasks] = useState<Task[]>(
    mockTasks.filter(task => task.employeeId === currentUserId)
  );

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  
  const handleCommentAdd = (taskId: string, commentText: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId && currentUser) {
          const newComment = {
            id: `c${Date.now()}`,
            text: commentText,
            userId: currentUser.id,
            userName: currentUser.name,
            userAvatar: currentUser.avatar,
            createdAt: new Date().toISOString().split('T')[0],
          };
          return { ...task, comments: [...task.comments, newComment] };
        }
        return task;
      })
    );
  };

  const groupedTasks = useMemo(() => {
    const groups: Record<TaskStatus, Task[]> = {
      "To Do": [],
      "Doing": [],
      "Holding": [],
      "Completed": [],
    };
    tasks.forEach(task => {
      groups[task.status].push(task);
    });
    return groups;
  }, [tasks]);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">
        Welcome, {currentUser?.name}!
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Here are your assigned tasks. Let's get things done!
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statusOrder.map(status => (
          <div key={status} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold tracking-tight px-1">{status} ({groupedTasks[status].length})</h2>
            <div className="flex flex-col gap-4 rounded-lg bg-secondary/50 p-4 min-h-[200px]">
              {groupedTasks[status].length > 0 ? (
                groupedTasks[status]
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onStatusChange={handleStatusChange}
                      onCommentAdd={handleCommentAdd}
                    />
                ))
              ) : (
                <div className="flex flex-1 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30">
                  <p className="text-sm text-muted-foreground">No tasks here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
