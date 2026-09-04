import { MetadataRoute } from "next";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eyenova.qa";

  const staticRoutes = [
    "",
    "/shop",
    "/shop?category=colored-lenses",
    "/shop?category=medical-lenses",
    "/shop?category=solutions-drops",
    "/shop?category=eyeglasses",
    "/shop?category=sunglasses",
    "/virtual-try-on",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = MOCK_PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
