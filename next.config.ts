import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Explicitly define the path to the request configuration
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
