"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-2 text-teal-400">
          Hi, my name is
        </h1>
        <h2 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          Maciej Kopeć
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl mb-12 max-w-2xl text-center text-gray-300"
      >
        and I just love to code
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          asChild
          className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-110"
        >
          <a href="/projects">Check out my projects!</a>
        </Button>
      </motion.div>
    </div>
  );
}
