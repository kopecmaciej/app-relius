"use client";

import { useI18n } from "@/locales/client";
import { Linkedin, Mail } from "lucide-react";
import GitHubIcon from "@/components/icons/GitHubIcon";

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
      <div className="grid grid-cols-1 gap-2 text-lg text-teal-400 ">
        <span className="flex items-center">
          <Mail className="mr-4" />
          <a href="mailto:maciejkopec92@gmail.com" className="hover:underline">
            maciejkopec92@gmail.com
          </a>
        </span>
        <span className="flex items-center">
          <GitHubIcon className="mr-4" />
          <a href="https://github.com/kopecmaciej" className="hover:underline">
            kopecmaciej
          </a>
        </span>
        <span className="flex items-center">
          <Linkedin className="mr-4" />
          <a
            href="https://www.linkedin.com/in/m-kopec"
            className="hover:underline"
          >
            m-kopec
          </a>
        </span>
      </div>
    </div>
  );
}
