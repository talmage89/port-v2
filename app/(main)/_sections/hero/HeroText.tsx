"use client";

import { useEffect, useState } from "react";

const words = ["innovator", "architect", "contributor", "developer"];

export const HeroText = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;

    const cycleWords = () => {
      setVisible(false);

      setTimeout(() => {
        const nextIndex = (wordIndex + 1) % words.length;
        setWordIndex(nextIndex);

        if (nextIndex === words.length - 1) {
          setFinished(true);
        }

        setVisible(true);
      }, 600);
    };

    if (!finished) {
      const timer = setTimeout(() => {
        cycleWords();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [wordIndex, finished]);

  return (
    <h1 className="mb-0 text-6xl font-bold tracking-tight md:text-7xl">
      <span className="relative block overflow-hidden text-slate-900 dark:text-slate-100">
        Your next
        <span
          className={`ml-3 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pb-1 text-transparent transition-all duration-500 ease-in-out ${visible ? "translate-y-0 opacity-100" : "translate-y-0.5 opacity-0"} `}
        >
          {words[wordIndex]}.
        </span>
      </span>
    </h1>
  );
};
