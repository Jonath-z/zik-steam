/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    CRYPTO_JS_KEY: process.env.CRYPTO_JS_KEY,
  },
};

module.exports = nextConfig;
