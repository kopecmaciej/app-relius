"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Post {
  title: string;
  updated: string;
  readTime: string;
  content: string;
  slug: string;
  thumbnail: string;
  categories: string[];
}

export function BlogList({ posts }: { posts: Post[] }) {
  const latestPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Featured Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column with 2 posts */}
        <div className="space-y-6">
          {latestPosts.slice(1, 3).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-teal-800/20 border border-teal-800/50 hover:bg-teal-800/50 transition-all duration-300 group backdrop-blur-sm min-h-[250px]">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2 text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.updated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-semibold text-zinc-200 group-hover:text-teal-500 transition-colors">
                    {post.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 text-xs rounded-full bg-teal-500/20 text-teal-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
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

        {/* Right column with latest post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:row-span-2"
        >
          <Card className="bg-teal-800/20 border border-teal-800/50 hover:bg-teal-800/50 transition-all duration-300 group backdrop-blur-sm min-h-[calc(2*250px+1.5rem)]">
            <CardHeader>
              <div className="flex items-center justify-between mb-2 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{latestPosts[0].updated}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{latestPosts[0].readTime}</span>
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold text-zinc-200 group-hover:text-teal-500 transition-colors">
                {latestPosts[0].title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {latestPosts[0].categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 text-xs rounded-full bg-teal-500/20 text-teal-300"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">{latestPosts[0].content}</p>
              <div className="mt-4">
                <Button
                  variant="ghost"
                  className="text-teal-500 hover:text-teal-400 hover:bg-teal-500/10 p-0 group"
                >
                  <Link href={`/blog/${latestPosts[0].slug}`}>
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
      </div>

      {/* Remaining Posts Section */}
      {remainingPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingPosts.map((post, index) => (
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
                      <span>{post.updated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-semibold text-zinc-200 group-hover:text-teal-500 transition-colors">
                    {post.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 text-xs rounded-full bg-teal-500/20 text-teal-300"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
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
      )}
    </div>
  );
}
