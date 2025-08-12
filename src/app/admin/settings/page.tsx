
"use client";

import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function AdminSettingsPage() {
  const { toast } = useToast();
  // In a real app, you would get this from a session/context
  const adminUser = mockUsers.find(u => u.role === 'admin')!;
  
  const [user, setUser] = useState(adminUser);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    // Keep form values in sync with the user state
    values: {
        name: user.name,
        email: user.email,
    }
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarUrl = e.target?.result as string;
        // In a real app, you would upload this file to a storage service
        // and then update the user's avatar URL in the database.
        setUser({ ...user, avatar: newAvatarUrl });
        toast({
          title: "Avatar Updated",
          description: "Your profile picture has been changed.",
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    // NOTE: This only updates the local state as we are using mock data.
    // In a real application, you would make an API call to update the user data.
    setUser({ ...user, ...data });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
             <button
              onClick={handleAvatarClick}
              className="relative rounded-full"
              aria-label="Change profile picture"
            >
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
               <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                <span className="text-xs text-white">Change</span>
              </div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
