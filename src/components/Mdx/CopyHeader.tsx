"use client";

import { Link2 } from "lucide-react";

export const CopyLinkHeader: React.FC<{
  id: string;
  children: React.ReactNode;
}> = ({ id, children }) => {
  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <h2
      id={id}
      className="text-2xl font-semibold m-0 mb-2 text-gray-200 flex items-center group"
    >
      {children}
      <button
        onClick={copyLink}
        className="ml-2 text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy link to section"
      >
        <Link2 size={20} />
      </button>
    </h2>
  );
};
