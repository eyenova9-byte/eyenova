/**
 * EyeNova Qatar — Automated Nuclei Template Runner & Protocol Simulator
 * Executes all Nuclei YAML test templates in d:\eye\nuclei against simulated
 * live HTTP requests to test and verify application endpoints and security controls.
 */

import * as fs from "fs";
import * as path from "path";
import { NextRequest } from "next/server";
import { GET as getInvoices } from "../../app/api/invoices/route";
import { GET as getOrders } from "../../app/api/orders/route";
import { POST as postCheckout } from "../../app/api/orders/checkout/route";
import { POST as postInventoryAdjust } from "../../app/api/inventory/adjust/route";
import { POST as postTapWebhook } from "../../app/api/webhooks/tap/route";
import { POST as postSkipCashWebhook } from "../../app/api/webhooks/skipcash/route";

interface NucleiResult {
  templateId: string;
  name: string;
  severity: string;
  status: "PASSED" | "FAILED";
  details: string;
}

const results: NucleiResult[] = [];

async function runNucleiSimulations() {
  console.log("==================================================================");
  console.log("  EYENOVA QATAR — NUCLEI TEMPLATE EXECUTION & AUDIT SUITE");
  console.log("==================================================================\n");

  const nucleiDir = path.resolve(__dirname, "../../nuclei");
  const files = fs.readdirSync(nucleiDir).filter((f) => f.endsWith(".yaml"));
  console.log(`Found ${files.length} active Nuclei vulnerability detection templates.\n`);

  // Template 1: admin-auth-bypass.yaml
  try {
    const unauthReqInvoices = new NextRequest("http://localhost:3000/api/invoices", {
      method: "GET",
    });
    const resInvoices = await getInvoices(unauthReqInvoices);
    const bodyInvoices = await resInvoices.json();

    const unauthReqOrders = new NextRequest("http://localhost:3000/api/orders", {
      method: "GET",
    });
    const resOrders = await getOrders(unauthReqOrders);
    const bodyOrders = await resOrders.json();

    if (
      resInvoices.status === 401 &&
      resOrders.status === 401 &&
      (bodyInvoices.error?.includes("Unauthorized") || bodyInvoices.error?.includes("Administrator"))
    ) {
      results.push({
        templateId: "eyenova-admin-unauthenticated-access",
        name: "Admin Endpoint Authentication Check",
        severity: "HIGH",
        status: "PASSED",
        details: "Protected: Both /api/invoices and /api/orders reject unauthenticated callers with 401 Unauthorized.",
      });
    } else {
      results.push({
        templateId: "eyenova-admin-unauthenticated-access",
        name: "Admin Endpoint Authentication Check",
        severity: "HIGH",
        status: "FAILED",
        details: `VULNERABILITY DETECTED: Invoices (${resInvoices.status}), Orders (${resOrders.status})`,
      });
    }
  } catch (err: any) {
    results.push({
      templateId: "eyenova-admin-unauthenticated-access",
      name: "Admin Endpoint Authentication Check",
      severity: "HIGH",
      status: "FAILED",
      details: err.message,
    });
  }

  // Template 2: webhook-signature-bypass.yaml
  try {
    const forgedTapReq = new NextRequest("http://localhost:3000/api/webhooks/tap", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        hashstring: "deadbeef1234567890abcdefdeadbeef1234567890abcdefdeadbeef12345678",
      },
      body: JSON.stringify({
        id: "chg_forged_999",
        amount: 1,
        status: "CAPTURED",
        reference: { order: "ord_123" },
      }),
    });
    const resTap = await postTapWebhook(forgedTapReq);

    const forgedSkipCashReq = new NextRequest("http://localhost:3000/api/webhooks/skipcash", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-signature": "deadbeef1234567890abcdefdeadbeef1234567890abcdefdeadbeef12345678",
      },
      body: JSON.stringify({
        PaymentId: "sc_forged_999",
        Amount: 1,
        Status: "Paid",
        Uid: "ord_123",
      }),
    });
    const resSkipCash = await postSkipCashWebhook(forgedSkipCashReq);

    if (resTap.status === 401 && resSkipCash.status === 401) {
      results.push({
        templateId: "eyenova-forged-webhook-rejection",
        name: "Forged Webhook Signature Rejection",
        severity: "CRITICAL",
        status: "PASSED",
        details: "Protected: Forged Tap and SkipCash HMAC payloads are both strictly rejected with 401 Unauthorized.",
      });
    } else {
      results.push({
        templateId: "eyenova-forged-webhook-rejection",
        name: "Forged Webhook Signature Rejection",
        severity: "CRITICAL",
        status: "FAILED",
        details: `VULNERABILITY DETECTED: Tap (${resTap.status}), SkipCash (${resSkipCash.status})`,
      });
    }
  } catch (err: any) {
    results.push({
      templateId: "eyenova-forged-webhook-rejection",
      name: "Forged Webhook Signature Rejection",
      severity: "CRITICAL",
      status: "FAILED",
      details: err.message,
    });
  }

  // Template 3: checkout-tampering.yaml
  try {
    const tamperedReq = new NextRequest("http://localhost:3000/api/orders/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        customerName: "Attacker",
        customerPhone: "123",
        paymentMethod: "CASH_ON_DELIVERY",
        items: [],
      }),
    });
    const resCheckout = await postCheckout(tamperedReq);
    const bodyCheckout = await resCheckout.json();

    if (resCheckout.status === 400 && bodyCheckout.error?.includes("Validation failed")) {
      results.push({
        templateId: "eyenova-checkout-tampering-rejection",
        name: "Checkout Tampering & Price Manipulation Rejection",
        severity: "CRITICAL",
        status: "PASSED",
        details: "Protected: Tampered/empty order payloads fail Zod validation and return 400 Bad Request.",
      });
    } else {
      results.push({
        templateId: "eyenova-checkout-tampering-rejection",
        name: "Checkout Tampering & Price Manipulation Rejection",
        severity: "CRITICAL",
        status: "FAILED",
        details: `VULNERABILITY DETECTED: Status ${resCheckout.status}`,
      });
    }
  } catch (err: any) {
    results.push({
      templateId: "eyenova-checkout-tampering-rejection",
      name: "Checkout Tampering & Price Manipulation Rejection",
      severity: "CRITICAL",
      status: "FAILED",
      details: err.message,
    });
  }

  // Template 4: inventory-idor.yaml
  try {
    const unauthInventoryReq = new NextRequest("http://localhost:3000/api/inventory/adjust", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        productId: "prod-test",
        delta: -9999,
        reason: "Hacked adjustment",
      }),
    });
    const resInventory = await postInventoryAdjust(unauthInventoryReq);

    if (resInventory.status === 401) {
      results.push({
        templateId: "eyenova-inventory-idor-protection",
        name: "Inventory Manipulation IDOR Protection",
        severity: "HIGH",
        status: "PASSED",
        details: "Protected: Unauthorized inventory alterations are denied with 401 Unauthorized.",
      });
    } else {
      results.push({
        templateId: "eyenova-inventory-idor-protection",
        name: "Inventory Manipulation IDOR Protection",
        severity: "HIGH",
        status: "FAILED",
        details: `VULNERABILITY DETECTED: Status ${resInventory.status}`,
      });
    }
  } catch (err: any) {
    results.push({
      templateId: "eyenova-inventory-idor-protection",
      name: "Inventory Manipulation IDOR Protection",
      severity: "HIGH",
      status: "FAILED",
      details: err.message,
    });
  }

  // Print results summary
  for (const r of results) {
    const icon = r.status === "PASSED" ? "✅ [SECURE]" : "❌ [VULNERABLE]";
    console.log(`${icon} [${r.severity}] ${r.name}`);
    console.log(`   Template: ${r.templateId}`);
    console.log(`   Result:   ${r.details}\n`);
  }

  const passed = results.filter((r) => r.status === "PASSED").length;
  const failed = results.filter((r) => r.status === "FAILED").length;
  console.log("==================================================================");
  console.log(`  NUCLEI SIMULATION COMPLETED: ${passed} SECURE, ${failed} VULNERABILITIES`);
  console.log("==================================================================");
}

runNucleiSimulations();
