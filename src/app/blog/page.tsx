"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const posts = [
  { 
    id: 1, 
    title: "First Post", 
    content: "This is the first post.",
    date: "2024-03-20",
    readTime: "5 min read"
  },
  { 
    id: 2, 
    title: "Second Post", 
    content: "This is the second post.",
    date: "2024-03-18",
    readTime: "3 min read"
  },
  { 
    id: 3, 
    title: "Third Post", 
    content: "This is the third post.",
    date: "2024-03-15",
    readTime: "4 min read"
  },
];

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500">
          My Blog
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Thoughts, ideas, and experiences from my journey in tech
        </p>
      </motion.div>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-zinc-900/80 border border-zinc-800/50 hover:bg-zinc-800/50 transition-all duration-300 group backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between mb-2 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-semibold text-zinc-200 group-hover:text-teal-500 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400">{post.content}</p>
                <div className="mt-4">
                  <Button
                    variant="ghost"
                    className="text-teal-500 hover:text-teal-400 hover:bg-teal-500/10 p-0 group"
                  >
                    <Link href={`/blog/${post.id}`}>
                      Read more
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <Button
          asChild
          variant="outline"
          className="bg-zinc-900/80 border-zinc-800/50 text-zinc-300 hover:bg-zinc-800/50 hover:text-teal-500 hover:border-teal-500/50 transition-colors group"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
