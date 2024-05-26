/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.(frag|vert)$/,
        // This is the asset module.
        type: 'asset/source',
      }
    )
    return config
  },
};

export default nextConfig;
