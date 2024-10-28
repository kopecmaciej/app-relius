"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      name: "Vi Mongo",
      url: "https://vi-mongo.com/",
      description: "A powerful MongoDB visualization tool.",
      tags: ["MongoDB", "Visualization", "Open Source"],
    },
    {
      name: "Notibox",
      url: "https://notibox.pl/",
      description: "A smart notification management system.",
      tags: ["Notifications", "Management", "SaaS"],
    },
    {
      name: "Content Flow",
      url: "https://contentflow.ovh/",
      description: "A seamless content delivery platform.",
      tags: ["Content", "CDN", "Platform"],
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
          My Projects
        </h1>
        <p className="text-center text-foreground mb-8">
          Discover some of my featured work and side projects
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-2 border-teal-500/50">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-zinc-100">
                  {project.name}
                </CardTitle>
                <CardDescription className="text-zinc-400 mt-2">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-zinc-800 text-zinc-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardFooter>
                <Button
                  asChild
                  className="w-full group bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                >
                  <Link
                    href={project.url}
                    className="flex items-center justify-center gap-2"
                  >
                    Visit Project
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
