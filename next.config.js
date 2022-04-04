/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CRYPTO_JS_KEY: process.env.CRYPTO_JS_KEY,
  },
};

module.exports = nextConfig;
