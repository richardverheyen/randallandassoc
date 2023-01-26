export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.ico","robots.txt","smui.css"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".txt":"text/plain",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-3097986a.js","imports":["_app/immutable/start-3097986a.js","_app/immutable/chunks/index-cbe31921.js","_app/immutable/chunks/singletons-6df39d15.js","_app/immutable/chunks/index-e83e3219.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/personal-injury",
				pattern: /^\/personal-injury\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/property-and-conveyancing",
				pattern: /^\/property-and-conveyancing\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/terms-and-conditions",
				pattern: /^\/terms-and-conditions\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/wills-and-estates",
				pattern: /^\/wills-and-estates\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
