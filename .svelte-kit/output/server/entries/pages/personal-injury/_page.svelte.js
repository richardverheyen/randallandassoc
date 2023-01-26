import { c as create_ssr_component, k as add_attribute } from "../../../chunks/index.js";
const banner2 = "/_app/immutable/assets/injury-banner2-a42203ff.webp";
const banner1 = "/_app/immutable/assets/injury-banner1-c503f15c.webp";
const bannerFull = "/_app/immutable/assets/injury-banner-2c031d50.jpg";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '@charset "UTF-8";#terms-and-conditions.svelte-s5quft>.gutters.svelte-s5quft.svelte-s5quft{display:flex;flex-direction:column;align-items:center;padding-bottom:1em}#terms-and-conditions.svelte-s5quft>.gutters h2.svelte-s5quft.svelte-s5quft{text-align:center;margin-top:40px;margin-bottom:1em}#terms-and-conditions.svelte-s5quft>.gutters p.svelte-s5quft.svelte-s5quft{margin-top:0;margin-bottom:2em;max-width:690px;text-align:center}#terms-and-conditions.svelte-s5quft>.gutters p.svelte-s5quft>a.svelte-s5quft{color:black;text-decoration:none}#terms-and-conditions.svelte-s5quft>.gutters p a.svelte-s5quft.svelte-s5quft:hover{text-decoration:underline}#terms-and-conditions.svelte-s5quft>.gutters ul.svelte-s5quft.svelte-s5quft{padding:0 2em;max-width:600px}#terms-and-conditions.svelte-s5quft>.gutters ul.svelte-s5quft>li.svelte-s5quft{list-style-type:"✓";padding-left:10px;margin-bottom:2em}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section id="${"terms-and-conditions"}" class="${"svelte-s5quft"}"><div class="${"hero"}"><picture><source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)} media="${"(max-width: 1200px)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner2, 0)} media="${"(min-resolution: 50dpi)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)}>

      <img${add_attribute("src", bannerFull, 0)} alt="${"An xray"}"></picture>
    <h1 class="${"mdc-typography--headline1"}">Personal Injury</h1></div>

  <div class="${"gutters svelte-s5quft"}"><h2 class="${"mdc-typography--headline2 svelte-s5quft"}">Injury Law</h2>
    <p class="${"svelte-s5quft"}">Have you suffered an injury in NSW?</p>
    <p class="${"svelte-s5quft"}">Was your injury caused because of the actions or negligence of somebody
      else, during a motor vehicle accident, or during the course of your
      employment?
    </p>
    <h2 class="${"mdc-typography--headline2 svelte-s5quft"}">Randall &amp; Associates assist injured people with claims for:
    </h2>

    <ul class="${"svelte-s5quft"}"><li class="${"svelte-s5quft"}">Workers Compensation</li>
      <li class="${"svelte-s5quft"}">Heading loss/industrial deafness</li>
      <li class="${"svelte-s5quft"}">Motor Vehicle Injury</li>
      <li class="${"svelte-s5quft"}">Personal Injury</li></ul>

    <p class="${"svelte-s5quft"}">If you would like us to review the circumstances surrounding your injury
      for a free no obligation check of your potential entitlements, contact us
      on <a href="${"phone:0283787698"}" class="${"svelte-s5quft"}">(02) 8378 7698</a> or
      <a href="${"mailto:mail@randallandassoc.com"}" class="${"svelte-s5quft"}">mail@randallandassoc.com</a></p></div>
</section>`;
});
export {
  Page as default
};
