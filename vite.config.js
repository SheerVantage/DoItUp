// import { sveltekit } from '@sveltejs/kit/vite';
// import { defineConfig } from 'vite';

// export default defineConfig({
// 	server: {
// 		http: true,
// 		proxy: {}
// 	},
// 	plugins: [sveltekit()],
// 	'process.env.NODE_ENV': '"production"',
// });


import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
// import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({

	server: {
		https: true,
		proxy: {}
	},
	paths: {
		base: process.env.NODE_ENV === 'production' ? '/Perfina' : '',
		relative: true
	},

	plugins: [
		sveltekit(), 
		// SvelteKitPWA(), 
		VitePWA(),
		mkcert(), 
		crossOriginIsolation()
	],

	// The following Vite config options will be overridden by SvelteKit:
	// base: 'http://localhost/perfina/build/',
	// base:'https://apps.sheervantage.com/perfina/pwa/'

});
