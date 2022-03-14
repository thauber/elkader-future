/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['cdn.sanity.io']
  },
  async rewrites() {
    return {beforeFiles:[
      {
        source: '/cms/desk/:path*',
        destination: '/cms/index.html'
      }
    ]}
  }
}

module.exports = nextConfig
