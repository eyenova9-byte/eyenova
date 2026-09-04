async function studyEyenk() {
  try {
    const res = await fetch('https://eyenk.com/');
    const html = await res.text();

    console.log("=== 1. ANNOUNCEMENT BAR ===");
    const annMatch = html.match(/class="[^"]*announcement[^"]*"[\s\S]*?<\/div>/i);
    if (annMatch) console.log(annMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

    console.log("\n=== 2. HEADER & NAVIGATION MENU ITEMS ===");
    const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
    if (navMatch) {
      const navLinks = [...navMatch[0].matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
      navLinks.forEach(l => {
        const text = l[2].replace(/<[^>]+>/g, '').trim();
        if (text) console.log(`Link: ${l[1]} | Text: ${text}`);
      });
    }

    console.log("\n=== 3. HOMEPAGE SECTIONS / HEADINGS ===");
    const headings = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi)];
    headings.forEach(h => {
      const text = h[1].replace(/<[^>]+>/g, '').trim();
      if (text && text.length < 100) console.log(`H: ${text}`);
    });

    console.log("\n=== 4. PRODUCT CARDS & COLLECTIONS ===");
    const collections = [...html.matchAll(/class="[^"]*card__heading[^"]*"[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    collections.slice(0, 20).forEach(c => {
      console.log(`Product: ${c[2].replace(/<[^>]+>/g, '').trim()} (${c[1]})`);
    });

  } catch (err) {
    console.error("Error studying Eyenk:", err);
  }
}

studyEyenk();
