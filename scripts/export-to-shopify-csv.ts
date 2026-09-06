import * as fs from "fs";
import * as path from "path";
import { MOCK_PRODUCTS, MockProduct } from "../lib/mockData";

function escapeCsv(field: any): string {
  if (field === null || field === undefined) return "";
  const str = String(field);
  if (str.includes(",") || str.includes("\"") || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const headers = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Variant Barcode",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "Status"
];

const rows: string[][] = [];

for (const p of MOCK_PRODUCTS) {
  // Build rich HTML description
  let bodyHtml = `<p>${p.descriptionEn}</p><p dir="rtl" lang="ar">${p.descriptionAr}</p>`;
  bodyHtml += "<ul>";
  if (p.lensDuration) bodyHtml += `<li><strong>Replacement Schedule:</strong> ${p.lensDuration.replace(/_/g, " ")}</li>`;
  if (p.packSize) bodyHtml += `<li><strong>Pack Size:</strong> ${p.packSize} Lenses</li>`;
  if (p.baseCurve) bodyHtml += `<li><strong>Base Curve (BC):</strong> ${p.baseCurve} mm</li>`;
  if (p.diameter) bodyHtml += `<li><strong>Diameter (DIA):</strong> ${p.diameter} mm</li>`;
  if (p.waterContent) bodyHtml += `<li><strong>Water Content:</strong> ${p.waterContent}%</li>`;
  if (p.colorNameEn) bodyHtml += `<li><strong>Color:</strong> ${p.colorNameEn} (${p.colorNameAr || ""})</li>`;
  if (p.lensWidth) bodyHtml += `<li><strong>Lens Width:</strong> ${p.lensWidth} mm</li>`;
  if (p.bridgeWidth) bodyHtml += `<li><strong>Bridge Width:</strong> ${p.bridgeWidth} mm</li>`;
  if (p.templeLength) bodyHtml += `<li><strong>Temple Length:</strong> ${p.templeLength} mm</li>`;
  bodyHtml += "</ul>";

  // Category & Type mapping
  let categoryName = "Health & Beauty > Personal Care > Vision Care";
  let typeName = "Contact Lenses";
  let tags = ["EyeNova", "Qatar Luxury", "Doha"];

  if (p.productType === "COLORED_CONTACT_LENSES") {
    typeName = "Colored Contact Lenses";
    tags.push("colored-lenses", "beauty", "cosmetic", p.brandName);
  } else if (p.productType === "MEDICAL_CONTACT_LENSES") {
    typeName = "Medical Contact Lenses";
    tags.push("clear-lenses", "vision-correction", "medical", p.brandName);
  } else if (p.productType === "LENS_SOLUTION_CARE") {
    typeName = "Contact Lens Solution & Care";
    tags.push("solution", "eye-drops", "lens-care", p.brandName);
  } else if (p.productType === "SPECTACLES") {
    typeName = "Optical Eyeglasses";
    tags.push("eyeglasses", "optical-frames", "prescription-ready", p.brandName);
  } else if (p.productType === "SUNGLASSES") {
    typeName = "Sunglasses";
    tags.push("sunglasses", "uv-protection", "luxury-shades", p.brandName);
  } else if (p.productType === "LASHES_BEAUTY") {
    typeName = "Lashes & Beauty";
    tags.push("lashes", "beauty", "glamour", p.brandName);
  }

  const primaryImage = p.images?.[0]?.imageUrl || "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop";
  const price = p.salePriceQar || p.basePriceQar;
  const compareAt = p.salePriceQar ? p.basePriceQar : "";

  // If product has multiple powers (variants)
  if (p.availablePowers && p.availablePowers.length > 0) {
    p.availablePowers.forEach((power, idx) => {
      const isFirst = idx === 0;
      rows.push([
        p.slug,
        isFirst ? p.titleEn : "",
        isFirst ? bodyHtml : "",
        isFirst ? p.brandName : "",
        isFirst ? categoryName : "",
        isFirst ? typeName : "",
        isFirst ? tags.join(", ") : "",
        isFirst ? "TRUE" : "",
        "Power / Sphere (SPH)",
        power === "0.00" ? "Plano (0.00)" : power,
        "",
        "",
        "",
        "",
        `${p.sku}-${power.replace(".", "_")}`,
        "100",
        "shopify",
        String(p.stockQuantity),
        "deny",
        "manual",
        String(price),
        String(compareAt),
        "TRUE",
        "FALSE",
        "",
        isFirst ? primaryImage : "",
        isFirst ? "1" : "",
        isFirst ? p.titleEn : "",
        "FALSE",
        "active"
      ]);
    });
  } else {
    // Single variant product
    rows.push([
      p.slug,
      p.titleEn,
      bodyHtml,
      p.brandName,
      categoryName,
      typeName,
      tags.join(", "),
      "TRUE",
      "Title",
      "Default Title",
      "",
      "",
      "",
      "",
      p.sku,
      "150",
      "shopify",
      String(p.stockQuantity),
      "deny",
      "manual",
      String(price),
      String(compareAt),
      "TRUE",
      "FALSE",
      "",
      primaryImage,
      "1",
      p.titleEn,
      "FALSE",
      "active"
    ]);
  }
}

// Write to CSV
const csvContent = [
  headers.join(","),
  ...rows.map((row) => row.map(escapeCsv).join(","))
].join("\n");

const outputPath = path.resolve(__dirname, "../shopify-products-import.csv");
fs.writeFileSync(outputPath, csvContent, "utf8");
console.log(`Successfully generated Shopify CSV at: ${outputPath}`);
console.log(`Total exported variant rows: ${rows.length} across ${MOCK_PRODUCTS.length} products.`);
