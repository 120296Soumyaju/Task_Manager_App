
"use client";

import Link from "next/link";
import { CheckSquare, Users, BarChart, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Centralized dashboard for admins and employees to manage tasks and departments.",
    },
    {
      icon: <CheckSquare className="h-8 w-8" />,
      title: "Effortless Task Tracking",
      description: "Intuitive kanban-style boards to create, assign, and monitor task progress from 'To Do' to 'Completed'.",
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Automated Notifications",
      description: "Leverage AI to automatically send email notifications to employees when new tasks are assigned.",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Insightful Analytics",
      description: "Get a clear overview of team productivity with dashboard analytics and task status charts.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <CheckSquare className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </Link>
          <div className="flex items-center gap-2">
             <Button asChild variant="outline">
              <Link href="/signup">Create an Account</Link>
            </Button>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center md:px-6 md:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Streamline Your Team's Workflow
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            TaskFlow is the ultimate solution for managing tasks, empowering
            your team with AI-driven notifications and a clear, collaborative
            dashboard.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="bg-secondary/50 py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Everything You Need to Boost Productivity
              </h2>
              <p className="mt-4 text-muted-foreground">
                Discover the features that make TaskFlow the perfect choice for your team.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
