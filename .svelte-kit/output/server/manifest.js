export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.ico","robots.txt","smui.css"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".txt":"text/plain",".css":"text/css"},
	_: {
		entry: {"file":"_app/immutable/start-93aa0df4.js","imports":["_app/immutable/start-93aa0df4.js","_app/immutable/chunks/index-cbe31921.js","_app/immutable/chunks/singletons-6df39d15.js","_app/immutable/chunks/index-e83e3219.js"],"stylesheets":[],"fonts":[]},
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
