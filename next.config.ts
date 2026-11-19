import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  agentRules: false,
  images: { unoptimized: true },
  experimental: process.platform === "win32" ? {
    cpus: 1,
    staticGenerationMaxConcurrency: 1,
  } : undefined,
};

export default config;
