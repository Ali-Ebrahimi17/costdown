/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '172.30.60.22',
        pathname: '**',
      },
    ],
  },
  eslint: {
    // This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    // db
    MONGODB_URI: 'mongodb://127.0.0.1:27017/costdown',
    // auth
    AUTH_SECRET: 'IWeI3yfGGDKrnN/9doe9IC1ZAvBJIN3HYsW12B9ZgBo=',


  },
}

export default nextConfig
