import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';

const config = {
	preprocess: vitePreprocess({
		scss: {
			prependData: `@import './static/smui.css';`
		}
	}),

	trailingSlash: 'always',

	kit: {
		adapter: adapter({
			pages: 'public',
			assets: 'public',
			fallback: null,
			precompress: false
		}),
	}
};
export default config;
