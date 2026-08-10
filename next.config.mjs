/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // This is a lightweight marketing site with small decorative
    // illustrations and one founder photo — cap the optimizer's
    // output sizes instead of the 3840px default tier.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
