/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "kisaweb-cdn-bucket.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "scontent-icn2-1.cdninstagram.com"
      }
    ],
  },
  async redirects() {
    return [
      {
        source: "/pocha/manage",
        destination: "/admin/pocha/manage",
        permanent: true,
      },
      {
        source: "/pocha/dashboard",
        destination: "/admin/pocha/dashboard",
        permanent: true,
      },
      {
        source: "/pocha/history",
        destination: "/admin/pocha/history",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
