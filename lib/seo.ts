import type { Metadata, Viewport } from "next";

export const siteConfig = {
  name: "Talmage Bergeson",
  title: "Talmage Bergeson | Web Developer Portfolio",
  description: "Full-stack developer specializing in React, TypeScript, and Next.js. View my projects and skills.",
  url: "https://talmage.dev",
  ogImage: "/og-image.jpg",
  authors: [{ name: "Talmage Bergeson", url: "https://talmage.dev" }],
  keywords: [
    "web developer",
    "portfolio",
    "full-stack developer",
    "javascript",
    "typescript",
    "react",
    "next.js",
    "node.js",
    "django",
    "python",
    "tailwind css",
    "html",
    "css",
  ],
  creator: "Talmage Bergeson",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export function generateMetadata({
  title,
  description,
  image,
  path,
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}): Metadata {
  const currentPath = path || "";

  return {
    ...baseMetadata,
    title: title || baseMetadata.title,
    description: description || baseMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: title || baseMetadata.openGraph?.title,
      description: description || baseMetadata.openGraph?.description,
      url: `${siteConfig.url}${currentPath}`,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: title || baseMetadata.twitter?.title,
      description: description || baseMetadata.twitter?.description,
      images: image ? [image] : baseMetadata.twitter?.images,
    },
  };
}
