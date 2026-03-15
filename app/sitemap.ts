import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/browse`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/promosi`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/dashboard`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/kontrabon`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/stock`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/notifications`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/favorites`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/history`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/profile`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/splash`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
