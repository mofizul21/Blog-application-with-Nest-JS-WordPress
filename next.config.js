/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['source.unsplash.com', 'images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'testwp.envirosonic.com.au',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig