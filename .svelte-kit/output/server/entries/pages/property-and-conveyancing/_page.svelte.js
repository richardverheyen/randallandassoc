import { c as create_ssr_component } from "../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1h6fr0s_START -->${$$result.title = `<title>Travel and Stay</title>`, ""}<meta name="${"description"}" content="${"Getting to the venue"}"><!-- HEAD_svelte-1h6fr0s_END -->`, ""}

<div class="${"text-column"}"><h1>Travel and Stay</h1>

	<p>This is a <a href="${"https://kit.svelte.dev"}">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>

	<p>The page you&#39;re looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don&#39;t need to load any JavaScript. Try viewing the page&#39;s source, or opening
		the devtools network panel and reloading.
	</p></div>`;
});
export {
  Page as default
};
