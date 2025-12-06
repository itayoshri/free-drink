"use client";
import { useState } from "react";
import { Check, Copy } from "../Icons";

export default function DataTextbox({ data }: { data: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        navigator.clipboard.writeText(data);
        setCopied(true);
      } catch {}
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = data;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch {}
      document.body.removeChild(textarea);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="bg-white font-code justify-between cursor-pointer ltr dark:bg-zinc-700 text-black flex dark:text-white border dark:border-zinc-500 w-full text-lg font-medium py-3 px-4 rounded-xl"
    >
      <span className="truncate w-full pr-4">{data}</span>
      {copied ? (
        <Check width={20} className="fill-primary" />
      ) : (
        <Copy width={20} />
      )}
    </button>
  );
}
