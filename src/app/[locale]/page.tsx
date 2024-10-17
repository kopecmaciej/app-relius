"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client";

export default function Home() {
  const t = useI18n();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
      <p className="text-xl mb-8">{t("description")}</p>
      <Button asChild>
        <a href="/about">{t("learnMore")}</a>
      </Button>
    </div>
  );
}
