"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark as darkTheme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";

export function ThemeAwarePre({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Pre theme={resolvedTheme} {...props}>
      {children}
    </Pre>
  );
}

const Pre = ({ children }: { children: React.ReactNode; theme?: string }) => {
  const childrenArray = React.Children.toArray(children);
  const code = childrenArray[0] as React.ReactElement;
  const className = code.props.className || "";
  const language = className.replace(/language-/, "");
  const codeText = code.props.children.trim();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <div className="bg-gradient-to-r from-teal-800 to-blue-800 text-black px-4 text-sm rounded-t-xl flex justify-between items-center">
          <span>{language}</span>
          <Tooltip>
            <div className="flex items-center">
              {copied && (
                <span className="text-xs text-white mr-2">Copied!</span>
              )}
              <Button
                onClick={handleCopy}
                className="bg-transparent text-white hover:bg-blue-400 hover:rounded-xl"
                size="sm"
              >
                <Copy size={16} />
              </Button>
            </div>
          </Tooltip>
        </div>
        <SyntaxHighlighter
          language={language}
          style={darkTheme}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.375rem 0.375rem",
            padding: "1rem",
          }}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    </TooltipProvider>
  );
};
