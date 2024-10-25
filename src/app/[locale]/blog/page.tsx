"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import { motion } from "framer-motion";

const posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
  { id: 3, title: "Third Post", content: "This is the third post." },
];

export default function Blog() {
  const t = useI18n();

  return (
    <div className="flex flex-col items-center mt-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-2 text-teal-400">
          {t("blogTitle")}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl mb-12 max-w-2xl text-center text-gray-300"
      >
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4">
              <h2 className="text-2xl font-semibold text-teal-400">{post.title}</h2>
              <p className="text-gray-300">{post.content}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          asChild
          className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <a href="/">{t("backToHome")}</a>
        </Button>
      </motion.div>
    </div>
  );
}
