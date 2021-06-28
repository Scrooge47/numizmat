require('dotenv').config;

const { CLOUDINARY_SECRET } = process.env;
const withTM = require('next-transpile-modules')([
	'@cloudinary/base',
	'@cloudinary/react',
	'@cloudinary/html',
]);

module.exports = withTM({
	publicRuntimeConfig: {},
	serverRuntimeConfig: {
		cloudinarySecret: CLOUDINARY_SECRET,
	},
	NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXTAUTH_URL,
	NEXTAUTH_URL: process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXTAUTH_URL,
	webpack5: false,
});
