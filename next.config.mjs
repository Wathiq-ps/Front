/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'wathiq-back.up.railway.app',
        pathname: '/api/v1/admin/kyc/documents/**',
      },
    ],
  },

  allowedDevOrigins: [
    '169.254.150.45',
    'localhost',
    '127.0.0.1',
  ],
}

export default nextConfig