/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "62a44949e6.cbaul-cdnwnd.com" },
    ],
  },
};

export default nextConfig;
