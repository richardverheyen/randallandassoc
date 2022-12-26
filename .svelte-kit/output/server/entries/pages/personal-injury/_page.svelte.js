import { c as create_ssr_component, k as add_attribute } from "../../../chunks/index.js";
const banner2 = "/_app/immutable/assets/injury-banner2-a42203ff.webp";
const banner1 = "/_app/immutable/assets/injury-banner1-c503f15c.webp";
const bannerFull = "/_app/immutable/assets/injury-banner-2c031d50.jpg";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '@charset "UTF-8";#terms-and-conditions.svelte-1sjtk0g>.gutters.svelte-1sjtk0g.svelte-1sjtk0g{display:flex;flex-direction:column;align-items:center;padding-bottom:1em}#terms-and-conditions.svelte-1sjtk0g>.gutters h2.svelte-1sjtk0g.svelte-1sjtk0g{text-align:center;margin-top:3em;margin-bottom:1em}#terms-and-conditions.svelte-1sjtk0g>.gutters p.svelte-1sjtk0g.svelte-1sjtk0g{margin-top:0;margin-bottom:2em;max-width:850px;text-align:center}#terms-and-conditions.svelte-1sjtk0g>.gutters ul.svelte-1sjtk0g.svelte-1sjtk0g{padding:0 2em;max-width:600px}#terms-and-conditions.svelte-1sjtk0g>.gutters ul.svelte-1sjtk0g>li.svelte-1sjtk0g{list-style-type:"✓";margin-bottom:2em}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section id="${"terms-and-conditions"}" class="${"svelte-1sjtk0g"}"><div class="${"hero"}"><picture><source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)} media="${"(max-width: 1200px)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner2, 0)} media="${"(min-resolution: 50dpi)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)}>

      <img${add_attribute("src", bannerFull, 0)} alt="${"An xray"}"></picture>
    <h1 class="${"mdc-typography--headline1"}">Personal Injury</h1></div>

  <div class="${"gutters svelte-1sjtk0g"}"><h2 class="${"mdc-typography--headline2 svelte-1sjtk0g"}">Injury Law</h2>
    <p class="${"svelte-1sjtk0g"}">Have you suffered an injury in NSW?</p>
    <p class="${"svelte-1sjtk0g"}">Was your injury caused because of the actions or negligence of somebody
      else, during a motor vehicle accident, or during the course of your
      employment?
    </p>
    <h2 class="${"mdc-typography--headline2 svelte-1sjtk0g"}">Randall &amp; Associates assist injured people with claims for:
    </h2>

    <ul class="${"svelte-1sjtk0g"}"><li class="${"svelte-1sjtk0g"}">Workers Compensation</li>
      <li class="${"svelte-1sjtk0g"}">Heading loss/industrial deafness</li>
      <li class="${"svelte-1sjtk0g"}">Motor Vehicle Injury</li>
      <li class="${"svelte-1sjtk0g"}">Personal Injury</li></ul>

    <p class="${"svelte-1sjtk0g"}">If you would like us to review the circumstances surrounding your injury
      for a free no obligation check of your potential entitlements, contact us
      on <a href="${"phone:0283787698"}">(02) 8378 7698</a> or
      <a href="${"mailto:mail@randallandassoc.com"}">mail@randallandassoc.com</a></p></div>
</section>`;
});
export {
  Page as default
};
