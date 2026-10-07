import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `output: 'standalone'` is enabled in the deployment iteration together with the Dockerfile.
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
