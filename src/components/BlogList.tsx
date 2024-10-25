"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Post {
  title: string;
  publishDate: string;
  readTime: string;
  content: string;
  slug: string;
  thumbnail: string;
  categories: string[];
}

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-6 max-w-2xl mx-auto">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-teal-800/20 border border-teal-800/50 hover:bg-teal-800/50 transition-all duration-300 group backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between mb-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.publishDate}</span>
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
                  <Link href={`/blog/${post.slug}`}>
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
  );
}
