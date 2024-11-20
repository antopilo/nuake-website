/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    output: 'standalone',
    transpilePackages: ['@mdxeditor/editor'],
    reactStrictMode: true,
    webpack: (config) => {
        // this will override the experiments
        config.experiments = { ...config.experiments, topLevelAwait: true }
        // this will just update topLevelAwait property of config.experiments
        // config.experiments.topLevelAwait = true
        return config
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.antopilo.dev',
            port: '',
            pathname: '**',
          },
        ],
      },
}

module.exports = nextConfig
