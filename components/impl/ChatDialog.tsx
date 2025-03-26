"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { MDXClient } from "./MDXClient";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your AI assistant. Ask me anything about Talmage's skills, projects, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionsRemaining, setQuestionsRemaining] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      checkRemainingQuestions();
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkRemainingQuestions = async () => {
    try {
      const response = await fetch("/api/chat/limit");
      if (response.ok) {
        const data = await response.json();
        setQuestionsRemaining(data.remaining);
      } else {
        // Fallback to a default value if the API isn't working yet
        setQuestionsRemaining(10);
      }
    } catch (error) {
      console.error("Failed to fetch remaining questions:", error);
      // Fallback to a default value
      setQuestionsRemaining(10);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);

      // Update remaining questions
      checkRemainingQuestions();
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi there! I'm your AI assistant. Ask me anything about Talmage's skills, projects, or how to get in touch.",
      },
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] max-h-[800px] flex-col gap-0 p-0 lg:max-w-[800px]">
        <DialogTitle className="sr-only">AI Assistant</DialogTitle>
        <DialogDescription className="sr-only">
          Ask me anything about Talmage's skills, projects, or how to get in touch.
        </DialogDescription>
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <div className="flex items-center gap-2">
            {questionsRemaining !== null && (
              <span className="text-sm text-gray-500">{questionsRemaining} questions remaining today</span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={resetConversation}
              aria-label="Reset conversation"
              className="mr-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500 dark:scrollbar-thumb-slate-400 dark:hover:scrollbar-thumb-slate-300 flex-1 space-y-4 overflow-y-auto scroll-smooth p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" && "bg-gray-100 dark:bg-gray-800"}`}
              >
                <div className="prose dark:prose-invert prose-sm">
                  <MDXClient content={message.content} />
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] items-center p-3">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={questionsRemaining === 0 ? "Daily limit reached" : "Ask a question..."}
            disabled={isLoading || questionsRemaining === 0}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim() || questionsRemaining === 0}
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
