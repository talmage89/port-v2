# AI Chat Implementation Plan

## Component Structure

### 1. Search Bar in Navigation

```tsx
// In components/impl/Navbar.tsx
import { CommandDialog, CommandInput } from "@/components/ui/command";
import { Search } from "lucide-react";

// Add to Navbar component state
const [isSearchOpen, setIsSearchOpen] = useState(false);

// Add keyboard shortcut handler
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsSearchOpen((open) => !open);
    }
  };

  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);

// Add to desktop navigation section
<button
  onClick={() => setIsSearchOpen(true)}
  className="flex items-center gap-2 text-sm font-medium text-slate-800 transition-all hover:text-slate-900 dark:text-gray-300 dark:hover:text-gray-100"
  aria-label="Search"
>
  <Search className="h-4 w-4" />
  <span className="hidden md:inline">Search</span>
</button>

// Add ChatDialog component at the end of Navbar component
<ChatDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
```

### 2. Chat Dialog Component

```tsx
// components/impl/ChatDialog.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
      // Focus input when dialog opens
      setTimeout(() => inputRef.current?.focus(), 100);

      // Get remaining questions
      checkRemainingQuestions();
    }
  }, [open]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkRemainingQuestions = async () => {
    try {
      const response = await fetch("/api/chat/limit");
      const data = await response.json();
      setQuestionsRemaining(data.remaining);
    } catch (error) {
      console.error("Failed to fetch remaining questions:", error);
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
      <DialogContent className="flex h-[80vh] max-h-[600px] flex-col p-0 sm:max-w-[600px]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <div className="flex items-center gap-2">
            {questionsRemaining !== null && (
              <span className="text-sm text-gray-500">{questionsRemaining} questions remaining today</span>
            )}
            <Button variant="ghost" size="sm" onClick={resetConversation} aria-label="Reset conversation">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <ReactMarkdown className="prose dark:prose-invert prose-sm">{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] items-center rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
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
```

### 3. Export Component

```tsx
// components/impl/index.ts
export * from "./Navbar";
export * from "./Footer";
export * from "./ChatDialog";
```

## API Routes

### 1. Chat API Endpoint

```tsx
// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatQueries } from "@/db/schema/chatQueries";
import { getClientIp } from "@/lib/utils";
import { Anthropic } from "@anthropic/sdk";

// Daily limit per IP
const DAILY_LIMIT = 10;

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    // Get client IP
    const clientIp = getClientIp(req) || "unknown";

    // Check if user has reached daily limit
    const usageCount = await getUserDailyUsage(clientIp);
    if (usageCount >= DAILY_LIMIT) {
      return NextResponse.json({ message: "Daily question limit reached" }, { status: 429 });
    }

    // Parse request body
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ message: "Message is required" }, { status: 400 });
    }

    // Format conversation history for Anthropic
    const formattedHistory = history
      .filter((msg: any) => msg.role === "user" || msg.role === "assistant")
      .map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      }));

    // Create system prompt with site information
    const systemPrompt = await generateSystemPrompt();

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      system: systemPrompt,
      messages: formattedHistory.concat([{ role: "user", content: message }]),
    });

    // Log the query for analytics
    await logChatQuery(clientIp, message);

    return NextResponse.json({
      response: response.content[0].text,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
  }
}

// Helper functions
async function getUserDailyUsage(clientIp: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.query.chatQueries.findMany({
    where: (chat, { and, eq, gte }) => and(eq(chat.clientIp, clientIp), gte(chat.createdAt, today)),
  });

  return result.length;
}

async function logChatQuery(clientIp: string, query: string) {
  await db.insert(chatQueries).values({
    clientIp,
    query,
    createdAt: new Date(),
  });
}

async function generateSystemPrompt() {
  // Gather site information from database
  const skills = await db.query.skills.findMany();
  const projects = await db.query.projects.findMany();
  const blogPosts = await db.query.blogPosts.findMany();

  // Format data for the prompt
  const skillsInfo = skills.map((s) => `${s.name}: ${s.description}`).join("\n");
  const projectsInfo = projects
    .map((p) => `${p.title}: ${p.description}\nTags: ${p.tags.join(", ")}\nURL: /projects/${p.slug}`)
    .join("\n\n");
  const blogInfo = blogPosts
    .map((b) => `${b.title}: ${b.excerpt}\nTags: ${b.tags.join(", ")}\nURL: /blog/${b.slug}`)
    .join("\n\n");

  return `
You are an AI assistant for Talmage Bergeson's portfolio website. Your purpose is to help visitors learn about Talmage's skills, projects, and blog posts, and to navigate the site.

ABOUT TALMAGE:
Talmage Bergeson is a full-stack developer who turns ambitious ideas into reality through persistence, versatility, and continuous learning. He is self-taught and focuses on web development.

SITE STRUCTURE:
- Home: /
- Projects: /projects
- Blog: /blog
- Contact: /#contact
- Skills: /#skills

SKILLS:
${skillsInfo}

PROJECTS:
${projectsInfo}

BLOG POSTS:
${blogInfo}

CONTACT INFORMATION:
Talmage can be reached through the contact form on the website at /#contact, or through his LinkedIn and GitHub profiles linked in the site footer.

GUIDELINES:
1. Be helpful and concise.
2. When referring to pages or sections, include the URL path.
3. For skills, projects, or blog posts, provide relevant information and link to the appropriate page.
4. If you don't know something, say so instead of making up information.
5. Your responses should be conversational and friendly.
`;
}
```

### 2. Rate Limit Check API

```tsx
// app/api/chat/limit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatQueries } from "@/db/schema/chatQueries";
import { getClientIp } from "@/lib/utils";

// Daily limit per IP
const DAILY_LIMIT = 10;

export async function GET(req: NextRequest) {
  try {
    // Get client IP
    const clientIp = getClientIp(req) || "unknown";

    // Check user's daily usage
    const usageCount = await getUserDailyUsage(clientIp);

    return NextResponse.json({
      remaining: Math.max(0, DAILY_LIMIT - usageCount),
      limit: DAILY_LIMIT,
      used: usageCount,
    });
  } catch (error: any) {
    console.error("Limit API error:", error);
    return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
  }
}

async function getUserDailyUsage(clientIp: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.query.chatQueries.findMany({
    where: (chat, { and, eq, gte }) => and(eq(chat.clientIp, clientIp), gte(chat.createdAt, today)),
  });

  return result.length;
}
```

## Database Schema Update

```tsx
// db/schema/chatQueries.ts
import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const chatQueries = pgTable("chat_queries", {
  id: serial("id").primaryKey(),
  clientIp: varchar("client_ip", { length: 50 }).notNull(),
  query: text("query").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

## Utility Functions

```tsx
// Add to lib/utils.ts
export function getClientIp(request: Request): string | null {
  // Try to get IP from headers first (for proxied requests)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // Get the first IP if there are multiple
    return forwardedFor.split(",")[0].trim();
  }

  // Fallback to connection remote address
  return request.headers.get("x-real-ip") || null;
}
```

## Environment Variables

Add to your `.env` file:

```
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Migration Command

To create the necessary database table:

```bash
# Generate migration
npm run generate

# Apply migration
npm run migrate
```

## Implementation Steps

1. Create the database schema for `chatQueries`
2. Run database migrations
3. Update `lib/utils.ts` with the `getClientIp` function
4. Create the `ChatDialog` component
5. Update Navbar component to include the search button and ChatDialog
6. Create the API routes for chat and rate limiting
7. Obtain an Anthropic API key and add it to your environment variables
8. Test the implementation
