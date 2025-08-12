
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { mockUsers } from "@/lib/mock-data";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill out all fields.",
      });
      return;
    }

    // Check if user already exists
    if (mockUsers.find((user) => user.email === email)) {
      toast({
        variant: "destructive",
        title: "User already exists",
        description: "An account with this email already exists.",
      });
      return;
    }

    // NOTE: This only updates the local state as we are using mock data.
    // In a real application, you would make an API call to a server endpoint.
    const newUser = {
      id: `u${mockUsers.length + 1}`,
      name,
      email,
      role: "employee" as const,
      avatar: `https://i.pravatar.cc/150?u=u${mockUsers.length + 1}`,
    };
    mockUsers.push(newUser);

    toast({
      title: "Account Created!",
      description: "You have successfully signed up. Please log in.",
    });

    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <CheckSquare className="h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight">TaskFlow</h1>
          <p className="text-muted-foreground">
            Create an account to get started.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </CardContent>
          </form>
          <CardFooter className="text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
