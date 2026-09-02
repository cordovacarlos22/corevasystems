// Generates a square icon matching the site's actual logo mark (the gradient
// "C" badge from Navbar.jsx) for use as Stripe's Checkout branding icon.
import sharp from "sharp";
import fs from "fs";

const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818cf8" />
      <stop offset="50%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#f472b6" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#g)" />
  <text
    x="256" y="256"
    font-family="Helvetica, Arial, sans-serif"
    font-weight="700"
    font-size="280"
    fill="#ffffff"
    text-anchor="middle"
    dominant-baseline="central"
  >C</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile("stripe-icon.png");
console.log("wrote stripe-icon.png");
