'use server';
/**
 * @fileOverview A flow for sending email notifications to employees about new tasks.
 *
 * - notifyEmployee - A function that generates and "sends" an email notification.
 * - NotifyEmployeeInput - The input type for the notifyEmployee function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const NotifyEmployeeInputSchema = z.object({
  employeeName: z.string().describe('The name of the employee.'),
  employeeEmail: z.string().describe('The email address of the employee.'),
  taskTitle: z.string().describe('The title of the task.'),
  taskDescription: z.string().describe('The description of the task.'),
  taskDueDate: z.string().describe('The due date of the task.'),
  dashboardUrl: z.string().url().describe('The URL to the employee dashboard.'),
});

export type NotifyEmployeeInput = z.infer<typeof NotifyEmployeeInputSchema>;

const notifyPrompt = ai.definePrompt({
  name: 'notifyPrompt',
  input: { schema: NotifyEmployeeInputSchema },
  prompt: `
    You are an assistant responsible for drafting email notifications.
    Generate a friendly and professional email to an employee about a new task assigned to them.
    The email should be addressed to {{employeeName}}.

    The subject of the email should be: New Task Assigned: {{taskTitle}}

    The body of the email should contain:
    - A greeting to the employee.
    - Information about the new task: title, description, and due date.
    - A link to their dashboard to view the task.

    Email Body:
    Hi {{employeeName}},

    You have been assigned a new task:

    Task: {{taskTitle}}
    Description: {{taskDescription}}
    Due Date: {{taskDueDate}}

    You can view the task details and update its status on your dashboard:
    {{dashboardUrl}}

    Best regards,
    TaskFlow Management
  `,
});

const notifyEmployeeFlow = ai.defineFlow(
  {
    name: 'notifyEmployeeFlow',
    inputSchema: NotifyEmployeeInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    console.log(`Simulating sending email to ${input.employeeEmail}`);

    const llmResponse = await notifyPrompt(input);
    const emailContent = llmResponse.text;

    // In a real application, you would integrate with an email sending service
    // like SendGrid, Resend, or Firebase Trigger Email extension.
    // For this example, we will just log the email content to the console.
    console.log('--- EMAIL CONTENT ---');
    console.log(emailContent);
    console.log('---------------------');
    
    return `Email notification for task "${input.taskTitle}" has been sent to ${input.employeeName}.`;
  }
);

export async function notifyEmployee(input: NotifyEmployeeInput): Promise<string> {
    return await notifyEmployeeFlow(input);
}
