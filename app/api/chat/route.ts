import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { chatQueries } from "@/db/schema/chatQueries";
import { getClientIp } from "@/lib/utils";
import Anthropic from "@anthropic-ai/sdk";

const DAILY_LIMIT = 10;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req) || "unknown";

    const usageCount = await getUserDailyUsage(clientIp);
    if (usageCount >= DAILY_LIMIT) {
      return NextResponse.json({ message: "Daily question limit reached" }, { status: 429 });
    }

    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ message: "Message is required" }, { status: 400 });
    }

    const formattedHistory = history
      .filter((msg: any) => msg.role === "user" || msg.role === "assistant")
      .map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      }));

    const systemPrompt = await generateSystemPrompt();

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: systemPrompt,
      messages: formattedHistory.concat([{ role: "user", content: message }]),
    });

    await logChatQuery(clientIp, message);

    return NextResponse.json({
      response: response.content[0].type === "text" ? response.content[0].text : "No response from AI",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
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

async function logChatQuery(clientIp: string, query: string) {
  await db.insert(chatQueries).values({
    clientIp,
    query,
    createdAt: new Date(),
  });
}

async function generateSystemPrompt() {
  const skills = await db.query.skills.findMany();
  const projects = await db.query.projects.findMany({ with: { projectsToProjectTags: { with: { tag: true } } } });
  const blogPosts = await db.query.blogs.findMany({ with: { blogsToTags: { with: { tag: true } } } });

  const skillsInfo = skills.map((s) => `${s.name}: ${s.description}`).join("\n");
  const projectsInfo = projects
    .map(
      (p) =>
        `${p.title}: ${p.description}\nTags: ${p.projectsToProjectTags.map((t) => t.tag.name).join(", ")}\nURL: /projects/${p.id}`,
    )
    .join("\n\n");
  const blogInfo = blogPosts
    .map(
      (b) =>
        `${b.title}: ${b.description}\nTags: ${b.blogsToTags.map((t) => t.tag.name).join(", ")}\nURL: /blog/${b.id}`,
    )
    .join("\n\n");

  const systemPrompt = `
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
2. Format your responses using Markdown.
3. When referring to pages or sections, include the URL path.
4. For skills, projects, or blog posts, provide relevant information and link to the appropriate page.
5. If you don't know something, say so instead of making up information.
6. Your responses should be conversational and friendly.
`;
  return systemPrompt;
}
