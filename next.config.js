/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    eslint: {
    ignoreDuringBuilds: true,
    images: {
        domains: ['ignat.com'],
      },
},
}

module.exports = nextConfig
