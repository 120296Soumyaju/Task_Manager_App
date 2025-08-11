"use client";

import { useState } from 'react';
import { format, isPast, differenceInDays } from 'date-fns';
import { Calendar, MessageSquare, Send } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { Task, TaskStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onCommentAdd: (taskId: string, commentText: string) => void;
}

const statusOptions: TaskStatus[] = ["To Do", "Doing", "Holding", "Completed"];

export function TaskCard({ task, onStatusChange, onCommentAdd }: TaskCardProps) {
  const [commentText, setCommentText] = useState('');

  const dueDate = new Date(task.dueDate);
  const isOverdue = isPast(dueDate) && task.status !== 'Completed';
  const daysDifference = differenceInDays(dueDate, new Date());

  const getDueDateText = () => {
    if (task.status === 'Completed') return 'Completed';
    if (isOverdue) return `${Math.abs(daysDifference)} days overdue`;
    if (daysDifference === 0) return 'Due today';
    if (daysDifference === 1) return 'Due tomorrow';
    return `Due in ${daysDifference} days`;
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      onCommentAdd(task.id, commentText);
      setCommentText('');
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{task.title}</CardTitle>
        <div className="flex items-center justify-between pt-1">
          <Badge
            variant={isOverdue ? "destructive" : "outline"}
            className="flex items-center gap-2"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>{getDueDateText()}</span>
          </Badge>
          <Select
            defaultValue={task.status}
            onValueChange={(newStatus: TaskStatus) => onStatusChange(task.id, newStatus)}
          >
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option} value={option} className="text-xs">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{task.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Collapsible className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 -ml-2">
              <MessageSquare className="h-4 w-4" />
              <span>Comments ({task.comments.length})</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 pt-2">
            <Separator />
            <ScrollArea className="h-[150px] pr-3">
              <div className="space-y-4">
                {task.comments.length > 0 ? task.comments.map(comment => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.userAvatar} />
                      <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{comment.userName}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(comment.createdAt), 'MMM d')}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.text}</p>
                    </div>
                  </div>
                )) : <p className="text-sm text-muted-foreground text-center py-4">No comments yet.</p>}
              </div>
            </ScrollArea>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button size="icon" onClick={handleAddComment}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </Card>
  );
}
