import fs from "fs";
import path from "path";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

function sanitizeUrls(data: any): any {
  if (!data) return data;
  if (typeof data === "string") {
    // Clean absolute URLs pointing to uploads directory into relative URLs
    return data.replace(/^https?:\/\/[^\/]+\/uploads\//, "/uploads/");
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeUrls(item));
  }
  if (typeof data === "object") {
    const cleaned: any = {};
    for (const key in data) {
      cleaned[key] = sanitizeUrls(data[key]);
    }
    return cleaned;
  }
  return data;
}

// Read directly from db.json if available to bypass the API server during build time
function getLocalDbData(key: string): any {
  try {
    const dbPath = path.join(process.cwd(), "..", "admin-panel", "data", "db.json");
    if (fs.existsSync(dbPath)) {
      const fileContent = fs.readFileSync(dbPath, "utf-8");
      const db = JSON.parse(fileContent);
      return db[key] || null;
    }
  } catch (error) {
    console.error(`Error reading local db.json for key ${key}:`, error);
  }
  return null;
}

export async function fetchLandingPage() {
  const localData = getLocalDbData("landing_settings");
  if (localData) {
    return sanitizeUrls(localData);
  }

  try {
    const res = await fetch(`${BASE_URL}/landing-page`, { cache: "no-store" });
    if (!res.ok) return {};
    const json = await res.json();
    return sanitizeUrls(json.data || {});
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return {};
  }
}

export async function fetchServices() {
  const localData = getLocalDbData("services");
  if (localData) {
    return sanitizeUrls(localData);
  }

  try {
    const res = await fetch(`${BASE_URL}/services`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return sanitizeUrls(json.data || []);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function fetchPortfolios(category?: string, isFeatured?: boolean) {
  const localData = getLocalDbData("portfolios");
  if (localData) {
    let list = localData;
    if (category) {
      list = list.filter((item: any) => item.category === category);
    }
    if (isFeatured !== undefined) {
      list = list.filter((item: any) => item.is_featured === isFeatured);
    }
    return sanitizeUrls(list);
  }

  try {
    let url = `${BASE_URL}/portfolios`;
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (isFeatured !== undefined) params.append("is_featured", String(isFeatured));
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return sanitizeUrls(json.data || []);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    return [];
  }
}

export async function fetchPortfolioDetail(slug: string) {
  const localData = getLocalDbData("portfolios");
  if (localData) {
    const item = localData.find((p: any) => p.slug === slug);
    return item ? sanitizeUrls(item) : null;
  }

  try {
    const res = await fetch(`${BASE_URL}/portfolios/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return sanitizeUrls(json.data || null);
  } catch (error) {
    console.error("Error fetching portfolio detail:", error);
    return null;
  }
}


export async function fetchProducts() {
  const localData = getLocalDbData("products");
  if (localData) {
    return sanitizeUrls(localData);
  }

  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return sanitizeUrls(json.data || []);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchInsights() {
  const localData = getLocalDbData("insights");
  if (localData) {
    return sanitizeUrls(localData);
  }

  try {
    const res = await fetch(`${BASE_URL}/insights`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return sanitizeUrls(json.data || []);
  } catch (error) {
    console.error("Error fetching insights:", error);
    return [];
  }
}

export async function fetchInsightDetail(slug: string) {
  const localData = getLocalDbData("insights");
  if (localData) {
    const item = localData.find((ins: any) => ins.slug === slug);
    return item ? sanitizeUrls(item) : null;
  }

  try {
    const res = await fetch(`${BASE_URL}/insights/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return sanitizeUrls(json.data || null);
  } catch (error) {
    console.error("Error fetching insight detail:", error);
    return null;
  }
}

export async function fetchFAQs() {
  const localData = getLocalDbData("faqs");
  if (localData) {
    return sanitizeUrls(localData);
  }

  try {
    const res = await fetch(`${BASE_URL}/faqs`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return sanitizeUrls(json.data || []);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export async function fetchCalculatorSettings() {
  const localData = getLocalDbData("calculator_settings");
  if (localData) {
    return sanitizeUrls(localData);
  }

  try {
    const res = await fetch(`${BASE_URL}/calculator`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return sanitizeUrls(json.data || null);
  } catch (error) {
    console.error("Error fetching calculator settings:", error);
    return null;
  }
}

export async function fetchCooperationSchemes() {
  const localData = getLocalDbData("cooperation_schemes");
  if (localData) {
    return sanitizeUrls(localData);
  }

  try {
    const res = await fetch(`${BASE_URL}/schemes`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return sanitizeUrls(json.data || null);
  } catch (error) {
    console.error("Error fetching cooperation schemes:", error);
    return null;
  }
}
