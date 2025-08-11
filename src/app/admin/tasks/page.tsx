"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  MoreHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { notifyEmployee } from "@/ai/flows/notify-flow";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  mockDepartments,
  mockTasks,
  mockUsers,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { TaskStatus } from "@/lib/types";

export default function TasksPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const getEmployeeName = (employeeId?: string) => {
    return mockUsers.find((u) => u.id === employeeId)?.name || "N/A";
  };
  const getDepartmentName = (departmentId?: string) => {
    return mockDepartments.find((d) => d.id === departmentId)?.name || "N/A";
  };

  const availableEmployees = selectedDepartment
    ? mockUsers.filter(u => u.role === 'employee' && u.departmentId === selectedDepartment)
    : [];

  const handleCreateTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const employeeId = form.get("employee") as string;
    
    if (title && description && employeeId && selectedDepartment && dueDate) {
      const new_task = {
        id: `t${tasks.length + 2}`,
        title,
        description,
        employeeId,
        departmentId: selectedDepartment,
        dueDate: format(dueDate, "yyyy-MM-dd"),
        status: "To Do" as TaskStatus,
        comments: [],
      };
      setTasks([new_task, ...tasks]);
      const employee = mockUsers.find(u => u.id === employeeId);
      
      if (employee) {
        try {
          await notifyEmployee({
            employeeName: employee.name,
            employeeEmail: employee.email,
            taskTitle: title,
            taskDescription: description,
            taskDueDate: format(dueDate, "PPP"),
            dashboardUrl: `${window.location.origin}/dashboard`
          });
          toast({
            title: "Task Created Successfully!",
            description: `An email notification has been sent to ${employee?.name}.`,
          });
        } catch (error) {
           console.error("Failed to send notification:", error);
           toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem sending the email notification.",
          });
        }
      }

      (event.target as HTMLFormElement).reset();
      setSelectedDepartment(null);
      setDueDate(undefined);
    }
  };

  const statusColors: Record<TaskStatus, string> = {
    "To Do": "bg-gray-500",
    "Doing": "bg-blue-500",
    "Holding": "bg-yellow-500",
    "Completed": "bg-green-500",
  };

  return (
    <Tabs defaultValue="view-tasks">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Create and manage tasks for your team.
          </p>
        </div>
        <TabsList>
          <TabsTrigger value="view-tasks">View Tasks</TabsTrigger>
          <TabsTrigger value="create-task">Create Task</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="view-tasks">
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>A list of all tasks in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>{getEmployeeName(task.employeeId)}</TableCell>
                    <TableCell>{getDepartmentName(task.departmentId)}</TableCell>
                    <TableCell>{format(new Date(task.dueDate), "PPP")}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", statusColors[task.status])}></span>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="create-task">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Task</CardTitle>
            <CardDescription>
              Fill out the form below to assign a new task.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTask} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" name="title" placeholder="e.g., Design new homepage" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Task Information</Label>
                <Textarea id="description" name="description" placeholder="Provide a detailed description of the task..." required />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select onValueChange={setSelectedDepartment} name="department">
                    <SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger>
                    <SelectContent>
                      {mockDepartments.map((dep) => (
                        <SelectItem key={dep.id} value={dep.id}>
                          {dep.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign to Employee</Label>
                  <Select name="employee" disabled={!selectedDepartment}>
                    <SelectTrigger><SelectValue placeholder="Select an employee" /></SelectTrigger>
                    <SelectContent>
                      {availableEmployees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" className="w-full md:w-auto">Create Task</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
