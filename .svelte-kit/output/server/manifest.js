export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","robots.txt","smui.css"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-a014ee9b.js","imports":["_app/immutable/start-a014ee9b.js","_app/immutable/chunks/index-8a9fcaa6.js","_app/immutable/chunks/singletons-85106750.js","_app/immutable/chunks/index-f6ca87f8.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
