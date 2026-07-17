import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

try {
  const rootPage = path.join(process.cwd(), "app/page.tsx");
  if (fs.existsSync(rootPage)) {
    // Check if it's the default/redirect page to delete it and avoid route conflict with app/(main)/page.tsx
    const content = fs.readFileSync(rootPage, "utf8");
    if (content.includes("redirect") || content.includes("vercel.com") || content.includes("RootPage")) {
      fs.unlinkSync(rootPage);
      console.log("Successfully deleted conflicting app/page.tsx to resolve route group overlap.");
    }
  }
} catch (err) {
  console.error("Failed to delete conflicting app/page.tsx:", err);
}

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.discordapp.com",
          port: "",
          // pathname: "/avatars/**",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
          port: "",
          // pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
          // pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          port: "",
          // pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "github.com",
          port: "",
          // pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "cdn.brandfetch.io",
          port: "",
          // pathname: "/**",
        },
      ],
    },
};

export default nextConfig;
