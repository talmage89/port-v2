import { siteConfig } from "@/lib/seo";

interface JsonLdProps {
  type: "Person" | "WebSite" | "Project" | "Article" | "BreadcrumbList";
  data?: Record<string, any>;
}

export default function JsonLd({ type, data = {} }: JsonLdProps) {
  let jsonLdData = {};

  switch (type) {
    case "Person":
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        jobTitle: "Full Stack Developer",
        ...data,
      };
      break;

    case "WebSite":
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        ...data,
      };
      break;

    case "Project":
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        creator: {
          "@type": "Person",
          name: siteConfig.name,
        },
        ...data,
      };
      break;

    case "Article":
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Article",
        author: {
          "@type": "Person",
          name: siteConfig.name,
        },
        publisher: {
          "@type": "Person",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/logo.png`,
          },
        },
        ...data,
      };
      break;

    case "BreadcrumbList":
      jsonLdData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        ...data,
      };
      break;

    default:
      jsonLdData = {};
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLdData).replace(/<script/gi, "\\x3Cscript"),
      }}
    />
  );
}
