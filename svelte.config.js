import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			// $lib:'../svelte/web-components/src/components/shadcn',
			// $libs: "../../svelte/web-components/src/lib",
			// $components: "../../svelte/web-components/src/components",
			// $inputs: "../../svelte/web-components/src/components/inputs",
			// $collections: "../../svelte/web-components/src/components/collections",
			// $containers: "../../svelte/web-components/src/components/containers",
			// $specials: "../../svelte/web-components/src/components/specials",
			// $shadcn: "../../svelte/web-components/src/components/shadcn/components/ui"
		},
	},
	preprocess: vitePreprocess()
};

export default config;
