"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";
import { motion } from "framer-motion";

export default function Home() {
  const t = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-2 text-teal-400">{t("greeting")}</h1>
        <h2 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          {t("name")}
        </h2>
        <p className="text-3xl mb-8 text-gray-300">{t("tagline")}</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl mb-12 max-w-2xl text-center text-gray-300"
      >
        {t("description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
          <a href="/projects">{t("viewProjects")}</a>
        </Button>
      </motion.div>
    </div>
  );
}
