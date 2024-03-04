/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['mongoose']
    },
    images: {
        domains: ['m.media-amazon.com']
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default nextConfig;
