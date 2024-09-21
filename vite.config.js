import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';

export default defineConfig({
	define: {
		"process.env.NODE_ENV": '"production"',
	},
	plugins: [sveltekit(), mkcert(), crossOriginIsolation()],
	server: {
	  https: true,
	//   headers: {
	// 	'Cross-Origin-Opener-Policy': 'same-origin',
	// 	'Cross-Origin-Embedder-Policy': 'require-corp',
	//   },
	},
	optimizeDeps: {
	  exclude: ['@sqlite.org/sqlite-wasm'],
	},
});
