// Generates a shopping-bag illustration matching the flat-gradient style of
// the existing service icons (coreva-websites.webp, coreva-automation.webp) —
// same 540x360 canvas, same indigo/purple/pink gradient, soft shadow blob.
import sharp from "sharp";

const svg = `
<svg width="540" height="360" viewBox="0 0 540 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bag" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="55%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#c084fc" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="540" height="360" fill="#ffffff" />
  <ellipse cx="255" cy="290" rx="150" ry="30" fill="url(#shadow)" />

  <!-- bag body -->
  <rect x="170" y="140" width="200" height="160" rx="18" fill="url(#bag)" />
  <!-- bag inner highlight panel -->
  <rect x="188" y="158" width="72" height="124" rx="10" fill="#ffffff" fill-opacity="0.18" />

  <!-- bag handle -->
  <path d="M 210 140 L 210 108 Q 210 70 250 70 L 290 70 Q 330 70 330 108 L 330 140"
        fill="none" stroke="#1d293d" stroke-width="10" stroke-linecap="round" />

  <!-- price tag detail -->
  <circle cx="300" cy="200" r="26" fill="#ffffff" fill-opacity="0.9" />
  <text x="300" y="209" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="26" fill="#6366f1" text-anchor="middle">$</text>

  <!-- checklist lines (matches the dashboard-illustration convention) -->
  <rect x="188" y="182" width="44" height="6" rx="3" fill="#ffffff" />
  <rect x="188" y="198" width="34" height="6" rx="3" fill="#ffffff" fill-opacity="0.7" />
  <rect x="188" y="214" width="40" height="6" rx="3" fill="#ffffff" fill-opacity="0.7" />
  <rect x="188" y="250" width="52" height="14" rx="7" fill="#ffffff" fill-opacity="0.9" />
</svg>
`;

await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile("public/images/coreva-ecommerce.webp");
console.log("wrote public/images/coreva-ecommerce.webp");
