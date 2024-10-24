"use client";

import { useI18n } from "@/locales/client";
import { Github, Linkedin, LucideIcon, Mail } from "lucide-react";

export default function About() {
  const t = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 text-white">
      <h1 className="text-5xl font-bold mb-4 text-teal-400">
        {t("aboutTitle")}
      </h1>
      <p className="text-xl mb-8 max-w-2xl text-center text-gray-300">
        {t("aboutDescription")}
      </p>
      <div className="text-lg text-gray-300">
        <p>
          Email:{" "}
          <a
            href="mailto:maciejkopec92@gmail.com"
            className="text-teal-400 hover:underline"
          >
            maciejkopec92@gmail.com
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/kopecmaciej"
            className="text-teal-400 hover:underline"
          >
            kopecmaciej
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/m-kopec"
            className="text-teal-400 hover:underline"
          >
            m-kopec
          </a>
        </p>
      </div>
    </div>
  );
}
