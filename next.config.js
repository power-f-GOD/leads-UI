/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MODE: process.env.MODE,
    API_KEY: process.env.API_KEY
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    }
    // 'src/components/shared': {
    //   transform: 'src/components/shared/{{member}}',
    //   preventFullImport: true
    // },
    // 'src/components/home': {
    //   transform: 'src/components/home/{{member}}',
    //   preventFullImport: true
    // }
  },
  images: { domains: [`localhost`] }
};

module.exports = nextConfig;
