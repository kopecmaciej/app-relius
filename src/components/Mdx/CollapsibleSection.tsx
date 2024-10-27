"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full text-left px-4 py-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
      >
        {isOpen ? (
          <ChevronDown className="mr-2 h-5 w-5" />
        ) : (
          <ChevronRight className="mr-2 h-5 w-5" />
        )}
        <span className="text-xl font-semibold">{title}</span>
      </button>
      {isOpen && (
        <div className="mt-2 pl-4 border-l-2 border-gray-700">{children}</div>
      )}
    </div>
  );
};
