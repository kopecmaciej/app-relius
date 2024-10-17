"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";

export default function Home() {
  const t = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-2">{t("greeting")}</h1>
      <h2 className="text-5xl font-bold mb-4">{t("name")}</h2>
      <p className="text-3xl mb-8">{t("tagline")}</p>
      <p className="text-xl mb-8 max-w-2xl text-center">{t("description")}</p>
      <Button asChild className="bg-teal-500 hover:bg-teal-600 text-white">
        <a href="/projects">{t("viewProjects")}</a>
      </Button>
    </div>
  );
}
