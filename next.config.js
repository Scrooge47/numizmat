require('dotenv').config;

const { CLOUDINARY_SECRET } = process.env;

module.exports = {
	publicRuntimeConfig: {},
	serverRuntimeConfig: {
		cloudinarySecret: CLOUDINARY_SECRET,
	},
};
