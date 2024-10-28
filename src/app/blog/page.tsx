import { BlogList, Post } from "@/components/BlogList";
import { Button } from "@/components/ui/button";
import { readdir } from "fs/promises";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div>
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500">
          My Blog
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          No AI bullshit, just me talking to my future self
        </p>
      </div>

      <BlogList posts={posts} />

      <div className="mt-12 text-center">
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
      </div>
    </div>
  );
}

export async function getPosts(): Promise<Post[]> {
  const slugs = (
    await readdir("./src/app/blog/(posts)", { withFileTypes: true })
  ).filter((dirent) => dirent.isDirectory());

  const posts = (await Promise.all(
    slugs.map(async ({ name }) => {
      const { frontmatter } = await import(`../blog/(posts)/${name}/page.md`);
      return {
        slug: name,
        ...frontmatter,
      };
    }),
  )) as Post[];

  posts.sort((a, b) => +new Date(b.updated) - +new Date(a.updated));

  return posts;
}
