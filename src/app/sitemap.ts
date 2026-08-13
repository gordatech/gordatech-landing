export const dynamic = "force-static";

import { MetadataRoute } from "next";
import { fetchServices, fetchPortfolios, fetchInsights } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://gordatech.com";

  // Static URLs
  const staticPaths = [
    "",
    "/layanan",
    "/portfolio",
    "/produk",
    "/tentang",
    "/kontak",
    "/insight",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic services anchors
  const services = await fetchServices();
  const servicePaths = services.map((srv: any) => ({
    url: `${BASE_URL}/layanan#${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic portfolios anchors
  const portfolios = await fetchPortfolios();
  const portfolioPaths = portfolios.map((port: any) => ({
    url: `${BASE_URL}/portfolio#${port.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic insights paths
  const insights = await fetchInsights();
  const insightPaths = insights.map((ins: any) => ({
    url: `${BASE_URL}/insight/${ins.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPaths, ...servicePaths, ...portfolioPaths, ...insightPaths];
}
